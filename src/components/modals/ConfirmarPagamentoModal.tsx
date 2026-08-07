"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import {
  payTransactionAction,
  unpayTransactionAction,
} from "@/app/(app)/actions";
import { formatBRL, toBRDateKey } from "@/lib/finance";
import type { TxType } from "@/lib/finance";
import { cn } from "@/lib/cn";
import {
  closeBtn,
  fieldLabel,
  inputStyle,
  modalHeader,
  modalTitle,
  primaryBtn,
  secondaryBtn,
  successBtn,
} from "./styles";

export type PagamentoCtx = {
  id: string;
  desc: string;
  amount: number;
  type: TxType;
  paid?: boolean;
  paidAmount?: number | null;
  paidDate?: Date | null;
};

function todayInputValue() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ConfirmarPagamentoModal({
  ctx,
}: {
  ctx: PagamentoCtx;
}) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [amount, setAmount] = useState(
    String(ctx.paid ? (ctx.paidAmount ?? ctx.amount) : ctx.amount),
  );
  const [date, setDate] = useState(
    ctx.paid && ctx.paidDate ? toBRDateKey(ctx.paidDate) : todayInputValue(),
  );
  const [pending, startTransition] = useTransition();
  const [undoing, startUndoTransition] = useTransition();
  const isIncome = ctx.type === "income";

  function confirm() {
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) return;
    startTransition(async () => {
      await payTransactionAction({
        id: ctx.id,
        paidAmount: amountNum,
        paidDate: date,
      });
      closeModal();
      showToast(
        ctx.paid
          ? "Alterações salvas ✓"
          : isIncome
            ? "Recebimento registrado ✓"
            : "Pagamento registrado ✓",
      );
    });
  }

  function undo() {
    startUndoTransition(async () => {
      await unpayTransactionAction(ctx.id);
      closeModal();
      showToast(isIncome ? "Recebimento desfeito" : "Pagamento desfeito");
    });
  }

  return (
    <div>
      <div className={modalHeader}>
        <div className={modalTitle}>
          {ctx.paid
            ? isIncome
              ? "Editar recebimento"
              : "Editar pagamento"
            : isIncome
              ? "Confirmar recebimento"
              : "Confirmar pagamento"}
        </div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      <div className="mb-0.5 text-sm font-semibold">{ctx.desc}</div>
      <div className="mb-[18px] text-xs text-text-secondary">
        Valor planejado: {formatBRL(ctx.amount)}
      </div>
      <div className="flex flex-col gap-3.5">
        <div>
          <div className={fieldLabel}>
            {isIncome ? "Valor recebido" : "Valor pago"}
          </div>
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
          <div className={fieldLabel}>
            {isIncome ? "Data do recebimento" : "Data do pagamento"}
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputStyle}
          />
        </div>
      </div>
      {ctx.paid && (
        <button
          type="button"
          onClick={undo}
          disabled={undoing}
          className={cn(
            "mt-[22px] w-full rounded-md border border-danger bg-transparent p-[13px] text-sm font-semibold text-danger",
            undoing && "opacity-70",
          )}
        >
          {undoing
            ? "Desfazendo…"
            : isIncome
              ? "Marcar como não recebido"
              : "Marcar como não pago"}
        </button>
      )}
      <div className={cn("flex gap-2.5", ctx.paid ? "mt-2.5" : "mt-[22px]")}>
        <button type="button" onClick={closeModal} className={secondaryBtn}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={pending}
          className={cn(
            isIncome ? successBtn : primaryBtn,
            pending && "opacity-70",
          )}
        >
          {pending
            ? "Salvando…"
            : ctx.paid
              ? "Salvar alterações"
              : isIncome
                ? "Confirmar recebimento"
                : "Confirmar pagamento"}
        </button>
      </div>
    </div>
  );
}
