"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { payTransactionAction } from "@/app/(app)/actions";
import { formatBRL } from "@/lib/finance";
import type { TxType } from "@/lib/finance";
import { cn } from "@/lib/cn";
import { closeBtn, fieldLabel, inputStyle, modalHeader, modalTitle, secondaryBtn, successBtn } from "./styles";

export type PagamentoCtx = {
  id: string;
  desc: string;
  amount: number;
  type: TxType;
  locked: boolean;
  lockDateLabel?: string;
};

function todayInputValue() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ConfirmarPagamentoModal({ ctx }: { ctx: PagamentoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [amount, setAmount] = useState(String(ctx.amount));
  const [date, setDate] = useState(todayInputValue());
  const [pending, startTransition] = useTransition();
  const isIncome = ctx.type === "income";

  function confirm() {
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) return;
    startTransition(async () => {
      await payTransactionAction({ id: ctx.id, paidAmount: amountNum, paidDate: date });
      closeModal();
      showToast(isIncome ? "Recebimento registrado ✓" : "Pagamento registrado ✓");
    });
  }

  return (
    <div>
      <div className={modalHeader}>
        <div className={modalTitle}>{isIncome ? "Confirmar recebimento" : "Confirmar pagamento"}</div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      {ctx.locked ? (
        <>
          <div className="px-2.5 py-[30px] text-center text-sm text-text-secondary">
            Disponível a partir de {ctx.lockDateLabel}.
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="w-full rounded-md border-none bg-border-soft p-[13px] text-sm font-semibold text-[#334155]"
          >
            Entendi
          </button>
        </>
      ) : (
        <>
          <div className="mb-0.5 text-sm font-semibold">{ctx.desc}</div>
          <div className="mb-[18px] text-xs text-text-secondary">Valor planejado: {formatBRL(ctx.amount)}</div>
          <div className="flex flex-col gap-3.5">
            <div>
              <div className={fieldLabel}>{isIncome ? "Valor recebido" : "Valor pago"}</div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(inputStyle, "text-base font-bold")}
              />
            </div>
            <div>
              <div className={fieldLabel}>{isIncome ? "Data do recebimento" : "Data do pagamento"}</div>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputStyle} />
            </div>
          </div>
          <div className="mt-[22px] flex gap-2.5">
            <button type="button" onClick={closeModal} className={secondaryBtn}>
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className={cn(successBtn, pending && "opacity-70")}
            >
              {pending ? "Confirmando…" : isIncome ? "Confirmar recebimento" : "Confirmar pagamento"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
