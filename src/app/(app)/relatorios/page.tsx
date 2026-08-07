import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { computeCategoryBreakdown, computeMonthSummary, loadMonthData, type BreakdownRow } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { addMonths, BR_TIMEZONE, formatBRL, fromBRDateKey, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import ReportFilters from "@/components/ReportFilters";
import { TbMinus, TbTrendingDown, TbTrendingUp } from "react-icons/tb";

const RANGE_VALUES = new Set(["1", "3", "6", "12"]);

export default async function RelatoriosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; range?: string; category?: string; orcamento?: string }>;
}) {
  const { month, range: rangeParam, category: categoryId, orcamento } = await searchParams;
  const considerBudget = orcamento !== "0";
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const period = month || periodForDate(new Date(), monthStartDay);

  // A brand-new account has no history before signup, and the user may also
  // set a later "tracking start month" explicitly (e.g. to skip backfilling
  // a month already underway) — whichever floor is more restrictive wins.
  const accountPeriod = periodForDate(new Date(user.created_at), monthStartDay);
  const floorPeriod =
    trackingStartPeriod && trackingStartPeriod > accountPeriod ? trackingStartPeriod : accountPeriod;
  if (period < floorPeriod) {
    redirect(`/relatorios?month=${floorPeriod}`);
  }

  const range = RANGE_VALUES.has(rangeParam ?? "") ? Number(rangeParam) : 3;
  const barPeriods = Array.from({ length: range }, (_, i) => addMonths(period, -(range - 1 - i))).filter(
    (p) => p >= floorPeriod,
  );
  const barData = await Promise.all(barPeriods.map((p) => loadMonthData(user.id, p, monthStartDay, trackingStartPeriod)));
  const current = barData[barData.length - 1];

  const prevPeriod = addMonths(period, -1);
  const prevIndex = barPeriods.indexOf(prevPeriod);
  const previous =
    prevIndex >= 0
      ? barData[prevIndex]
      : prevPeriod >= floorPeriod
        ? await loadMonthData(user.id, prevPeriod, monthStartDay, trackingStartPeriod)
        : undefined;

  // "Considerar orçamento" toggle: with it on, an unspent monthly budget counts
  // as anticipated spend (same forecast logic as the painel); off, only what's
  // actually been logged counts. Summaries are recomputed per period rather
  // than reusing loadMonthData's bundled one, which always includes budgets.
  const effectiveSummaries = barData.map((m) => computeMonthSummary(m.transactions, considerBudget ? m.budgetProgress : []));
  const currentSummary = effectiveSummaries[effectiveSummaries.length - 1];
  const previousIndexForSummary = previous ? barData.indexOf(previous) : -1;
  const previousSummary =
    previousIndexForSummary >= 0
      ? effectiveSummaries[previousIndexForSummary]
      : previous
        ? computeMonthSummary(previous.transactions, considerBudget ? previous.budgetProgress : [])
        : undefined;

  const currentExpenses = current.transactions.filter((t) => t.type === "expense");
  const previousExpenses = previous ? previous.transactions.filter((t) => t.type === "expense") : [];
  const breakdown = computeCategoryBreakdown(
    currentExpenses,
    previousExpenses,
    categoryId || undefined,
    considerBudget ? current.budgetProgress : [],
  );
  const filteredCategory = categoryId ? current.categories.find((c) => c.id === categoryId) : undefined;

  const topRow: BreakdownRow | undefined = breakdown.rows[0];
  const changePct =
    previousSummary && previousSummary.previstoTotal > 0
      ? Math.round(((currentSummary.previstoTotal - previousSummary.previstoTotal) / previousSummary.previstoTotal) * 100)
      : null;
  const monthsWithData = effectiveSummaries.filter((s) => s.previstoTotal > 0);
  const average =
    monthsWithData.length > 0
      ? monthsWithData.reduce((sum, s) => sum + s.previstoTotal, 0) / monthsWithData.length
      : 0;

  const evolutionValues = barPeriods.map((p, i) => {
    if (!categoryId) return effectiveSummaries[i].previstoTotal;
    const periodExpenses = barData[i].transactions.filter((t) => t.type === "expense");
    const periodBudgets = considerBudget ? barData[i].budgetProgress : [];
    return computeCategoryBreakdown(periodExpenses, [], categoryId, periodBudgets).total;
  });
  const maxVal = Math.max(1, ...evolutionValues);

  const itemLabel = breakdown.mode === "category" ? "Categoria" : "Subcategoria";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          Analise seus gastos e acompanhe sua evolução financeira.
        </div>
      </div>

      <ReportFilters categories={current.categories} />

      <div className="app-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={cardStyle}>
          <div style={labelStyle}>
            {filteredCategory ? `${itemLabel} com maior gasto em ${filteredCategory.name}` : `${itemLabel} com maior gasto`}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{topRow?.name ?? "—"}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {breakdown.total > 0 && topRow ? Math.round((topRow.total / breakdown.total) * 100) : 0}% do total
          </div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Comparação c/ mês anterior</div>
          {changePct !== null ? (
            <>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4, color: changePct > 0 ? "var(--color-danger)" : "var(--color-success)" }}>
                {changePct > 0 ? "↑" : changePct < 0 ? "↓" : "–"} {Math.abs(changePct)}%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                {changePct > 0 ? "gastou mais" : changePct < 0 ? "gastou menos" : "igual"} que o mês passado
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>—</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>sem mês anterior ainda</div>
            </>
          )}
        </div>
        <div style={{ ...cardStyle, background: "var(--color-primary)", border: "none" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Média mensal de gastos</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, color: "#fff" }}>{formatBRL(average)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
            {barPeriods.length > 1 ? `últimos ${barPeriods.length} meses` : "este mês"}
          </div>
        </div>
      </div>

      <div className="app-pie-lists-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            {filteredCategory ? `Gastos por subcategoria em ${filteredCategory.name}` : "Gastos por categoria"}
          </div>
          {breakdown.rows.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Sem despesas neste mês.</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: breakdown.pieGradient }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 22,
                    borderRadius: "50%",
                    background: "var(--surface)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>Total</div>
                  <div style={{ fontSize: 13, fontWeight: 800, textAlign: "center" }}>{formatBRL(breakdown.total)}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 140 }}>
                {breakdown.rows.map((r) => (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.name}
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {breakdown.total > 0 ? Math.round((r.total / breakdown.total) * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
            {barPeriods.length > 1 ? `Evolução — últimos ${barPeriods.length} meses` : "Evolução"}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 140 }}>
            {barPeriods.map((p, i) => {
              const total = evolutionValues[i];
              const pct = Math.round((total / maxVal) * 100);
              return (
                <div key={p} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>{formatBRL(total)}</div>
                  <div style={{ width: "100%", maxWidth: 44, borderRadius: "8px 8px 0 0", background: p === period ? "var(--color-primary)" : "var(--color-primary-light)", height: `${Math.max(pct, 2)}%` }} />
                  <div style={{ fontSize: 12, color: "#334155", fontWeight: 600 }}>{monthShortLabel(p)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{ padding: "18px 20px 4px" }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            {filteredCategory ? `Detalhamento por subcategoria` : "Detalhamento por categoria"}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            Totais consolidados para o período selecionado.
          </div>
        </div>
        {breakdown.rows.length === 0 ? (
          <div style={{ padding: "24px 20px", textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
            Sem despesas neste período.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <thead>
                <tr>
                  <th style={theadCellStyle}>{itemLabel.toUpperCase()}</th>
                  <th style={{ ...theadCellStyle, textAlign: "right" }}>TRANSAÇÕES</th>
                  <th style={{ ...theadCellStyle, textAlign: "right" }}>VALOR TOTAL</th>
                  <th style={{ ...theadCellStyle, textAlign: "right" }}>TENDÊNCIA</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.rows.map((r) => (
                  <tr key={r.id} style={{ borderTop: "1px solid var(--border-soft)" }}>
                    <td style={tdCellStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CategoryIcon icon={r.icon} color={r.color} size={28} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ ...tdCellStyle, textAlign: "right", color: "var(--text-secondary)" }}>{r.count}</td>
                    <td style={{ ...tdCellStyle, textAlign: "right", fontWeight: 700 }}>{formatBRL(r.total)}</td>
                    <td style={{ ...tdCellStyle, textAlign: "right" }}>
                      <TrendBadge pct={r.trendPct} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid var(--border)" }}>
                  <td style={{ ...tdCellStyle, fontWeight: 700 }}>Total Geral</td>
                  <td style={{ ...tdCellStyle, textAlign: "right", color: "var(--text-secondary)" }}>
                    {breakdown.rows.reduce((s, r) => s + r.count, 0)}
                  </td>
                  <td style={{ ...tdCellStyle, textAlign: "right", fontWeight: 700 }}>{formatBRL(breakdown.total)}</td>
                  <td style={tdCellStyle} />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/** For an expense category, spending less than before is the good outcome — green on the way down, red on the way up. */
function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) {
    return <span style={{ fontSize: 12, color: "var(--text-disabled)" }}>—</span>;
  }
  const flat = Math.abs(pct) < 3;
  const color = flat ? "var(--text-secondary)" : pct > 0 ? "var(--color-danger)" : "var(--color-success)";
  const bg = flat ? "var(--border-soft)" : pct > 0 ? "var(--color-danger-tint)" : "var(--color-success-tint)";
  const Icon = flat ? TbMinus : pct > 0 ? TbTrendingUp : TbTrendingDown;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 700,
        color,
        background: bg,
        padding: "3px 8px",
        borderRadius: 99,
      }}
    >
      <Icon size={12} />
      {flat ? "0%" : `${pct > 0 ? "+" : ""}${pct}%`}
    </span>
  );
}

function monthShortLabel(period: string): string {
  const label = fromBRDateKey(`${period}-01`).toLocaleDateString("pt-BR", {
    month: "short",
    timeZone: BR_TIMEZONE,
  });
  return label.replace(".", "").replace(/^./, (c) => c.toUpperCase());
}

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  borderRadius: 14,
  padding: "14px 16px",
  border: "1px solid var(--border)",
};

const labelStyle: React.CSSProperties = { fontSize: 12, color: "var(--text-secondary)" };

const theadCellStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text-disabled)",
  padding: "10px 20px",
  letterSpacing: 0.4,
};

const tdCellStyle: React.CSSProperties = {
  padding: "12px 20px",
  fontSize: 13,
};
