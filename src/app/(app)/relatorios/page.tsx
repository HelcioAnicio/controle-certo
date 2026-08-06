import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { computeCategoryBreakdown, computeMonthSummary, loadMonthData, type BreakdownRow } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { addMonths, formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import ReportFilters from "@/components/ReportFilters";
import { TbMinus, TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import { cn } from "@/lib/cn";

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
    <div className="flex flex-col gap-4">
      <div className="text-[13px] text-text-secondary">Analise seus gastos e acompanhe sua evolução financeira.</div>

      <ReportFilters categories={current.categories} />

      <div className="app-metrics-grid grid grid-cols-3 gap-4">
        <div className={cn(cardStyle, "border border-border bg-surface")}>
          <div className={labelStyle}>
            {filteredCategory ? `${itemLabel} com maior gasto em ${filteredCategory.name}` : `${itemLabel} com maior gasto`}
          </div>
          <div className="mt-1 text-[17px] font-bold">{topRow?.name ?? "—"}</div>
          <div className="mt-0.5 text-xs text-text-secondary">
            {breakdown.total > 0 && topRow ? Math.round((topRow.total / breakdown.total) * 100) : 0}% do total
          </div>
        </div>
        <div className={cn(cardStyle, "border border-border bg-surface")}>
          <div className={labelStyle}>Comparação c/ mês anterior</div>
          {changePct !== null ? (
            <>
              <div className={cn("mt-1 text-[17px] font-bold", changePct > 0 ? "text-danger" : "text-success")}>
                {changePct > 0 ? "↑" : changePct < 0 ? "↓" : "–"} {Math.abs(changePct)}%
              </div>
              <div className="mt-0.5 text-xs text-text-secondary">
                {changePct > 0 ? "gastou mais" : changePct < 0 ? "gastou menos" : "igual"} que o mês passado
              </div>
            </>
          ) : (
            <>
              <div className="mt-1 text-[17px] font-bold">—</div>
              <div className="mt-0.5 text-xs text-text-secondary">sem mês anterior ainda</div>
            </>
          )}
        </div>
        <div className={cn(cardStyle, "border-none bg-primary")}>
          <div className="text-xs text-[rgba(255,255,255,0.8)]">Média mensal de gastos</div>
          <div className="mt-1 text-xl font-extrabold text-white">{formatBRL(average)}</div>
          <div className="mt-0.5 text-xs text-[rgba(255,255,255,0.8)]">
            {barPeriods.length > 1 ? `últimos ${barPeriods.length} meses` : "este mês"}
          </div>
        </div>
      </div>

      <div className="report-summary-grid">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-4 text-sm font-semibold">
            {filteredCategory ? `Gastos por subcategoria em ${filteredCategory.name}` : "Gastos por categoria"}
          </div>
          {breakdown.rows.length === 0 ? (
            <div className="text-[13px] text-text-secondary">Sem despesas neste mês.</div>
          ) : (
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative h-[120px] w-[120px] shrink-0">
                <div className="h-[120px] w-[120px] rounded-full" style={{ background: breakdown.pieGradient }} />
                <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-surface">
                  <div className="text-[10px] text-text-secondary">Total</div>
                  <div className="text-center text-[13px] font-extrabold">{formatBRL(breakdown.total)}</div>
                </div>
              </div>
              <div className="flex min-w-[140px] flex-1 flex-col gap-2">
                {breakdown.rows.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 text-[13px]">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: r.color }} />
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[#334155]">
                      {r.name}
                    </span>
                    <span className="text-text-secondary">
                      {breakdown.total > 0 ? Math.round((r.total / breakdown.total) * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-[18px] text-sm font-semibold">
            {barPeriods.length > 1 ? `Evolução — últimos ${barPeriods.length} meses` : "Evolução"}
          </div>
          <div className="flex h-[140px] items-end gap-3.5">
            {barPeriods.map((p, i) => {
              const total = evolutionValues[i];
              const pct = Math.round((total / maxVal) * 100);
              return (
                <div key={p} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="text-[10px] text-text-secondary">{formatBRL(total)}</div>
                  <div
                    className={cn(
                      "w-full max-w-[44px] rounded-t-sm",
                      p === period ? "bg-primary" : "bg-primary-light",
                    )}
                    style={{ height: `${Math.max(pct, 2)}%` }}
                  />
                  <div className="text-xs font-semibold text-[#334155]">{monthShortLabel(p)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="px-5 pt-[18px] pb-1">
          <div className="text-sm font-semibold">
            {filteredCategory ? `Detalhamento por subcategoria` : "Detalhamento por categoria"}
          </div>
          <div className="mt-0.5 text-xs text-text-secondary">Totais consolidados para o período selecionado.</div>
        </div>
        {breakdown.rows.length === 0 ? (
          <div className="px-5 py-6 text-center text-[13px] text-text-secondary">Sem despesas neste período.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th className={cn(theadCellStyle, "text-left")}>{itemLabel.toUpperCase()}</th>
                  <th className={cn(theadCellStyle, "text-right")}>TRANSAÇÕES</th>
                  <th className={cn(theadCellStyle, "text-right")}>VALOR TOTAL</th>
                  <th className={cn(theadCellStyle, "text-right")}>TENDÊNCIA</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.rows.map((r) => (
                  <tr key={r.id} className="border-t border-border-soft">
                    <td className={tdCellStyle}>
                      <div className="flex items-center gap-2.5">
                        <CategoryIcon icon={r.icon} color={r.color} size={28} />
                        <span className="text-[13px] font-semibold">{r.name}</span>
                      </div>
                    </td>
                    <td className={cn(tdCellStyle, "text-right text-text-secondary")}>{r.count}</td>
                    <td className={cn(tdCellStyle, "text-right font-bold")}>{formatBRL(r.total)}</td>
                    <td className={cn(tdCellStyle, "text-right")}>
                      <TrendBadge pct={r.trendPct} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border">
                  <td className={cn(tdCellStyle, "font-bold")}>Total Geral</td>
                  <td className={cn(tdCellStyle, "text-right text-text-secondary")}>
                    {breakdown.rows.reduce((s, r) => s + r.count, 0)}
                  </td>
                  <td className={cn(tdCellStyle, "text-right font-bold")}>{formatBRL(breakdown.total)}</td>
                  <td className={tdCellStyle} />
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
    return <span className="text-xs text-text-disabled">—</span>;
  }
  const flat = Math.abs(pct) < 3;
  const colorClasses = flat
    ? "bg-border-soft text-text-secondary"
    : pct > 0
      ? "bg-danger-tint text-danger"
      : "bg-success-tint text-success";
  const Icon = flat ? TbMinus : pct > 0 ? TbTrendingUp : TbTrendingDown;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-xs font-bold", colorClasses)}>
      <Icon size={12} />
      {flat ? "0%" : `${pct > 0 ? "+" : ""}${pct}%`}
    </span>
  );
}

function monthShortLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  const label = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "short" });
  return label.replace(".", "").replace(/^./, (c) => c.toUpperCase());
}

const cardStyle = "rounded-[14px] px-4 py-3.5";

const labelStyle = "text-xs text-text-secondary";

const theadCellStyle = "px-5 py-2.5 text-[11px] font-bold tracking-[0.4px] text-text-disabled";

const tdCellStyle = "px-5 py-3 text-[13px]";
