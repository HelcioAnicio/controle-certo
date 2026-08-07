"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { deleteBudgetAction, setBudgetAction } from "@/app/(app)/actions";
import { cn } from "@/lib/cn";
import {
  closeBtn,
  fieldLabel,
  footerRow,
  formGap,
  inputStyle,
  modalHeader,
  modalTitle,
  primaryBtn,
  secondaryBtn,
} from "./styles";

export type OrcamentoCtx = {
  subcategoryId: string;
  subcategoryName: string;
  currentAmount: number;
};

export default function DefinirOrcamentoModal({ ctx }: { ctx: OrcamentoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [amount, setAmount] = useState(
    ctx.currentAmount > 0 ? String(ctx.currentAmount) : "",
  );
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0)
      return setError("Informe um valor mensal válido.");
    setError("");
    startTransition(async () => {
      await setBudgetAction({
        subcategoryId: ctx.subcategoryId,
        monthlyAmount: amountNum,
      });
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
      <div className={modalHeader}>
        <div className={modalTitle}>Orçamento mensal</div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      <div className={formGap}>
        <div>
          <div className={fieldLabel}>Categoria</div>
          <div className="rounded-md bg-primary-tint px-3.5 py-3 text-sm font-semibold text-primary-dark">
            {ctx.subcategoryName}
          </div>
        </div>
        <div>
          <div className={fieldLabel}>Valor reservado por mês</div>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputStyle}
            autoFocus
          />
        </div>
        <div className="rounded-[10px] bg-canvas px-3.5 py-3 text-xs leading-normal text-text-secondary">
          Esse valor se repete todo mês. Conforme você lança despesas nesta
          subcategoria, o restante do orçamento é abatido automaticamente.
        </div>
        {error && <div className="text-[13px] text-danger">{error}</div>}
      </div>

      <div className={footerRow}>
        <button type="button" onClick={closeModal} className={secondaryBtn}>
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className={cn(primaryBtn, pending && "opacity-70")}
        >
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </div>
      {ctx.currentAmount > 0 && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={pending}
          className="mt-2.5 w-full border-none bg-transparent p-2.5 text-xs font-semibold text-danger"
        >
          Remover orçamento
        </button>
      )}
    </form>
  );
}
