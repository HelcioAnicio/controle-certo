import "server-only";
import { listCategories, listSubcategories, type Category, type Subcategory } from "@/prisma/categories";
import {
  ensureFixedExpensesGeneratedForPeriod,
  listTransactionsForPeriod,
  type Transaction,
} from "@/prisma/transactions";
import { listBudgets, type Budget } from "@/prisma/budgets";
import { computeStatus, formatBRL, type TxStatus } from "./finance";

export type EnrichedTransaction = Transaction & {
  subcategoryName: string;
  subcategoryIcon: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  status: TxStatus;
  displayAmount: number;
};

export function enrichTransactions(
  transactions: Transaction[],
  subcategories: Subcategory[],
  categories: Category[],
  today: Date = new Date(),
): EnrichedTransaction[] {
  const subById = new Map(subcategories.map((s) => [s.id, s]));
  const catById = new Map(categories.map((c) => [c.id, c]));

  return transactions.map((t) => {
    const sub = subById.get(t.subcategoryId);
    const cat = sub ? catById.get(sub.categoryId) : undefined;
    const status = computeStatus(t, today);
    const displayAmount = status === "paid" ? Number(t.paidAmount) : Number(t.amount);
    return {
      ...t,
      subcategoryName: sub?.name ?? "—",
      subcategoryIcon: sub?.icon ?? "folder",
      categoryId: cat?.id ?? "",
      categoryName: cat?.name ?? "Geral",
      categoryColor: cat?.color ?? "#64748B",
      status,
      displayAmount,
    };
  });
}

export type MonthSummary = {
  incomeTotal: number;
  incomeForecastTotal: number;
  paidExpenseTotal: number;
  previstoTotal: number;
  pendingTotal: number;
  saldoAtual: number;
  saldoPrevisto: number;
  progressPct: number;
  pieSlices: { id: string; name: string; color: string; value: number; pct: number }[];
  pieGradient: string;
};

/**
 * `budgetProgress` folds in the unspent portion of each monthly budget (see
 * `computeBudgetProgress`) as anticipated spend: a R$1300 grocery reserve with
 * nothing logged yet should still show up in the month's forecast, not just
 * once actual transactions exist for it.
 */
export function computeMonthSummary(
  txs: EnrichedTransaction[],
  budgetProgress: BudgetProgress[] = [],
): MonthSummary {
  const expenses = txs.filter((t) => t.type === "expense");
  const incomes = txs.filter((t) => t.type === "income");

  const incomeTotal = incomes.reduce(
    (sum, t) => sum + (t.status === "paid" ? Number(t.paidAmount) : 0),
    0,
  );
  const incomeForecastTotal = incomes.reduce(
    (sum, t) => sum + (t.status === "paid" ? Number(t.paidAmount) : Number(t.amount)),
    0,
  );
  const paidExpenseTotal = expenses
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + Number(t.paidAmount), 0);
  const budgetReserve = budgetProgress.reduce(
    (sum, b) => sum + Math.max(b.monthlyAmount - b.spent, 0),
    0,
  );
  const previstoTotal =
    expenses.reduce(
      (sum, t) => sum + (t.status === "paid" ? Number(t.paidAmount) : Number(t.amount)),
      0,
    ) + budgetReserve;
  const pendingTotal = previstoTotal - paidExpenseTotal;
  const saldoAtual = incomeTotal - paidExpenseTotal;
  const saldoPrevisto = incomeForecastTotal - previstoTotal;
  const progressPct = previstoTotal > 0 ? Math.round((paidExpenseTotal / previstoTotal) * 100) : 0;

  const catTotals = new Map<string, { name: string; color: string; value: number }>();
  for (const t of expenses) {
    const key = t.categoryId || t.categoryName;
    const existing = catTotals.get(key);
    const amount = Number(t.amount);
    if (existing) {
      existing.value += amount;
    } else {
      catTotals.set(key, { name: t.categoryName, color: t.categoryColor, value: amount });
    }
  }
  // Unspent budget reserve counts toward its category here too, mirroring how
  // it's folded into previstoTotal above — otherwise a fully-unspent budget
  // is invisible in the breakdown even though it's part of the forecast.
  for (const b of budgetProgress) {
    const reserve = Math.max(b.monthlyAmount - b.spent, 0);
    if (reserve <= 0) continue;
    const key = b.categoryId || b.categoryName;
    const existing = catTotals.get(key);
    if (existing) {
      existing.value += reserve;
    } else {
      catTotals.set(key, { name: b.categoryName, color: b.categoryColor, value: reserve });
    }
  }
  const pieSlices = [...catTotals.entries()]
    .map(([id, v]) => ({
      id,
      name: v.name,
      color: v.color,
      value: v.value,
      pct: previstoTotal > 0 ? Math.round((v.value / previstoTotal) * 100) : 0,
    }))
    .filter((s) => s.value > 0)
    .sort((a, b) => b.value - a.value);

  let acc = 0;
  const gradientParts = pieSlices.map((s) => {
    const start = acc;
    acc += s.pct;
    return `${s.color} ${start}% ${acc}%`;
  });
  if (acc < 100 && gradientParts.length) gradientParts.push(`#E2E8F0 ${acc}% 100%`);
  const pieGradient = gradientParts.length ? `conic-gradient(${gradientParts.join(",")})` : "#E2E8F0";

  return {
    incomeTotal,
    incomeForecastTotal,
    paidExpenseTotal,
    previstoTotal,
    pendingTotal,
    saldoAtual,
    saldoPrevisto,
    progressPct,
    pieSlices,
    pieGradient,
  };
}

export { formatBRL };

export type BudgetProgress = {
  subcategoryId: string;
  subcategoryName: string;
  subcategoryIcon: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  monthlyAmount: number;
  spent: number;
  remaining: number;
  pct: number;
};

/**
 * Reserved-amount tracking ("abatimento"): each budgeted subcategory has a fixed
 * monthly target that gets drawn down as expenses land in it during the period,
 * so the user sees what's left of e.g. a R$1300 grocery reserve instead of just
 * a running total.
 */
export function computeBudgetProgress(
  budgets: Budget[],
  subcategories: Subcategory[],
  categories: Category[],
  transactions: EnrichedTransaction[],
): BudgetProgress[] {
  const subById = new Map(subcategories.map((s) => [s.id, s]));
  const catById = new Map(categories.map((c) => [c.id, c]));

  return budgets
    .map((b) => {
      const sub = subById.get(b.subcategoryId);
      const cat = sub ? catById.get(sub.categoryId) : undefined;
      const spent = transactions
        .filter((t) => t.subcategoryId === b.subcategoryId && t.type === "expense")
        .reduce((sum, t) => sum + t.displayAmount, 0);
      const monthlyAmount = Number(b.monthlyAmount);
      return {
        subcategoryId: b.subcategoryId,
        subcategoryName: sub?.name ?? "—",
        subcategoryIcon: sub?.icon ?? "folder",
        categoryId: cat?.id ?? "",
        categoryName: cat?.name ?? "Geral",
        categoryColor: cat?.color ?? "#64748B",
        monthlyAmount,
        spent,
        remaining: monthlyAmount - spent,
        pct: monthlyAmount > 0 ? Math.min(100, Math.round((spent / monthlyAmount) * 100)) : 0,
      };
    })
    .sort((a, b) => a.subcategoryName.localeCompare(b.subcategoryName, "pt-BR"));
}

/** Loads and enriches a single period's transactions plus the user's category/subcategory lookups. */
export async function loadMonthData(userId: string, periodMonth: string, monthStartDay: number = 1) {
  await ensureFixedExpensesGeneratedForPeriod(userId, periodMonth, monthStartDay);
  const [transactions, categories, subcategories, budgets] = await Promise.all([
    listTransactionsForPeriod(userId, periodMonth),
    listCategories(userId),
    listSubcategories(userId),
    listBudgets(userId),
  ]);
  const enriched = enrichTransactions(transactions, subcategories, categories);
  const budgetProgress = computeBudgetProgress(budgets, subcategories, categories, enriched);
  const summary = computeMonthSummary(enriched, budgetProgress);
  return { transactions: enriched, categories, subcategories, summary, budgetProgress };
}
