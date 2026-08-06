"use client";

import { useState, useTransition } from "react";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { createFixedExpenseAction, updateFixedExpenseAction } from "@/app/(app)/actions";
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

export type NovoFixoCtx = {
  id: string;
  name: string;
  subcategoryId: string;
  estimatedAmount: number;
  dueDay: number;
};

export default function NovoFixoModal({ ctx }: { ctx?: NovoFixoCtx }) {
  const { categories, subcategories } = useCategories();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const isEdit = !!ctx;
  const editingSub = isEdit ? subcategories.find((s) => s.id === ctx.subcategoryId) : undefined;

  const [type, setType] = useState<TxType>(editingSub?.type ?? "expense");
  const options = buildSubcategoryOptions(categories, subcategories, (s) => s.type === type);

  const [name, setName] = useState(ctx?.name ?? "");
  const [subcategoryId, setSubcategoryId] = useState(ctx?.subcategoryId ?? "");
  const [amount, setAmount] = useState(ctx ? String(ctx.estimatedAmount) : "");
  const [dueDay, setDueDay] = useState(ctx ? String(ctx.dueDay) : "");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    const dayNum = Number(dueDay);
    if (!name.trim()) return setError("Informe um nome.");
    if (!subcategoryId) return setError("Selecione uma subcategoria.");
    if (!amountNum || amountNum <= 0) return setError("Informe um valor estimado válido.");
    if (!dayNum || dayNum < 1 || dayNum > 31) return setError("Informe um dia de vencimento entre 1 e 31.");

    setError("");
    startTransition(async () => {
      if (isEdit) {
        await updateFixedExpenseAction({
          id: ctx.id,
          name: name.trim(),
          subcategoryId,
          estimatedAmount: amountNum,
          dueDay: dayNum,
        });
      } else {
        await createFixedExpenseAction({
          name: name.trim(),
          subcategoryId,
          estimatedAmount: amountNum,
          dueDay: dayNum,
        });
      }
      closeModal();
      showToast(isEdit ? "Fixo atualizado ✓" : "Fixo salvo ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={modalHeader}>
        <div className={modalTitle}>{isEdit ? "Editar fixo" : "Novo fixo"}</div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      <div className="mb-[18px] flex gap-2 rounded-md bg-border-soft p-1">
        <button
          type="button"
          onClick={() => {
            setType("expense");
            setSubcategoryId("");
          }}
          className={cn(
            "flex-1 rounded-[9px] border-none p-2.5 text-sm font-semibold",
            type === "expense" ? "bg-surface text-danger" : "bg-transparent text-text-secondary",
          )}
        >
          Despesa
        </button>
        <button
          type="button"
          onClick={() => {
            setType("income");
            setSubcategoryId("");
          }}
          className={cn(
            "flex-1 rounded-[9px] border-none p-2.5 text-sm font-semibold",
            type === "income" ? "bg-surface text-success" : "bg-transparent text-text-secondary",
          )}
        >
          Receita
        </button>
      </div>

      <div className={formGap}>
        <div>
          <div className={fieldLabel}>Nome</div>
          <input
            type="text"
            placeholder={type === "income" ? "Ex.: Salário" : "Ex.: Conta de Luz"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            autoFocus
          />
        </div>
        <div>
          <div className={fieldLabel}>Subcategoria</div>
          <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} className={inputStyle}>
            <option value="">Selecione…</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className={fieldLabel}>{type === "income" ? "Valor médio recebido" : "Valor estimado"}</div>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div className="flex-1">
            <div className={fieldLabel}>{type === "income" ? "Dia do recebimento" : "Dia de vencimento"}</div>
            <input
              type="number"
              min="1"
              max="31"
              placeholder="Ex.: 10"
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="rounded-[10px] bg-canvas px-3.5 py-3 text-xs leading-normal text-text-secondary">
          {type === "income"
            ? "O valor é usado só para a previsão. Todo mês esta receita aparecerá como pendente; na hora de confirmar o recebimento você informa o valor real."
            : "O valor estimado é usado só para a previsão. Todo mês este gasto aparecerá como pendente; na hora de pagar você confirma o valor real."}
        </div>
        {error && <div className="text-[13px] text-danger">{error}</div>}
      </div>

      <div className={footerRow}>
        <button type="button" onClick={closeModal} className={secondaryBtn}>
          Cancelar
        </button>
        <button type="submit" disabled={pending} className={cn(primaryBtn, pending && "opacity-70")}>
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
