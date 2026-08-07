import "server-only";
import {
  listCategories,
  listSubcategories,
  type Category,
  type Subcategory,
} from "@/prisma/categories";
import {
  ensureFixedExpensesGeneratedForPeriod,
  listTransactionsForPeriod,
  type Transaction,
} from "@/prisma/transactions";
import { listBudgets, type Budget } from "@/prisma/budgets";
import {
  COLOR_SWATCHES,
  computeStatus,
  formatBRL,
  type TxStatus,
} from "./finance";

export type EnrichedTransaction = Transaction & {
  subcategoryName: string;
  subcategoryIcon: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
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
    const displayAmount =
      status === "paid" ? Number(t.paidAmount) : Number(t.amount);
    return {
      ...t,
      subcategoryName: sub?.name ?? "—",
      subcategoryIcon: sub?.icon ?? "folder",
      categoryId: cat?.id ?? "",
      categoryName: cat?.name ?? "Geral",
      categoryColor: cat?.color ?? "#64748B",
      categoryIcon: cat?.icon ?? "folder",
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
  pieSlices: {
    id: string;
    name: string;
    color: string;
    value: number;
    pct: number;
  }[];
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
    (sum, t) =>
      sum + (t.status === "paid" ? Number(t.paidAmount) : Number(t.amount)),
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
      (sum, t) =>
        sum + (t.status === "paid" ? Number(t.paidAmount) : Number(t.amount)),
      0,
    ) + budgetReserve;
  const pendingTotal = previstoTotal - paidExpenseTotal;
  const saldoAtual = incomeTotal - paidExpenseTotal;
  const saldoPrevisto = incomeForecastTotal - previstoTotal;
  const progressPct =
    previstoTotal > 0
      ? Math.round((paidExpenseTotal / previstoTotal) * 100)
      : 0;

  const catTotals = new Map<
    string,
    { name: string; color: string; value: number }
  >();
  for (const t of expenses) {
    const key = t.categoryId || t.categoryName;
    const existing = catTotals.get(key);
    const amount = Number(t.amount);
    if (existing) {
      existing.value += amount;
    } else {
      catTotals.set(key, {
        name: t.categoryName,
        color: t.categoryColor,
        value: amount,
      });
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
      catTotals.set(key, {
        name: b.categoryName,
        color: b.categoryColor,
        value: reserve,
      });
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
  if (acc < 100 && gradientParts.length)
    gradientParts.push(`#E2E8F0 ${acc}% 100%`);
  const pieGradient = gradientParts.length
    ? `conic-gradient(${gradientParts.join(",")})`
    : "#E2E8F0";

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
        .filter(
          (t) => t.subcategoryId === b.subcategoryId && t.type === "expense",
        )
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
        pct:
          monthlyAmount > 0
            ? Math.min(100, Math.round((spent / monthlyAmount) * 100))
            : 0,
      };
    })
    .sort((a, b) =>
      a.subcategoryName.localeCompare(b.subcategoryName, "pt-BR"),
    );
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type LedgerDay = {
  dateKey: string;
  date: Date;
  actualBalance: number;
  projectedBalance: number;
  transactions: EnrichedTransaction[];
};

/**
 * Groups transactions into a day-by-day statement with a running balance per
 * day: `actualBalance` only moves on days something was actually paid;
 * `projectedBalance` moves on a transaction's due date too, so "receive R$500
 * tomorrow, R$400 bill due the 7th" shows R$100 projected on the 7th even
 * though neither has happened yet. Both start from 0 at the period's start —
 * consistent with how the app scopes "saldo" to the current period rather
 * than an all-time bank balance.
 *
 * The running totals are computed from `allTxs` (so a filtered-out
 * transaction still counts toward the balance), but only days with a
 * transaction in `visibleTxs` are returned — filtering narrows what's shown,
 * not the arithmetic. Transactions with neither a due date nor a paid date
 * (open-ended "pending" items) can't be placed on the timeline and come back
 * separately as `undated`.
 */
export function buildDailyLedger(
  allTxs: EnrichedTransaction[],
  visibleTxs: EnrichedTransaction[],
): { days: LedgerDay[]; undated: EnrichedTransaction[] } {
  const deltaByDay = new Map<string, { actual: number; projected: number }>();
  for (const t of allTxs) {
    const effective = t.status === "paid" ? t.paidDate : t.dueDate;
    if (!effective) continue;
    const amount =
      t.status === "paid" ? Number(t.paidAmount) : Number(t.amount);
    const signed = t.type === "income" ? amount : -amount;
    const key = dayKey(effective);
    const cur = deltaByDay.get(key) ?? { actual: 0, projected: 0 };
    cur.projected += signed;
    if (t.status === "paid") cur.actual += signed;
    deltaByDay.set(key, cur);
  }

  const cumByDay = new Map<string, { actual: number; projected: number }>();
  let runActual = 0;
  let runProjected = 0;
  for (const key of [...deltaByDay.keys()].sort()) {
    const d = deltaByDay.get(key)!;
    runActual += d.actual;
    runProjected += d.projected;
    cumByDay.set(key, { actual: runActual, projected: runProjected });
  }

  const visibleByDay = new Map<string, EnrichedTransaction[]>();
  const undated: EnrichedTransaction[] = [];
  for (const t of visibleTxs) {
    const effective = t.status === "paid" ? t.paidDate : t.dueDate;
    if (!effective) {
      undated.push(t);
      continue;
    }
    const key = dayKey(effective);
    const arr = visibleByDay.get(key) ?? [];
    arr.push(t);
    visibleByDay.set(key, arr);
  }

  const days: LedgerDay[] = [...visibleByDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, txs]) => {
      const cum = cumByDay.get(key)!;
      const [y, m, d] = key.split("-").map(Number);
      return {
        dateKey: key,
        date: new Date(y, m - 1, d),
        actualBalance: cum.actual,
        projectedBalance: cum.projected,
        transactions: txs,
      };
    });

  return { days, undated };
}

export type BreakdownRow = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  total: number;
  /** % change vs the previous period for the same id; null with nothing to compare against. */
  trendPct: number | null;
};

export type CategoryBreakdown = {
  mode: "category" | "subcategory";
  rows: BreakdownRow[];
  total: number;
  pieGradient: string;
};

/**
 * Expense breakdown for the "Detalhamento" report table. With no
 * `categoryId` filter, rows are per-category (matching the top-level pie).
 * With one, it drills into that category's subcategories instead — same
 * shape, so the table and pie can drill down without a separate code path.
 */
export function computeCategoryBreakdown(
  currentExpenses: EnrichedTransaction[],
  previousExpenses: EnrichedTransaction[],
  categoryId?: string,
  budgetProgress: BudgetProgress[] = [],
): CategoryBreakdown {
  const mode: "category" | "subcategory" = categoryId
    ? "subcategory"
    : "category";
  const scoped = categoryId
    ? currentExpenses.filter((t) => t.categoryId === categoryId)
    : currentExpenses;
  const scopedPrev = categoryId
    ? previousExpenses.filter((t) => t.categoryId === categoryId)
    : previousExpenses;
  const scopedBudgets = categoryId
    ? budgetProgress.filter((b) => b.categoryId === categoryId)
    : budgetProgress;

  function groupKey(t: EnrichedTransaction) {
    return mode === "category"
      ? t.categoryId || t.categoryName
      : t.subcategoryId;
  }

  const groups = new Map<
    string,
    { name: string; icon: string; color: string; count: number; total: number }
  >();
  for (const t of scoped) {
    const key = groupKey(t);
    const existing = groups.get(key);
    const amount = t.displayAmount;
    if (existing) {
      existing.total += amount;
      existing.count += 1;
    } else {
      groups.set(key, {
        name: mode === "category" ? t.categoryName : t.subcategoryName,
        icon: mode === "category" ? t.categoryIcon : t.subcategoryIcon,
        color: t.categoryColor,
        count: 1,
        total: amount,
      });
    }
  }

  // Unspent budget reserve counts as anticipated spend here too (the caller
  // decides whether to pass it at all, via the "considerar orçamento" toggle).
  for (const b of scopedBudgets) {
    const reserve = Math.max(b.monthlyAmount - b.spent, 0);
    if (reserve <= 0) continue;
    const key =
      mode === "category" ? b.categoryId || b.categoryName : b.subcategoryId;
    const existing = groups.get(key);
    if (existing) {
      existing.total += reserve;
    } else {
      groups.set(key, {
        name: mode === "category" ? b.categoryName : b.subcategoryName,
        icon: mode === "category" ? "folder" : b.subcategoryIcon,
        color: b.categoryColor,
        count: 0,
        total: reserve,
      });
    }
  }

  const prevTotals = new Map<string, number>();
  for (const t of scopedPrev) {
    const key = groupKey(t);
    prevTotals.set(key, (prevTotals.get(key) ?? 0) + t.displayAmount);
  }

  const total = [...groups.values()].reduce((sum, g) => sum + g.total, 0);
  const rows: BreakdownRow[] = [...groups.entries()]
    .map(([id, g], i) => {
      const prev = prevTotals.get(id);
      const trendPct = prev
        ? Math.round(((g.total - prev) / prev) * 100)
        : null;
      return {
        id,
        name: g.name,
        icon: g.icon || "folder",
        color:
          mode === "category"
            ? g.color
            : COLOR_SWATCHES[i % COLOR_SWATCHES.length],
        count: g.count,
        total: g.total,
        trendPct,
      };
    })
    .sort((a, b) => b.total - a.total);

  let acc = 0;
  const gradientParts = rows.map((r) => {
    const pct = total > 0 ? (r.total / total) * 100 : 0;
    const start = acc;
    acc += pct;
    return `${r.color} ${start}% ${acc}%`;
  });
  if (acc < 100 && gradientParts.length)
    gradientParts.push(`#E2E8F0 ${acc}% 100%`);
  const pieGradient = gradientParts.length
    ? `conic-gradient(${gradientParts.join(",")})`
    : "#E2E8F0";

  return { mode, rows, total, pieGradient };
}

/** Loads and enriches a single period's transactions plus the user's category/subcategory lookups. */
export async function loadMonthData(
  userId: string,
  periodMonth: string,
  monthStartDay: number = 1,
  trackingStartPeriod: string | null = null,
) {
  await ensureFixedExpensesGeneratedForPeriod(
    userId,
    periodMonth,
    monthStartDay,
    trackingStartPeriod,
  );
  const [transactions, categories, subcategories, budgets] = await Promise.all([
    listTransactionsForPeriod(userId, periodMonth),
    listCategories(userId),
    listSubcategories(userId),
    listBudgets(userId),
  ]);
  const enriched = enrichTransactions(transactions, subcategories, categories);
  const budgetProgress = computeBudgetProgress(
    budgets,
    subcategories,
    categories,
    enriched,
  );
  const summary = computeMonthSummary(enriched, budgetProgress);
  return {
    transactions: enriched,
    categories,
    subcategories,
    summary,
    budgetProgress,
  };
}
