import "server-only";
import { db } from "./db";
import { dueDateForPeriod, type TxType } from "@/lib/finance";
import { listActiveFixedExpenses } from "./fixedExpenses";

export type Transaction = {
  id: string;
  userId: string;
  type: TxType;
  subcategoryId: string;
  fixedExpenseId: string | null;
  description: string | null;
  amount: string;
  isFixed: boolean;
  periodMonth: string;
  dueDate: Date | null;
  paidAmount: string | null;
  paidDate: Date | null;
  createdAt: Date;
};

export async function listTransactionsForPeriod(
  userId: string,
  periodMonth: string,
): Promise<Transaction[]> {
  const rows = await db.orm.public.Transaction
    .where({ userId, periodMonth })
    .orderBy((t) => t.createdAt.asc())
    .all();
  return rows as Transaction[];
}

/**
 * Materializes this period's pending Transaction rows for every active fixed
 * expense that doesn't have one yet. Safe to call on every page load.
 */
export async function ensureFixedExpensesGeneratedForPeriod(
  userId: string,
  periodMonth: string,
  monthStartDay: number = 1,
): Promise<void> {
  const [fixedExpenses, existing] = await Promise.all([
    listActiveFixedExpenses(userId),
    db.orm.public.Transaction
      .where({ userId, periodMonth, isFixed: true })
      .select("fixedExpenseId")
      .all(),
  ]);

  const generatedIds = new Set(existing.map((t) => t.fixedExpenseId).filter(Boolean));
  const missing = fixedExpenses.filter((f) => !generatedIds.has(f.id));
  if (missing.length === 0) return;

  await db.orm.public.Transaction.createAll(
    missing.map((f) => ({
      userId,
      type: "expense" as const,
      subcategoryId: f.subcategoryId,
      fixedExpenseId: f.id,
      description: f.name,
      amount: Number(f.estimatedAmount),
      isFixed: true,
      periodMonth,
      dueDate: dueDateForPeriod(periodMonth, f.dueDay, monthStartDay),
    })),
  ).toArray();
}

export async function createTransaction(
  userId: string,
  input: {
    type: TxType;
    subcategoryId: string;
    description?: string;
    amount: number;
    periodMonth: string;
    dueDate?: Date | null;
    paid?: boolean;
    paidDate?: Date | null;
  },
): Promise<Transaction> {
  const row = await db.orm.public.Transaction.create({
    userId,
    type: input.type,
    subcategoryId: input.subcategoryId,
    description: input.description || null,
    amount: input.amount,
    isFixed: false,
    periodMonth: input.periodMonth,
    dueDate: input.dueDate ?? null,
    paidAmount: input.paid ? input.amount : null,
    paidDate: input.paid ? (input.paidDate ?? new Date()) : null,
  });
  return row as Transaction;
}

export async function payTransaction(
  userId: string,
  id: string,
  input: { paidAmount: number; paidDate: Date },
): Promise<void> {
  await db.orm.public.Transaction.where({ id, userId }).update({
    paidAmount: input.paidAmount,
    paidDate: input.paidDate,
  });
}

export async function deleteTransaction(userId: string, id: string): Promise<void> {
  await db.orm.public.Transaction.where({ id, userId }).delete();
}

export async function listTransactionsInRange(
  userId: string,
  periods: string[],
): Promise<Transaction[]> {
  const rows = await db.orm.public.Transaction
    .where({ userId })
    .where((t) => t.periodMonth.in(periods))
    .all();
  return rows as Transaction[];
}
