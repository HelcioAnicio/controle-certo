"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import {
  deleteCategoryAction,
  deleteFixedExpenseAction,
  deleteSubcategoryAction,
  deleteTransactionAction,
} from "@/app/(app)/actions";
import { dangerBtn, secondaryBtn } from "./styles";

export type ExclusaoCtx = {
  id: string;
  desc: string;
  kind?: "transaction" | "fixedExpense" | "category" | "subcategory";
};

const DESCRIPTIONS: Record<NonNullable<ExclusaoCtx["kind"]>, string> = {
  transaction: "Esta ação não pode ser desfeita. O lançamento será removido permanentemente da sua lista deste mês.",
  fixedExpense:
    "Esta ação não pode ser desfeita. Este fixo deixará de ser gerado nos próximos meses; lançamentos já feitos com ele permanecem no seu histórico.",
  category: "Esta ação não pode ser desfeita. Só é possível excluir categorias sem subcategorias.",
  subcategory:
    "Esta ação não pode ser desfeita. Só é possível excluir subcategorias sem lançamentos ou gastos fixos vinculados.",
};

export default function ConfirmarExclusaoModal({ ctx }: { ctx: ExclusaoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const kind = ctx.kind ?? "transaction";

  function confirm() {
    setError("");
    startTransition(async () => {
      try {
        if (kind === "fixedExpense") {
          await deleteFixedExpenseAction(ctx.id);
        } else if (kind === "category") {
          await deleteCategoryAction(ctx.id);
        } else if (kind === "subcategory") {
          await deleteSubcategoryAction(ctx.id);
        } else {
          await deleteTransactionAction(ctx.id);
        }
        closeModal();
        showToast("Excluído com sucesso");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Não foi possível excluir.");
      }
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
      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>
        {DESCRIPTIONS[kind]}
      </div>
      {error && (
        <div style={{ fontSize: 13, color: "var(--color-danger)", marginBottom: 14 }}>{error}</div>
      )}
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
