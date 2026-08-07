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
  const payable = tx.status !== "paid" && tx.status !== "scheduled";
  const label =
    tx.status === "paid"
      ? isIncome
        ? "Recebido"
        : "Pago"
      : payable
        ? isIncome
          ? "Receber"
          : "Pagar"
        : tx.status === "scheduled"
          ? "Agendado"
          : "Indisponível";
  const locked = !payable;

  const className = cn(
    "whitespace-nowrap rounded-sm border-none text-xs font-semibold",
    variant === "row" ? "px-3.5 py-[7px]" : "px-3 py-1.5",
    tx.status === "paid"
      ? "cursor-default bg-success-tint text-success"
      : locked
        ? "cursor-not-allowed bg-border-soft text-text-disabled"
        : "bg-primary text-white",
  );

  return (
    <button
      type="button"
      disabled={locked}
      title={
        locked && tx.status === "scheduled" && tx.dueDate
          ? `Disponível a partir de ${tx.dueDate.toLocaleDateString("pt-BR")}`
          : undefined
      }
      onClick={() =>
        openModal("confirmarPagamento", {
          id: tx.id,
          desc: tx.description || tx.subcategoryName,
          amount: Number(tx.amount),
          type: tx.type,
          locked,
          lockDateLabel: tx.dueDate
            ? tx.dueDate.toLocaleDateString("pt-BR")
            : undefined,
        })
      }
      className={className}
    >
      {label}
    </button>
  );
}
