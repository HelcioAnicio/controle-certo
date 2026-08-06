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
      className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-border bg-surface text-text-disabled"
    >
      <TbPencil size={13} />
    </button>
  );
}
