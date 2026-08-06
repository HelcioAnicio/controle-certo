"use client";

import { useState } from "react";
import { TbChevronDown, TbChevronUp, TbTarget } from "react-icons/tb";
import CategoryIcon from "./CategoryIcon";
import ModalTriggerButton from "./ModalTriggerButton";
import EditSubcategoryButton from "./EditSubcategoryButton";
import DeleteButton from "./DeleteButton";
import { useModal } from "./providers/ModalProvider";
import { formatBRL } from "@/lib/finance";
import type { Category, Subcategory } from "@/prisma/categories";

export default function CategoryCard({
  category,
  subcategories,
  budgetBySubcategoryId,
}: {
  category: Category;
  subcategories: Subcategory[];
  budgetBySubcategoryId: Map<string, number>;
}) {
  const [expanded, setExpanded] = useState(true);
  const { openModal } = useModal();

  return (
    <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 16 }}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 0,
            border: "none",
            background: "none",
            textAlign: "left",
          }}
        >
          <CategoryIcon icon={category.icon} color={category.color} size={40} />
          <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{category.name}</div>
          <span style={{ fontSize: 12, color: "var(--text-disabled)" }}>
            {subcategories.length} subcategorias
          </span>
          <span style={{ fontSize: 12, color: "var(--text-disabled)", display: "flex" }}>
            {expanded ? <TbChevronUp size={14} /> : <TbChevronDown size={14} />}
          </span>
        </button>
        <DeleteButton id={category.id} desc={category.name} kind="category" />
      </div>

      {expanded && (
        <div style={{ padding: "0 16px 14px 68px", display: "flex", flexDirection: "column", gap: 8 }}>
          {subcategories.map((sub) => {
            const budgetAmount = budgetBySubcategoryId.get(sub.id) ?? 0;
            return (
              <div
                key={sub.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text)",
                  padding: "8px 12px",
                  background: "var(--bg)",
                  borderRadius: 10,
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <span>{sub.name}</span>
                  {budgetAmount > 0 && (
                    <span style={{ fontSize: 11, color: "var(--color-primary)" }}>
                      Orçamento: {formatBRL(budgetAmount)}/mês
                    </span>
                  )}
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: "var(--text-disabled)" }}>
                    {sub.type === "income" ? "Receita" : "Despesa"}
                  </span>
                  {sub.type === "expense" && (
                    <button
                      type="button"
                      onClick={() =>
                        openModal("definirOrcamento", {
                          subcategoryId: sub.id,
                          subcategoryName: sub.name,
                          currentAmount: budgetAmount,
                        })
                      }
                      title="Definir orçamento mensal"
                      style={{ border: "none", background: "none", color: "var(--text-disabled)", fontSize: 12, display: "flex" }}
                    >
                      <TbTarget size={13} />
                    </button>
                  )}
                  <EditSubcategoryButton subcategory={sub} categoryName={category.name} />
                  <DeleteButton id={sub.id} desc={sub.name} kind="subcategory" variant="compact" />
                </span>
              </div>
            );
          })}
          <ModalTriggerButton
            modal="novaCategoria"
            ctx={{ kind: "subcategoria", categoryId: category.id, categoryName: category.name }}
            style={{
              alignSelf: "flex-start",
              padding: "6px 0",
              background: "none",
              color: "var(--color-primary)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            + Nova subcategoria
          </ModalTriggerButton>
        </div>
      )}
    </div>
  );
}
