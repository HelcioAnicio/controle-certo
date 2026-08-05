"use client";

import { useState, useTransition } from "react";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { updateTransactionAction } from "@/app/(app)/actions";
import { buildSubcategoryOptions, type TxType } from "@/lib/finance";
import { closeBtn, fieldLabel, footerRow, formGap, inputStyle, modalHeader, modalTitle, primaryBtn, secondaryBtn } from "./styles";

export type EditarLancamentoCtx = {
  id: string;
  type: TxType;
  subcategoryId: string;
  description: string;
  amount: number;
};

export default function EditarLancamentoModal({ ctx }: { ctx: EditarLancamentoCtx }) {
  const { categories, subcategories } = useCategories();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const options = buildSubcategoryOptions(categories, subcategories, (s) => s.type === ctx.type);

  const [subcategoryId, setSubcategoryId] = useState(ctx.subcategoryId);
  const [amount, setAmount] = useState(String(ctx.amount));
  const [description, setDescription] = useState(ctx.description);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) return setError("Informe um valor válido.");
    if (!subcategoryId) return setError("Selecione uma subcategoria.");
    setError("");
    startTransition(async () => {
      await updateTransactionAction({ id: ctx.id, subcategoryId, description, amount: amountNum });
      closeModal();
      showToast("Lançamento atualizado ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={modalHeader}>
        <div style={modalTitle}>Editar lançamento</div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      <div style={formGap}>
        <div>
          <div style={fieldLabel}>Subcategoria</div>
          <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} style={inputStyle}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div style={fieldLabel}>Descrição (opcional)</div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={fieldLabel}>Valor</div>
          <input
            type="number"
            step="0.01"
            min="0"
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
          Isso atualiza só este lançamento, neste mês — não muda os outros meses nem o valor já
          pago, se houver.
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
