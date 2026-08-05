"use client";

import { useState, useTransition } from "react";
import { setTrackingStartPeriodAction } from "@/app/(app)/actions";
import { useToast } from "./providers/ToastProvider";

export default function TrackingStartMonthInput({ initialPeriod }: { initialPeriod: string | null }) {
  const [period, setPeriod] = useState(initialPeriod ?? "");
  const [pending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPeriod(value);
    startTransition(async () => {
      await setTrackingStartPeriodAction(value || null);
      showToast(value ? "Mês de início definido ✓" : "Mês de início removido");
    });
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="month"
        value={period}
        onChange={handleChange}
        disabled={pending}
        style={{
          fontSize: 13,
          color: "var(--text-secondary)",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "6px 10px",
          opacity: pending ? 0.6 : 1,
        }}
      />
      {period && (
        <button
          type="button"
          disabled={pending}
          onClick={() => handleChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
          style={{ border: "none", background: "none", color: "var(--color-danger)", fontSize: 12, fontWeight: 600 }}
        >
          Remover
        </button>
      )}
    </div>
  );
}
