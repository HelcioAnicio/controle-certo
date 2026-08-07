"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import {
  deleteCategoryAction,
  deleteFixedExpenseAction,
  deleteSubcategoryAction,
  deleteTransactionAction,
} from "@/app/(app)/actions";
import { cn } from "@/lib/cn";
import { dangerBtn, secondaryBtn } from "./styles";

export type ExclusaoCtx = {
  id: string;
  desc: string;
  kind?: "transaction" | "fixedExpense" | "category" | "subcategory";
};

const DESCRIPTIONS: Record<NonNullable<ExclusaoCtx["kind"]>, string> = {
  transaction:
    "Esta ação não pode ser desfeita. O lançamento será removido permanentemente da sua lista deste mês.",
  fixedExpense:
    "Esta ação não pode ser desfeita. Os lançamentos deste mês em diante que ainda não foram pagos serão apagados; os que já foram pagos permanecem no seu histórico.",
  category:
    "Esta ação não pode ser desfeita. Só é possível excluir categorias sem subcategorias.",
  subcategory:
    "Esta ação não pode ser desfeita. Só é possível excluir subcategorias sem lançamentos ou gastos fixos vinculados.",
};

export default function ConfirmarExclusaoModal({ ctx }: { ctx: ExclusaoCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const kind = ctx.kind ?? "transaction";

  function confirm() {
    setError("");
    startTransition(async () => {
      try {
        if (kind === "fixedExpense") {
          await deleteFixedExpenseAction(ctx.id);
        } else if (kind === "category") {
          await deleteCategoryAction(ctx.id);
        } else if (kind === "subcategory") {
          await deleteSubcategoryAction(ctx.id);
        } else {
          await deleteTransactionAction(ctx.id);
        }
        closeModal();
        showToast("Excluído com sucesso");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Não foi possível excluir.",
        );
      }
    });
  }

  return (
    <div>
      <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-md bg-danger-tint">
        <div className="h-[18px] w-[18px] rounded bg-danger" />
      </div>
      <div className="mb-2 text-base font-bold">
        Excluir &quot;{ctx.desc}&quot;?
      </div>
      <div className="mb-3.5 text-[13px] leading-normal text-text-secondary">
        {DESCRIPTIONS[kind]}
      </div>
      {error && <div className="mb-3.5 text-[13px] text-danger">{error}</div>}
      <div className="flex gap-2.5">
        <button type="button" onClick={closeModal} className={secondaryBtn}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={pending}
          className={cn(dangerBtn, pending && "opacity-70")}
        >
          {pending ? "Excluindo…" : "Excluir"}
        </button>
      </div>
    </div>
  );
}
