"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useCategories } from "../providers/CategoriesProvider";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { useSettings } from "../providers/SettingsProvider";
import { createTransactionAction } from "@/app/(app)/actions";
import {
  buildSubcategoryOptions,
  parseLocalDate,
  periodForDate,
  type TxType,
} from "@/lib/finance";
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

export default function NovoLancamentoModal() {
  const { categories, subcategories } = useCategories();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { monthStartDay } = useSettings();
  const searchParams = useSearchParams();
  const currentPeriod =
    searchParams.get("month") || periodForDate(new Date(), monthStartDay);

  const [type, setType] = useState<TxType>("expense");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState(true);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const options = buildSubcategoryOptions(
    categories,
    subcategories,
    (s) => s.type === type,
  );

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
        periodMonth: date
          ? periodForDate(parseLocalDate(date), monthStartDay)
          : currentPeriod,
        dueDate: date || null,
        paid,
      });
      closeModal();
      showToast("Lançamento salvo ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={modalHeader}>
        <div className={modalTitle}>Novo lançamento</div>
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
          className={typeTabClass(type === "expense", "text-danger")}
        >
          Despesa
        </button>
        <button
          type="button"
          onClick={() => {
            setType("income");
            setSubcategoryId("");
          }}
          className={typeTabClass(type === "income", "text-success")}
        >
          Receita
        </button>
      </div>

      <div className="mb-[18px]">
        <input
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
          className="w-full border-none bg-transparent text-center text-4xl font-extrabold text-text outline-none"
        />
      </div>

      <div className={formGap}>
        <div>
          <div className={fieldLabel}>Subcategoria</div>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className={inputStyle}
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
          <div className={fieldLabel}>Descrição (opcional)</div>
          <input
            type="text"
            placeholder="Ex.: Jantar de aniversário"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <div className={fieldLabel}>Data (opcional)</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputStyle}
          />
          {date &&
            parseLocalDate(date) > new Date(new Date().toDateString()) && (
              <div className="mt-1.5 text-xs text-text-secondary">
                Este gasto ficará agendado e só entrará no seu saldo em{" "}
                {parseLocalDate(date).toLocaleDateString("pt-BR")}.
              </div>
            )}
        </div>
        <div className="flex items-center justify-between px-0.5 py-2.5">
          <span className="text-sm font-medium">
            {type === "income" ? "Já foi recebido?" : "Já foi pago?"}
          </span>
          <Switch checked={paid} onChange={setPaid} />
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

function typeTabClass(active: boolean, activeTextClass: string): string {
  return cn(
    "flex-1 rounded-[9px] border-none p-2.5 text-sm font-semibold",
    active
      ? `bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${activeTextClass}`
      : "bg-transparent text-text-secondary",
  );
}

export function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-[42px] shrink-0 rounded-full border-none",
        checked ? "bg-primary" : "bg-border",
      )}
    >
      <div
        className={cn(
          "absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-[left] duration-150 [transition-timing-function:ease]",
          checked ? "left-[21px]" : "left-[3px]",
        )}
      />
    </button>
  );
}
