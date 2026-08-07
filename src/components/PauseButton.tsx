"use client";

import { useTransition } from "react";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { setFixedExpenseActiveAction } from "@/app/(app)/actions";
import { cn } from "@/lib/cn";

export default function PauseButton({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(() => setFixedExpenseActiveAction(id, !active))
      }
      title={
        active
          ? "Pausar (remove os lançamentos pendentes deste mês em diante)"
          : "Retomar"
      }
      className={cn(
        "flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-border bg-surface text-text-secondary",
        pending && "opacity-60",
      )}
    >
      {active ? <TbPlayerPause size={13} /> : <TbPlayerPlay size={13} />}
    </button>
  );
}
