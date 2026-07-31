"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { payTransactionAction } from "@/app/(app)/actions";
import { formatBRL } from "@/lib/finance";
import { closeBtn, fieldLabel, inputStyle, modalHeader, modalTitle, secondaryBtn, successBtn } from "./styles";

export type PagamentoCtx = {
  id: string;
  desc: string;
  amount: number;
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

  function confirm() {
    const amountNum = Number(amount.replace(",", "."));
    if (!amountNum || amountNum <= 0) return;
    startTransition(async () => {
      await payTransactionAction({ id: ctx.id, paidAmount: amountNum, paidDate: date });
      closeModal();
      showToast("Pagamento registrado ✓");
    });
  }

  return (
    <div>
      <div style={modalHeader}>
        <div style={modalTitle}>Confirmar pagamento</div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      {ctx.locked ? (
        <>
          <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--text-secondary)", fontSize: 14 }}>
            Disponível a partir de {ctx.lockDateLabel}.
          </div>
          <button
            type="button"
            onClick={closeModal}
            style={{ width: "100%", padding: 13, borderRadius: "var(--radius-md)", border: "none", background: "var(--border-soft)", color: "#334155", fontSize: 14, fontWeight: 600 }}
          >
            Entendi
          </button>
        </>
      ) : (
        <>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{ctx.desc}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 18 }}>
            Valor planejado: {formatBRL(ctx.amount)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={fieldLabel}>Valor pago</div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ ...inputStyle, fontSize: 16, fontWeight: 700 }}
              />
            </div>
            <div>
              <div style={fieldLabel}>Data do pagamento</div>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button type="button" onClick={closeModal} style={secondaryBtn}>
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              style={{ ...successBtn, opacity: pending ? 0.7 : 1 }}
            >
              {pending ? "Confirmando…" : "Confirmar pagamento"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
