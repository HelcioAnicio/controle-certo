"use client";

import { TbPencil } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";
import type { FixedExpense } from "@/prisma/fixedExpenses";

export default function EditFixedExpenseButton({ fixedExpense }: { fixedExpense: FixedExpense }) {
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
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "#334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TbPencil size={13} />
    </button>
  );
}
