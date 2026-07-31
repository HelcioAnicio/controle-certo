"use client";

import type { CSSProperties } from "react";
import { useModal, type ModalName } from "./providers/ModalProvider";

export default function ModalTriggerButton<N extends ModalName>({
  modal,
  ctx,
  children,
  style,
}: {
  modal: N;
  ctx?: N extends "novaCategoria"
    ? { kind: "categoria" } | { kind: "subcategoria"; categoryId: string; categoryName: string }
    : never;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => openModal(modal, ctx as any)}
      style={{
        alignSelf: "flex-start",
        padding: "11px 18px",
        border: "none",
        borderRadius: "var(--radius-md)",
        background: "var(--color-primary)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
