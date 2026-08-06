"use client";

import { useState, useTransition } from "react";
import { updateMonthStartDayAction } from "@/app/(app)/actions";
import { useToast } from "./providers/ToastProvider";
import { cn } from "@/lib/cn";

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
      className={cn(
        "rounded-sm border border-border bg-canvas px-2.5 py-1.5 text-[13px] text-text-secondary",
        pending && "opacity-60",
      )}
    >
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>
          Dia {d}
        </option>
      ))}
    </select>
  );
}
