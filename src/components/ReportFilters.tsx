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

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
    </div>
  );
}
