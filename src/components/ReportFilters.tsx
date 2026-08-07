"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/prisma/categories";
import { cn } from "@/lib/cn";

const RANGE_OPTIONS = [
  { value: "1", label: "Este mês" },
  { value: "3", label: "Últimos 3 meses" },
  { value: "6", label: "Últimos 6 meses" },
  { value: "12", label: "Último ano" },
];

const selectStyle = "rounded-md px-3 py-2 text-[13px] font-medium";

export default function ReportFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const range = searchParams.get("range") || "3";
  const category = searchParams.get("category") || "";
  const considerBudget = searchParams.get("orcamento") !== "0";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        value={range}
        onChange={(e) => updateParam("range", e.target.value)}
        className={cn(selectStyle, "border border-border bg-surface text-text")}
      >
        {RANGE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        value={category}
        onChange={(e) => updateParam("category", e.target.value)}
        className={cn(selectStyle, "border border-border bg-surface text-text")}
      >
        <option value="">Todas categorias</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => updateParam("orcamento", considerBudget ? "0" : "1")}
        title="Incluir o orçamento não gasto como estimativa de gasto, ou considerar só o que já foi lançado"
        className={cn(
          selectStyle,
          "flex items-center gap-2 border",
          considerBudget
            ? "border-primary bg-primary-tint text-primary-dark"
            : "border-border bg-surface text-text",
        )}
      >
        <span
          className={cn(
            "relative h-[17px] w-[30px] shrink-0 rounded-full",
            considerBudget ? "bg-primary" : "bg-border",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-[13px] w-[13px] rounded-full bg-white transition-[left] duration-150 [transition-timing-function:ease]",
              considerBudget ? "left-[15px]" : "left-0.5",
            )}
          />
        </span>
        Considerar orçamento
      </button>
    </div>
  );
}
