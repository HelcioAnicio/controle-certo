"use client";

import { TbX } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";

const boxedStyle: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text-disabled)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const compactStyle: React.CSSProperties = {
  border: "none",
  background: "none",
  color: "var(--text)",
  fontSize: 12,
  display: "flex",
};

export default function DeleteButton({
  id,
  desc,
  kind = "transaction",
  variant = "boxed",
}: {
  id: string;
  desc: string;
  kind?: "transaction" | "fixedExpense" | "category" | "subcategory";
  variant?: "boxed" | "compact";
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() => openModal("confirmarExclusao", { id, desc, kind })}
      style={variant === "compact" ? compactStyle : boxedStyle}
    >
      <TbX size={variant === "compact" ? 13 : 14} />
    </button>
  );
}
