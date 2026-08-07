"use client";

import { useState, useTransition } from "react";
import { setTrackingStartPeriodAction } from "@/app/(app)/actions";
import { useToast } from "./providers/ToastProvider";
import { cn } from "@/lib/cn";

export default function TrackingStartMonthInput({
  initialPeriod,
}: {
  initialPeriod: string | null;
}) {
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
    <div className="flex items-center gap-2">
      <input
        type="month"
        value={period}
        onChange={handleChange}
        disabled={pending}
        className={cn(
          "rounded-sm border border-border bg-canvas px-2.5 py-1.5 text-[13px] text-text-secondary",
          pending && "opacity-60",
        )}
      />
      {period && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            handleChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className="border-none bg-transparent text-xs font-semibold text-danger"
        >
          Remover
        </button>
      )}
    </div>
  );
}
