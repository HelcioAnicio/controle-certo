"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { useSettings } from "../providers/SettingsProvider";
import { createTransactionAction } from "@/app/(app)/actions";
import { buildSubcategoryOptions, periodForDate, type TxType } from "@/lib/finance";
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

export default function NovoLancamentoModal() {
  const { categories, subcategories } = useCategories();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { monthStartDay } = useSettings();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get("month") || periodForDate(new Date(), monthStartDay);

  const [type, setType] = useState<TxType>("expense");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState(true);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const options = buildSubcategoryOptions(categories, subcategories, (s) => s.type === type);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) {
      setError("Informe um valor válido.");
      return;
    }
    const sub = subcategoryId || options[0]?.id;
    if (!sub) {
      setError("Cadastre uma subcategoria antes de lançar.");
      return;
    }
    setError("");
    startTransition(async () => {
      await createTransactionAction({
        type,
        subcategoryId: sub,
        description,
        amount: amountNum,
        periodMonth: date ? periodForDate(new Date(date), monthStartDay) : currentPeriod,
        dueDate: date || null,
        paid,
      });
      closeModal();
      showToast("Lançamento salvo ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={modalHeader}>
        <div style={modalTitle}>Novo lançamento</div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
          background: "var(--border-soft)",
          padding: 4,
          borderRadius: "var(--radius-md)",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setType("expense");
            setSubcategoryId("");
          }}
          style={typeTabStyle(type === "expense", "var(--color-danger)")}
        >
          Despesa
        </button>
        <button
          type="button"
          onClick={() => {
            setType("income");
            setSubcategoryId("");
          }}
          style={typeTabStyle(type === "income", "var(--color-success)")}
        >
          Receita
        </button>
      </div>

      <div style={{ marginBottom: 18 }}>
        <input
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 36,
            fontWeight: 800,
            color: "var(--text)",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
      </div>

      <div style={formGap}>
        <div>
          <div style={fieldLabel}>Subcategoria</div>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            style={inputStyle}
          >
            <option value="">Selecione…</option>
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
            placeholder="Ex.: Jantar de aniversário"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={fieldLabel}>Data (opcional)</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
          {date && new Date(date) > new Date(new Date().toDateString()) && (
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>
              Este gasto ficará agendado e só entrará no seu saldo em{" "}
              {new Date(date).toLocaleDateString("pt-BR")}.
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Já foi pago?</span>
          <Switch checked={paid} onChange={setPaid} />
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

function typeTabStyle(active: boolean, activeColor: string): React.CSSProperties {
  return {
    flex: 1,
    padding: 10,
    border: "none",
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 600,
    background: active ? "var(--surface)" : "transparent",
    color: active ? activeColor : "var(--text-secondary)",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
  };
}

export function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 42,
        height: 24,
        borderRadius: 99,
        background: checked ? "var(--color-primary)" : "var(--border)",
        position: "relative",
        border: "none",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: checked ? 21 : 3,
          transition: "left 0.15s ease",
        }}
      />
    </button>
  );
}
