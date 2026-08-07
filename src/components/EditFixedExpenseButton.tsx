"use client";

import { TbPencil } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";
import type { FixedExpense } from "@/prisma/fixedExpenses";

export default function EditFixedExpenseButton({
  fixedExpense,
}: {
  fixedExpense: FixedExpense;
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() =>
        openModal("novoFixo", {
          id: fixedExpense.id,
          name: fixedExpense.name,
          subcategoryId: fixedExpense.subcategoryId,
          estimatedAmount: Number(fixedExpense.estimatedAmount),
          dueDay: fixedExpense.dueDay,
        })
      }
      className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-border bg-surface text-[#334155]"
    >
      <TbPencil size={13} />
    </button>
  );
}
