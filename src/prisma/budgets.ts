import "server-only";
import { db } from "./db";

export type Budget = {
  id: string;
  userId: string;
  subcategoryId: string;
  monthlyAmount: string;
  createdAt: Date;
};

export async function listBudgets(userId: string): Promise<Budget[]> {
  const rows = await db.orm.public.Budget.where({ userId }).all();
  return rows as Budget[];
}

/** One budget per subcategory: updates the existing row if set, otherwise creates it. */
export async function upsertBudget(
  userId: string,
  subcategoryId: string,
  monthlyAmount: number,
): Promise<void> {
  const existing = await db.orm.public.Budget.where({ userId, subcategoryId }).take(1).all();
  if (existing.length > 0) {
    await db.orm.public.Budget.where({ id: existing[0].id, userId }).update({ monthlyAmount });
  } else {
    await db.orm.public.Budget.create({ userId, subcategoryId, monthlyAmount });
  }
}

export async function deleteBudget(userId: string, subcategoryId: string): Promise<void> {
  await db.orm.public.Budget.where({ userId, subcategoryId }).delete();
}
