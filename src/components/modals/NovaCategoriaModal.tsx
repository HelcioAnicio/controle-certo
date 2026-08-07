"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import {
  createCategoryAction,
  createSubcategoryAction,
  updateSubcategoryAction,
} from "@/app/(app)/actions";
import { COLOR_SWATCHES, ICON_SWATCHES, type TxType } from "@/lib/finance";
import { iconFor } from "@/lib/icons";
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

export type NovaCategoriaCtx =
  | { kind: "categoria" }
  | { kind: "subcategoria"; categoryId: string; categoryName: string }
  | {
      kind: "editarSubcategoria";
      id: string;
      categoryId: string;
      categoryName: string;
      name: string;
      type: TxType;
      icon: string;
    };

export default function NovaCategoriaModal({ ctx }: { ctx: NovaCategoriaCtx }) {
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const isSub = ctx.kind !== "categoria";
  const isEdit = ctx.kind === "editarSubcategoria";

  const [name, setName] = useState(isEdit ? ctx.name : "");
  const [color, setColor] = useState(COLOR_SWATCHES[0]);
  const [icon, setIcon] = useState<string>(
    isEdit ? ctx.icon : ICON_SWATCHES[0],
  );
  const [type, setType] = useState<TxType>(isEdit ? ctx.type : "expense");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Informe um nome.");
      return;
    }
    setError("");
    startTransition(async () => {
      if (ctx.kind === "editarSubcategoria") {
        await updateSubcategoryAction({
          id: ctx.id,
          name: name.trim(),
          type,
          icon,
        });
      } else if (ctx.kind === "subcategoria") {
        await createSubcategoryAction({
          categoryId: ctx.categoryId,
          name: name.trim(),
          type,
          icon,
        });
      } else {
        await createCategoryAction({ name: name.trim(), color, icon });
      }
      closeModal();
      showToast(
        isEdit
          ? "Subcategoria atualizada ✓"
          : isSub
            ? "Subcategoria salva ✓"
            : "Categoria salva ✓",
      );
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={modalHeader}>
        <div className={modalTitle}>
          {isEdit
            ? "Editar subcategoria"
            : isSub
              ? "Nova subcategoria"
              : "Nova categoria"}
        </div>
        <button type="button" onClick={closeModal} className={closeBtn}>
          ×
        </button>
      </div>

      <div className={formGap}>
        {ctx.kind !== "categoria" && (
          <div>
            <div className={fieldLabel}>Categoria</div>
            <div className="rounded-md bg-primary-tint px-3.5 py-3 text-sm font-semibold text-primary-dark">
              {ctx.categoryName}
            </div>
          </div>
        )}
        <div>
          <div className={fieldLabel}>Nome</div>
          <input
            type="text"
            placeholder="Ex.: Farmácia"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            autoFocus
          />
        </div>
        {isSub && (
          <div className="flex gap-2 rounded-md bg-border-soft p-1">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={cn(
                "flex-1 rounded-[9px] border-none p-2.5 text-[13px] font-semibold",
                type === "expense"
                  ? "bg-surface text-danger"
                  : "bg-transparent text-text-secondary",
              )}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={cn(
                "flex-1 rounded-[9px] border-none p-2.5 text-[13px] font-semibold",
                type === "income"
                  ? "bg-surface text-success"
                  : "bg-transparent text-text-secondary",
              )}
            >
              Receita
            </button>
          </div>
        )}
        {!isSub && (
          <div>
            <div className={fieldLabel}>Cor</div>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-[30px] w-[30px] rounded-full border-2",
                    color === c
                      ? "border-white shadow-[0_0_0_2px_var(--text)]"
                      : "border-transparent shadow-[0_0_0_1px_var(--border)]",
                  )}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
        <div>
          <div className={fieldLabel}>Ícone</div>
          <div className="flex flex-wrap gap-2.5">
            {ICON_SWATCHES.map((key) => {
              const Icon = iconFor(key);
              const selected = icon === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIcon(key)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-none",
                    selected
                      ? "bg-primary-tint text-primary"
                      : "bg-border-soft text-text-secondary",
                  )}
                >
                  <Icon size={17} />
                </button>
              );
            })}
          </div>
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
