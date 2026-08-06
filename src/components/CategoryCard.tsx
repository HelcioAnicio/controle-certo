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
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-2 p-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-3 border-none bg-transparent p-0 text-left"
        >
          <CategoryIcon icon={category.icon} color={category.color} size={40} />
          <div className="flex-1 text-base font-semibold">{category.name}</div>
          <span className="text-xs text-text-disabled">{subcategories.length} subcategorias</span>
          <span className="flex text-xs text-text-disabled">
            {expanded ? <TbChevronUp size={14} /> : <TbChevronDown size={14} />}
          </span>
        </button>
        <DeleteButton id={category.id} desc={category.name} kind="category" />
      </div>

      {expanded && (
        <div className="flex flex-col gap-2 pt-0 pr-4 pb-3.5 pl-[68px]">
          {subcategories.map((sub) => {
            const budgetAmount = budgetBySubcategoryId.get(sub.id) ?? 0;
            return (
              <div
                key={sub.id}
                className="flex items-center justify-between gap-2 rounded-[10px] bg-canvas px-3 py-2 text-[13px] text-text"
              >
                <div className="flex min-w-0 flex-col">
                  <span>{sub.name}</span>
                  {budgetAmount > 0 && (
                    <span className="text-[11px] text-primary">Orçamento: {formatBRL(budgetAmount)}/mês</span>
                  )}
                </div>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="text-[11px] text-text-disabled">
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
                      className="flex border-none bg-transparent text-xs text-text-disabled"
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
            className="self-start bg-transparent px-0 py-1.5 text-xs font-semibold text-primary"
          >
            + Nova subcategoria
          </ModalTriggerButton>
        </div>
      )}
    </div>
  );
}
