import "server-only";
import { db } from "./db";
import { getUserSettings } from "./settings";
import { periodForDate } from "@/lib/finance";

export type FixedExpense = {
  id: string;
  userId: string;
  subcategoryId: string;
  name: string;
  estimatedAmount: string;
  dueDay: number;
  active: boolean;
  createdAt: Date;
};

export async function listFixedExpenses(userId: string): Promise<FixedExpense[]> {
  const rows = await db.orm.public.FixedExpense.where({ userId }).orderBy((f) => f.dueDay.asc()).all();
  return rows as FixedExpense[];
}

export async function listActiveFixedExpenses(userId: string): Promise<FixedExpense[]> {
  const rows = await db.orm.public.FixedExpense
    .where({ userId, active: true })
    .orderBy((f) => f.dueDay.asc())
    .all();
  return rows as FixedExpense[];
}

export async function createFixedExpense(
  userId: string,
  input: { subcategoryId: string; name: string; estimatedAmount: number; dueDay: number },
): Promise<FixedExpense> {
  const row = await db.orm.public.FixedExpense.create({ userId, ...input, active: true });
  return row as FixedExpense;
}

/**
 * Wipes not-yet-paid occurrences of this fixed expense from the current period
 * onward. Pausing or deleting a recurring item shouldn't leave stale pending
 * placeholders the user has to hunt down and delete month by month — but
 * already-paid transactions are real history and must never be touched.
 */
async function purgeUnpaidUpcomingTransactions(userId: string, fixedExpenseId: string): Promise<void> {
  const { monthStartDay } = await getUserSettings(userId);
  const currentPeriod = periodForDate(new Date(), monthStartDay);
  const rows = await db.orm.public.Transaction.where({ userId, fixedExpenseId }).all();
  const idsToDelete = rows
    .filter((t) => !t.paidDate && t.periodMonth >= currentPeriod)
    .map((t) => t.id);
  if (idsToDelete.length === 0) return;
  await db.orm.public.Transaction.where({ userId }).where((t) => t.id.in(idsToDelete)).delete();
}

export async function setFixedExpenseActive(
  userId: string,
  id: string,
  active: boolean,
): Promise<void> {
  await db.orm.public.FixedExpense.where({ id, userId }).update({ active });
  if (!active) {
    await purgeUnpaidUpcomingTransactions(userId, id);
  }
}

export async function updateFixedExpense(
  userId: string,
  id: string,
  input: { subcategoryId: string; name: string; estimatedAmount: number; dueDay: number },
): Promise<void> {
  await db.orm.public.FixedExpense.where({ id, userId }).update(input);
}

export async function deleteFixedExpense(userId: string, id: string): Promise<void> {
  await purgeUnpaidUpcomingTransactions(userId, id);
  await db.orm.public.FixedExpense.where({ id, userId }).delete();
}
