"use client";

import { useState } from "react";
import { TbQuestionMark } from "react-icons/tb";

export default function HelpButton({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Como ler esta tela"
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TbQuestionMark size={15} />
      </button>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: "var(--border-soft)",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
