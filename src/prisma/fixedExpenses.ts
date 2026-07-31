import "server-only";
import { db } from "./db";

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

export async function setFixedExpenseActive(
  userId: string,
  id: string,
  active: boolean,
): Promise<void> {
  await db.orm.public.FixedExpense.where({ id, userId }).update({ active });
}

export async function updateFixedExpense(
  userId: string,
  id: string,
  input: { subcategoryId: string; name: string; estimatedAmount: number; dueDay: number },
): Promise<void> {
  await db.orm.public.FixedExpense.where({ id, userId }).update(input);
}

export async function deleteFixedExpense(userId: string, id: string): Promise<void> {
  await db.orm.public.FixedExpense.where({ id, userId }).delete();
}
