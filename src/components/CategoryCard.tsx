"use client";

import { useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import CategoryIcon from "./CategoryIcon";
import ModalTriggerButton from "./ModalTriggerButton";
import EditSubcategoryButton from "./EditSubcategoryButton";
import type { Category, Subcategory } from "@/prisma/categories";

export default function CategoryCard({
  category,
  subcategories,
}: {
  category: Category;
  subcategories: Subcategory[];
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 16,
          border: "none",
          background: "none",
          textAlign: "left",
        }}
      >
        <CategoryIcon icon={category.icon} color={category.color} size={40} />
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{category.name}</div>
        <span style={{ fontSize: 12, color: "var(--text-disabled)" }}>
          {subcategories.length} subcategorias
        </span>
        <span style={{ fontSize: 12, color: "var(--text-disabled)", display: "flex" }}>
          {expanded ? <TbChevronUp size={14} /> : <TbChevronDown size={14} />}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: "0 16px 14px 68px", display: "flex", flexDirection: "column", gap: 8 }}>
          {subcategories.map((sub) => (
            <div
              key={sub.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#334155",
                padding: "8px 12px",
                background: "var(--bg)",
                borderRadius: 10,
              }}
            >
              <span>{sub.name}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, color: "var(--text-disabled)" }}>
                  {sub.type === "income" ? "Receita" : "Despesa"}
                </span>
                <EditSubcategoryButton subcategory={sub} categoryName={category.name} />
              </span>
            </div>
          ))}
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
