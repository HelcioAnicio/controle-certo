"use client";

import { TbPencil } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";
import type { EnrichedTransaction } from "@/lib/dashboard";

export default function EditTransactionButton({ tx }: { tx: EnrichedTransaction }) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() =>
        openModal("editarLancamento", {
          id: tx.id,
          type: tx.type,
          subcategoryId: tx.subcategoryId,
          description: tx.description ?? "",
          amount: Number(tx.amount),
        })
      }
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text-disabled)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TbPencil size={13} />
    </button>
  );
}
