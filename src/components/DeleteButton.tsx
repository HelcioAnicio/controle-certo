"use client";

import { TbX } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";

export default function DeleteButton({
  id,
  desc,
  kind = "transaction",
}: {
  id: string;
  desc: string;
  kind?: "transaction" | "fixedExpense";
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() => openModal("confirmarExclusao", { id, desc, kind })}
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
      <TbX size={14} />
    </button>
  );
}
