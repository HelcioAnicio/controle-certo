"use client";

import { useState, useTransition } from "react";
import { useModal } from "../providers/ModalProvider";
import { useToast } from "../providers/ToastProvider";
import { createCategoryAction, createSubcategoryAction, updateSubcategoryAction } from "@/app/(app)/actions";
import { COLOR_SWATCHES, ICON_SWATCHES, type TxType } from "@/lib/finance";
import { iconFor } from "@/lib/icons";
import { closeBtn, fieldLabel, footerRow, formGap, inputStyle, modalHeader, modalTitle, primaryBtn, secondaryBtn } from "./styles";

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
  const [icon, setIcon] = useState<string>(isEdit ? ctx.icon : ICON_SWATCHES[0]);
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
        await updateSubcategoryAction({ id: ctx.id, name: name.trim(), type, icon });
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
      showToast(isEdit ? "Subcategoria atualizada ✓" : isSub ? "Subcategoria salva ✓" : "Categoria salva ✓");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={modalHeader}>
        <div style={modalTitle}>
          {isEdit ? "Editar subcategoria" : isSub ? "Nova subcategoria" : "Nova categoria"}
        </div>
        <button type="button" onClick={closeModal} style={closeBtn}>
          ×
        </button>
      </div>

      <div style={formGap}>
        {ctx.kind !== "categoria" && (
          <div>
            <div style={fieldLabel}>Categoria</div>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary-tint)",
                color: "var(--color-primary-dark)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {ctx.categoryName}
            </div>
          </div>
        )}
        <div>
          <div style={fieldLabel}>Nome</div>
          <input
            type="text"
            placeholder="Ex.: Farmácia"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>
        {isSub && (
          <div style={{ display: "flex", gap: 8, background: "var(--border-soft)", padding: 4, borderRadius: "var(--radius-md)" }}>
            <button
              type="button"
              onClick={() => setType("expense")}
              style={{ flex: 1, padding: 10, border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, background: type === "expense" ? "var(--surface)" : "transparent", color: type === "expense" ? "var(--color-danger)" : "var(--text-secondary)" }}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              style={{ flex: 1, padding: 10, border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, background: type === "income" ? "var(--surface)" : "transparent", color: type === "income" ? "var(--color-success)" : "var(--text-secondary)" }}
            >
              Receita
            </button>
          </div>
        )}
        {!isSub && (
          <div>
            <div style={fieldLabel}>Cor</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: c,
                    border: color === c ? "2px solid #fff" : "2px solid transparent",
                    boxShadow: color === c ? "0 0 0 2px var(--text)" : "0 0 0 1px var(--border)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div>
          <div style={fieldLabel}>Ícone</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {ICON_SWATCHES.map((key) => {
              const Icon = iconFor(key);
              const selected = icon === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIcon(key)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: selected ? "var(--color-primary-tint)" : "var(--border-soft)",
                    color: selected ? "var(--color-primary)" : "var(--text-secondary)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={17} />
                </button>
              );
            })}
          </div>
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
