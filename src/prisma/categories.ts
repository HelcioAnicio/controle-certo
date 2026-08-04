import "server-only";
import { db } from "./db";
import { DEFAULT_CATEGORIES, DEFAULT_SUBCATEGORIES, type TxType } from "@/lib/finance";

export type Category = {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
  createdAt: Date;
};

export type Subcategory = {
  id: string;
  userId: string;
  categoryId: string;
  name: string;
  type: TxType;
  icon: string;
  createdAt: Date;
};

export async function listCategories(userId: string): Promise<Category[]> {
  const rows = await db.orm.public.Category.where({ userId }).orderBy((c) => c.createdAt.asc()).all();
  return rows as Category[];
}

export async function listSubcategories(userId: string): Promise<Subcategory[]> {
  const rows = await db.orm.public.Subcategory.where({ userId }).orderBy((s) => s.createdAt.asc()).all();
  return rows as Subcategory[];
}

export async function createCategory(
  userId: string,
  input: { name: string; color: string; icon: string },
): Promise<Category> {
  const row = await db.orm.public.Category.create({ userId, ...input });
  return row as Category;
}

export async function createSubcategory(
  userId: string,
  input: { categoryId: string; name: string; type: TxType; icon: string },
): Promise<Subcategory> {
  const row = await db.orm.public.Subcategory.create({ userId, ...input });
  return row as Subcategory;
}

export async function updateSubcategory(
  userId: string,
  id: string,
  input: { name: string; type: TxType; icon: string },
): Promise<void> {
  await db.orm.public.Subcategory.where({ id, userId }).update(input);
}

/** Refuses to delete while subcategories still reference this category, since there's no DB-level FK to catch it. */
export async function deleteCategory(userId: string, id: string): Promise<void> {
  const remaining = await db.orm.public.Subcategory.where({ categoryId: id, userId }).take(1).all();
  if (remaining.length > 0) {
    throw new Error("Exclua as subcategorias desta categoria antes de removê-la.");
  }
  await db.orm.public.Category.where({ id, userId }).delete();
}

/** Refuses to delete while transactions or fixed expenses still reference this subcategory, since there's no DB-level FK to catch it. */
export async function deleteSubcategory(userId: string, id: string): Promise<void> {
  const [transactions, fixedExpenses] = await Promise.all([
    db.orm.public.Transaction.where({ subcategoryId: id, userId }).take(1).all(),
    db.orm.public.FixedExpense.where({ subcategoryId: id, userId }).take(1).all(),
  ]);
  if (transactions.length > 0 || fixedExpenses.length > 0) {
    throw new Error("Esta subcategoria tem lançamentos ou gastos fixos vinculados e não pode ser excluída.");
  }
  await db.orm.public.Subcategory.where({ id, userId }).delete();
}

/** Seeds the starter category/subcategory set for a brand-new user. No-op if they already have categories. */
export async function ensureDefaultCategories(userId: string): Promise<void> {
  const existing = await db.orm.public.Category.where({ userId }).take(1).all();
  if (existing.length > 0) return;

  const categoryIdByKey = new Map<string, string>();
  for (const cat of DEFAULT_CATEGORIES) {
    const row = await db.orm.public.Category.create({
      userId,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
    });
    categoryIdByKey.set(cat.key, row.id);
  }

  await db.orm.public.Subcategory.createAll(
    DEFAULT_SUBCATEGORIES.map((sub) => ({
      userId,
      categoryId: categoryIdByKey.get(sub.categoryKey)!,
      name: sub.name,
      type: sub.type,
      icon: sub.icon,
    })),
  ).toArray();
}
