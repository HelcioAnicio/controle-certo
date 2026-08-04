import "server-only";
import { listCategories, listSubcategories, type Category, type Subcategory } from "@/prisma/categories";
import {
  ensureFixedExpensesGeneratedForPeriod,
  listTransactionsForPeriod,
  type Transaction,
} from "@/prisma/transactions";
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
  paidExpenseTotal: number;
  previstoTotal: number;
  pendingTotal: number;
  saldoAtual: number;
  saldoPrevisto: number;
  progressPct: number;
  pieSlices: { id: string; name: string; color: string; value: number; pct: number }[];
  pieGradient: string;
};

export function computeMonthSummary(txs: EnrichedTransaction[]): MonthSummary {
  const expenses = txs.filter((t) => t.type === "expense");
  const incomes = txs.filter((t) => t.type === "income");

  const incomeTotal = incomes.reduce(
    (sum, t) => sum + (t.status === "paid" ? Number(t.paidAmount) : 0),
    0,
  );
  const paidExpenseTotal = expenses
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + Number(t.paidAmount), 0);
  const previstoTotal = expenses.reduce(
    (sum, t) => sum + (t.status === "paid" ? Number(t.paidAmount) : Number(t.amount)),
    0,
  );
  const pendingTotal = previstoTotal - paidExpenseTotal;
  const saldoAtual = incomeTotal - paidExpenseTotal;
  const saldoPrevisto = incomeTotal - previstoTotal;
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

/** Loads and enriches a single period's transactions plus the user's category/subcategory lookups. */
export async function loadMonthData(userId: string, periodMonth: string, monthStartDay: number = 1) {
  await ensureFixedExpensesGeneratedForPeriod(userId, periodMonth, monthStartDay);
  const [transactions, categories, subcategories] = await Promise.all([
    listTransactionsForPeriod(userId, periodMonth),
    listCategories(userId),
    listSubcategories(userId),
  ]);
  const enriched = enrichTransactions(transactions, subcategories, categories);
  const summary = computeMonthSummary(enriched);
  return { transactions: enriched, categories, subcategories, summary };
}
