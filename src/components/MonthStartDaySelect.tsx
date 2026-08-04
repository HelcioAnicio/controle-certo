"use client";

import { useState, useTransition } from "react";
import { updateMonthStartDayAction } from "@/app/(app)/actions";
import { useToast } from "./providers/ToastProvider";

export default function MonthStartDaySelect({ initialDay }: { initialDay: number }) {
  const [day, setDay] = useState(initialDay);
  const [pending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value);
    setDay(value);
    startTransition(async () => {
      await updateMonthStartDayAction(value);
      showToast("Dia de início do mês atualizado ✓");
    });
  }

  return (
    <select
      value={day}
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
    >
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>
          Dia {d}
        </option>
      ))}
    </select>
  );
}
