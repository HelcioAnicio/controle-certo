import { requireUser } from "@/lib/auth";
import { loadMonthData } from "@/lib/dashboard";
import { formatBRL, periodKey } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import StatusBadge from "@/components/StatusBadge";
import PayButton from "@/components/PayButton";
import DeleteButton from "@/components/DeleteButton";
import FilterChips from "@/components/FilterChips";
import EmptyState from "@/components/EmptyState";

export default async function LancamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; status?: string }>;
}) {
  const { month, status } = await searchParams;
  const period = month || periodKey(new Date());
  const user = await requireUser();
  const { transactions } = await loadMonthData(user.id, period);

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="Nenhum lançamento neste mês"
        description="Adicione uma receita ou despesa para começar a acompanhar este mês."
      />
    );
  }

  const filter = status || "todos";
  const filtered = transactions.filter((t) => {
    if (filter === "todos") return true;
    if (filter === "pending") return t.status === "pending" || t.status === "scheduled";
    return t.status === filter;
  });

  const filteredTotal = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.displayAmount, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <FilterChips />

      <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-secondary)", fontSize: 14 }}>
            Nenhum lançamento neste filtro.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderBottom: "1px solid var(--border-soft)",
                flexWrap: "wrap",
              }}
            >
              <CategoryIcon icon={t.subcategoryIcon} color={t.categoryColor} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.description || t.subcategoryName}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  {t.subcategoryName} · {t.dueDate ? t.dueDate.toLocaleDateString("pt-BR") : "—"}
                </div>
              </div>
              <StatusBadge status={t.status} />
              <div style={{ width: 110, textAlign: "right", fontSize: 14, fontWeight: 700, color: t.status === "paid" ? (t.type === "income" ? "var(--color-success)" : "var(--text)") : "var(--text-disabled)" }}>
                {t.type === "income" ? "+ " : "- "}
                {formatBRL(t.displayAmount)}
              </div>
              {t.type === "expense" ? <PayButton tx={t} variant="row" /> : <span style={{ width: 30 }} />}
              <DeleteButton id={t.id} desc={t.description || t.subcategoryName} />
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: "var(--surface)",
          borderRadius: 14,
          padding: "14px 18px",
          border: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Total filtrado</span>
        <span>{formatBRL(filteredTotal)}</span>
      </div>
    </div>
  );
}
