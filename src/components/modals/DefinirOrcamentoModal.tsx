"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { deleteBudgetAction, setBudgetAction } from "@/app/(app)/actions";
import { closeBtn, fieldLabel, footerRow, formGap, inputStyle, modalHeader, modalTitle, primaryBtn, secondaryBtn } from "./styles";

export type OrcamentoCtx = {
  subcategoryId: string;
  subcategoryName: string;
  currentAmount: number;
};

export default function DefinirOrcamentoModal({ ctx }: { ctx: OrcamentoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [amount, setAmount] = useState(ctx.currentAmount > 0 ? String(ctx.currentAmount) : "");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) return setError("Informe um valor mensal válido.");
    setError("");
    startTransition(async () => {
      await setBudgetAction({ subcategoryId: ctx.subcategoryId, monthlyAmount: amountNum });
      closeModal();
      showToast("Orçamento salvo ✓");
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await deleteBudgetAction(ctx.subcategoryId);
      closeModal();
      showToast("Orçamento removido");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={modalHeader}>
        <div style={modalTitle}>Orçamento mensal</div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      <div style={formGap}>
        <div>
          <div style={fieldLabel}>Categoria</div>
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-tint)",
              color: "var(--color-primary-dark)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {ctx.subcategoryName}
          </div>
        </div>
        <div>
          <div style={fieldLabel}>Valor reservado por mês</div>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            background: "var(--bg)",
            padding: "12px 14px",
            borderRadius: 10,
            lineHeight: 1.5,
          }}
        >
          Esse valor se repete todo mês. Conforme você lança despesas nesta subcategoria, o
          restante do orçamento é abatido automaticamente.
        </div>
        {error && <div style={{ fontSize: 13, color: "var(--color-danger)" }}>{error}</div>}
      </div>

      <div style={footerRow}>
        <button type="button" onClick={closeModal} style={secondaryBtn}>
          Cancelar
        </button>
        <button type="submit" disabled={pending} style={{ ...primaryBtn, opacity: pending ? 0.7 : 1 }}>
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </div>
      {ctx.currentAmount > 0 && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={pending}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 10,
            border: "none",
            background: "none",
            color: "var(--color-danger)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Remover orçamento
        </button>
      )}
    </form>
  );
}
