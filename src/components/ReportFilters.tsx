"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/prisma/categories";

const RANGE_OPTIONS = [
  { value: "1", label: "Este mês" },
  { value: "3", label: "Últimos 3 meses" },
  { value: "6", label: "Últimos 6 meses" },
  { value: "12", label: "Último ano" },
];

const selectStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--text)",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "8px 12px",
};

export default function ReportFilters({ categories }: { categories: Category[] }) {
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
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <select value={range} onChange={(e) => updateParam("range", e.target.value)} style={selectStyle}>
        {RANGE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select value={category} onChange={(e) => updateParam("category", e.target.value)} style={selectStyle}>
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
        style={{
          ...selectStyle,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: considerBudget ? "var(--color-primary-tint)" : "var(--surface)",
          color: considerBudget ? "var(--color-primary-dark)" : "var(--text)",
          border: `1px solid ${considerBudget ? "var(--color-primary)" : "var(--border)"}`,
        }}
      >
        <span
          style={{
            width: 30,
            height: 17,
            borderRadius: 99,
            background: considerBudget ? "var(--color-primary)" : "var(--border)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: 2,
              left: considerBudget ? 15 : 2,
              transition: "left 0.15s ease",
            }}
          />
        </span>
        Considerar orçamento
      </button>
    </div>
  );
}
