"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
  updateSubcategory,
} from "@/prisma/categories";
import { deleteBudget, upsertBudget } from "@/prisma/budgets";
import {
  createFixedExpense,
  deleteFixedExpense,
  setFixedExpenseActive,
  updateFixedExpense,
} from "@/prisma/fixedExpenses";
import {
  createTransaction,
  deleteTransaction,
  payTransaction,
  unpayTransaction,
  updateTransaction,
} from "@/prisma/transactions";
import { setMonthStartDay, setTrackingStartPeriod } from "@/prisma/settings";
import { parseLocalDate, type TxType } from "@/lib/finance";

function refresh() {
  revalidatePath("/", "layout");
}

export async function createTransactionAction(input: {
  type: TxType;
  subcategoryId: string;
  description?: string;
  amount: number;
  periodMonth: string;
  dueDate?: string | null;
  paid: boolean;
}) {
  const user = await requireUser();
  await createTransaction(user.id, {
    type: input.type,
    subcategoryId: input.subcategoryId,
    description: input.description,
    amount: input.amount,
    periodMonth: input.periodMonth,
    dueDate: input.dueDate ? parseLocalDate(input.dueDate) : null,
    paid: input.paid,
  });
  refresh();
}

export async function payTransactionAction(input: {
  id: string;
  paidAmount: number;
  paidDate: string;
}) {
  const user = await requireUser();
  await payTransaction(user.id, input.id, {
    paidAmount: input.paidAmount,
    paidDate: parseLocalDate(input.paidDate),
  });
  refresh();
}

export async function unpayTransactionAction(id: string) {
  const user = await requireUser();
  await unpayTransaction(user.id, id);
  refresh();
}

export async function updateTransactionAction(input: {
  id: string;
  subcategoryId: string;
  description?: string;
  amount: number;
}) {
  const user = await requireUser();
  const { id, ...rest } = input;
  await updateTransaction(user.id, id, rest);
  refresh();
}

export async function deleteTransactionAction(id: string) {
  const user = await requireUser();
  await deleteTransaction(user.id, id);
  refresh();
}

export async function createFixedExpenseAction(input: {
  subcategoryId: string;
  name: string;
  estimatedAmount: number;
  dueDay: number;
}) {
  const user = await requireUser();
  await createFixedExpense(user.id, input);
  refresh();
}

export async function setFixedExpenseActiveAction(id: string, active: boolean) {
  const user = await requireUser();
  await setFixedExpenseActive(user.id, id, active);
  refresh();
}

export async function updateFixedExpenseAction(input: {
  id: string;
  subcategoryId: string;
  name: string;
  estimatedAmount: number;
  dueDay: number;
}) {
  const user = await requireUser();
  const { id, ...rest } = input;
  await updateFixedExpense(user.id, id, rest);
  refresh();
}

export async function deleteFixedExpenseAction(id: string) {
  const user = await requireUser();
  await deleteFixedExpense(user.id, id);
  refresh();
}

export async function createCategoryAction(input: {
  name: string;
  color: string;
  icon: string;
}) {
  const user = await requireUser();
  await createCategory(user.id, input);
  refresh();
}

export async function createSubcategoryAction(input: {
  categoryId: string;
  name: string;
  type: TxType;
  icon: string;
}) {
  const user = await requireUser();
  await createSubcategory(user.id, input);
  refresh();
}

export async function updateSubcategoryAction(input: {
  id: string;
  name: string;
  type: TxType;
  icon: string;
}) {
  const user = await requireUser();
  const { id, ...rest } = input;
  await updateSubcategory(user.id, id, rest);
  refresh();
}

export async function deleteCategoryAction(id: string) {
  const user = await requireUser();
  await deleteCategory(user.id, id);
  refresh();
}

export async function deleteSubcategoryAction(id: string) {
  const user = await requireUser();
  await deleteSubcategory(user.id, id);
  refresh();
}

export async function updateMonthStartDayAction(day: number) {
  const user = await requireUser();
  await setMonthStartDay(user.id, day);
  refresh();
}

export async function setTrackingStartPeriodAction(period: string | null) {
  const user = await requireUser();
  await setTrackingStartPeriod(user.id, period);
  refresh();
}

export async function setBudgetAction(input: {
  subcategoryId: string;
  monthlyAmount: number;
}) {
  const user = await requireUser();
  await upsertBudget(user.id, input.subcategoryId, input.monthlyAmount);
  refresh();
}

export async function deleteBudgetAction(subcategoryId: string) {
  const user = await requireUser();
  await deleteBudget(user.id, subcategoryId);
  refresh();
}
