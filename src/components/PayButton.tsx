"use client";

import { useModal } from "./providers/ModalProvider";
import type { EnrichedTransaction } from "@/lib/dashboard";

export default function PayButton({
  tx,
  variant = "compact",
}: {
  tx: EnrichedTransaction;
  variant?: "compact" | "row";
}) {
  const { openModal } = useModal();
  const payable = tx.status !== "paid" && tx.status !== "scheduled";
  const label = tx.status === "paid" ? "Pago" : payable ? "Pagar" : tx.status === "scheduled" ? "Bloqueado" : "Indisponível";
  const locked = !payable;

  const baseStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    padding: variant === "row" ? "7px 14px" : "6px 12px",
    borderRadius: 8,
    border: "none",
    whiteSpace: "nowrap",
    ...(tx.status === "paid"
      ? { background: "var(--color-success-tint)", color: "var(--color-success)", cursor: "default" }
      : locked
        ? { background: "var(--border-soft)", color: "var(--text-disabled)", cursor: "not-allowed" }
        : { background: "var(--color-primary)", color: "#fff" }),
  };

  return (
    <button
      type="button"
      disabled={locked}
      title={locked && tx.status === "scheduled" && tx.dueDate ? `Disponível a partir de ${tx.dueDate.toLocaleDateString("pt-BR")}` : undefined}
      onClick={() =>
        openModal("confirmarPagamento", {
          id: tx.id,
          desc: tx.description || tx.subcategoryName,
          amount: Number(tx.amount),
          locked,
          lockDateLabel: tx.dueDate ? tx.dueDate.toLocaleDateString("pt-BR") : undefined,
        })
      }
      style={baseStyle}
    >
      {label}
    </button>
  );
}
