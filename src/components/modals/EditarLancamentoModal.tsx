"use client";

import { useState, useTransition } from "react";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { updateTransactionAction } from "@/app/(app)/actions";
import { buildSubcategoryOptions, type TxType } from "@/lib/finance";
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

export type EditarLancamentoCtx = {
  id: string;
  type: TxType;
  subcategoryId: string;
  description: string;
  amount: number;
};

export default function EditarLancamentoModal({
  ctx,
}: {
  ctx: EditarLancamentoCtx;
}) {
  const { categories, subcategories } = useCategories();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const options = buildSubcategoryOptions(
    categories,
    subcategories,
    (s) => s.type === ctx.type,
  );

  const [subcategoryId, setSubcategoryId] = useState(ctx.subcategoryId);
  const [amount, setAmount] = useState(String(ctx.amount));
  const [description, setDescription] = useState(ctx.description);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0)
      return setError("Informe um valor válido.");
    if (!subcategoryId) return setError("Selecione uma subcategoria.");
    setError("");
    startTransition(async () => {
      await updateTransactionAction({
        id: ctx.id,
        subcategoryId,
        description,
        amount: amountNum,
      });
      closeModal();
      showToast("Lançamento atualizado ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={modalHeader}>
        <div className={modalTitle}>Editar lançamento</div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      <div className={formGap}>
        <div>
          <div className={fieldLabel}>Subcategoria</div>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className={inputStyle}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className={fieldLabel}>Descrição (opcional)</div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <div className={fieldLabel}>Valor</div>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputStyle}
            autoFocus
          />
        </div>
        <div className="rounded-[10px] bg-canvas px-3.5 py-3 text-xs leading-normal text-text-secondary">
          Isso atualiza só este lançamento, neste mês — não muda os outros meses
          nem o valor já pago, se houver.
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
    </form>
  );
}
