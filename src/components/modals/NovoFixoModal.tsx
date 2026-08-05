"use client";

import { useState, useTransition } from "react";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { createFixedExpenseAction, updateFixedExpenseAction } from "@/app/(app)/actions";
import { buildSubcategoryOptions, type TxType } from "@/lib/finance";
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
      <div style={modalHeader}>
        <div style={modalTitle}>{isEdit ? "Editar fixo" : "Novo fixo"}</div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 18, background: "var(--border-soft)", padding: 4, borderRadius: "var(--radius-md)" }}>
        <button
          type="button"
          onClick={() => {
            setType("expense");
            setSubcategoryId("");
          }}
          style={{
            flex: 1,
            padding: 10,
            border: "none",
            borderRadius: 9,
            fontSize: 14,
            fontWeight: 600,
            background: type === "expense" ? "var(--surface)" : "transparent",
            color: type === "expense" ? "var(--color-danger)" : "var(--text-secondary)",
          }}
        >
          Despesa
        </button>
        <button
          type="button"
          onClick={() => {
            setType("income");
            setSubcategoryId("");
          }}
          style={{
            flex: 1,
            padding: 10,
            border: "none",
            borderRadius: 9,
            fontSize: 14,
            fontWeight: 600,
            background: type === "income" ? "var(--surface)" : "transparent",
            color: type === "income" ? "var(--color-success)" : "var(--text-secondary)",
          }}
        >
          Receita
        </button>
      </div>

      <div style={formGap}>
        <div>
          <div style={fieldLabel}>Nome</div>
          <input
            type="text"
            placeholder={type === "income" ? "Ex.: Salário" : "Ex.: Conta de Luz"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>
        <div>
          <div style={fieldLabel}>Subcategoria</div>
          <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} style={inputStyle}>
            <option value="">Selecione…</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={fieldLabel}>{type === "income" ? "Valor médio recebido" : "Valor estimado"}</div>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={fieldLabel}>{type === "income" ? "Dia do recebimento" : "Dia de vencimento"}</div>
            <input
              type="number"
              min="1"
              max="31"
              placeholder="Ex.: 10"
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              style={inputStyle}
            />
          </div>
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
          {type === "income"
            ? "O valor é usado só para a previsão. Todo mês esta receita aparecerá como pendente; na hora de confirmar o recebimento você informa o valor real."
            : "O valor estimado é usado só para a previsão. Todo mês este gasto aparecerá como pendente; na hora de pagar você confirma o valor real."}
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
    </form>
  );
}
