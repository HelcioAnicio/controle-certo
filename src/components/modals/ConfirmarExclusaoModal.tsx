"use client";

import { useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { deleteFixedExpenseAction, deleteTransactionAction } from "@/app/(app)/actions";
import { dangerBtn, secondaryBtn } from "./styles";

export type ExclusaoCtx = { id: string; desc: string; kind?: "transaction" | "fixedExpense" };

export default function ConfirmarExclusaoModal({ ctx }: { ctx: ExclusaoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [pending, startTransition] = useTransition();
  const isFixedExpense = ctx.kind === "fixedExpense";

  function confirm() {
    startTransition(async () => {
      if (isFixedExpense) {
        await deleteFixedExpenseAction(ctx.id);
      } else {
        await deleteTransactionAction(ctx.id);
      }
      closeModal();
      showToast("Excluído com sucesso");
    });
  }

  return (
    <div>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "var(--radius-md)",
          background: "var(--color-danger-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <div style={{ width: 18, height: 18, background: "var(--color-danger)", borderRadius: 4 }} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Excluir &quot;{ctx.desc}&quot;?</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 22 }}>
        {isFixedExpense
          ? "Esta ação não pode ser desfeita. O gasto fixo deixará de ser gerado nos próximos meses; lançamentos já feitos com ele permanecem no seu histórico."
          : "Esta ação não pode ser desfeita. O lançamento será removido permanentemente da sua lista deste mês."}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" onClick={closeModal} style={secondaryBtn}>
          Cancelar
        </button>
        <button type="button" onClick={confirm} disabled={pending} style={{ ...dangerBtn, opacity: pending ? 0.7 : 1 }}>
          {pending ? "Excluindo…" : "Excluir"}
        </button>
      </div>
    </div>
  );
}
