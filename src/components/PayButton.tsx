"use client";

import { useModal } from "./providers/ModalProvider";
import type { EnrichedTransaction } from "@/lib/dashboard";
import { cn } from "@/lib/cn";

export default function PayButton({
  tx,
  variant = "compact",
}: {
  tx: EnrichedTransaction;
  variant?: "compact" | "row";
}) {
  const { openModal } = useModal();
  const isIncome = tx.type === "income";
  const paid = tx.status === "paid";
  const label = paid
    ? isIncome
      ? "Recebido"
      : "Pago"
    : isIncome
      ? "Receber"
      : "Pagar";

  const className = cn(
    "whitespace-nowrap rounded-sm border-none text-xs font-semibold",
    variant === "row" ? "px-3.5 py-[7px]" : "px-3 py-1.5",
    paid
      ? isIncome
        ? "bg-success-tint text-success"
        : "bg-primary-tint text-primary"
      : "bg-primary text-white",
  );

  return (
    <button
      type="button"
      onClick={() =>
        openModal("confirmarPagamento", {
          id: tx.id,
          desc: tx.description || tx.subcategoryName,
          amount: Number(tx.amount),
          type: tx.type,
          paid,
          paidAmount: tx.paidAmount ? Number(tx.paidAmount) : null,
          paidDate: tx.paidDate,
        })
      }
      className={className}
    >
      {label}
    </button>
  );
}
