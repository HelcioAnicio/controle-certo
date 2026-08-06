"use client";

import { TbX } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";

const boxedStyle =
  "flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-border bg-surface text-text-disabled";

const compactStyle = "flex border-none bg-transparent text-xs text-text";

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
      className={variant === "compact" ? compactStyle : boxedStyle}
    >
      <TbX size={variant === "compact" ? 13 : 14} />
    </button>
  );
}
