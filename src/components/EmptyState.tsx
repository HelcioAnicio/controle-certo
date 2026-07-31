"use client";

import { TbMoodEmpty, TbPlus } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";

export default function EmptyState({
  title,
  description,
  actionLabel = "+ Novo lançamento",
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  const { openModal } = useModal();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 20px",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--color-primary-tint)",
          color: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TbMoodEmpty size={30} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 320 }}>{description}</div>
      <button
        type="button"
        onClick={() => openModal("novoLancamento")}
        style={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "11px 18px",
          border: "none",
          borderRadius: "var(--radius-md)",
          background: "var(--color-primary)",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <TbPlus size={16} /> {actionLabel.replace("+ ", "")}
      </button>
    </div>
  );
}
