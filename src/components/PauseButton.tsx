"use client";

import { useTransition } from "react";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { setFixedExpenseActiveAction } from "@/app/(app)/actions";

export default function PauseButton({ id, active }: { id: string; active: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => setFixedExpenseActiveAction(id, !active))}
      title={active ? "Pausar (remove os lançamentos pendentes deste mês em diante)" : "Retomar"}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: pending ? 0.6 : 1,
      }}
    >
      {active ? <TbPlayerPause size={13} /> : <TbPlayerPlay size={13} />}
    </button>
  );
}
