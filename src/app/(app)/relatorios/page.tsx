import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { loadMonthData } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { addMonths, formatBRL, periodForDate } from "@/lib/finance";

export default async function RelatoriosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
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
  const periods = [addMonths(period, -3), addMonths(period, -2), addMonths(period, -1), period].filter(
    (p) => p >= floorPeriod,
  );
  const monthData = await Promise.all(
    periods.map((p) => loadMonthData(user.id, p, monthStartDay, trackingStartPeriod)),
  );
  const current = monthData[monthData.length - 1];
  const previous = monthData.length > 1 ? monthData[monthData.length - 2] : undefined;

  const topCat = current.summary.pieSlices[0];
  const changePct =
    previous && previous.summary.previstoTotal > 0
      ? Math.round(
          ((current.summary.previstoTotal - previous.summary.previstoTotal) / previous.summary.previstoTotal) * 100,
        )
      : 0;
  const monthsWithData = monthData.filter((m) => m.summary.previstoTotal > 0);
  const average =
    monthsWithData.length > 0
      ? monthsWithData.reduce((sum, m) => sum + m.summary.previstoTotal, 0) / monthsWithData.length
      : 0;

  const maxVal = Math.max(1, ...monthData.map((m) => m.summary.previstoTotal));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="app-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div style={cardStyle}>
          <div style={labelStyle}>Categoria que mais gastou</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{topCat?.name ?? "—"}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {topCat?.pct ?? 0}% do mês
          </div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Vs. mês anterior</div>
          {previous ? (
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
        <div style={cardStyle}>
          <div style={labelStyle}>Média mensal</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{formatBRL(average)}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {periods.length > 1 ? `últimos ${periods.length} meses` : "este mês"}
          </div>
        </div>
      </div>

      <div className="app-pie-lists-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Gastos por categoria</div>
          {current.summary.pieSlices.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Sem despesas neste mês.</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: current.summary.pieGradient, flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 140 }}>
                {current.summary.pieSlices.map((s) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, color: "#334155" }}>{s.name}</span>
                    <span style={{ color: "var(--text-secondary)" }}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
            {periods.length > 1 ? `Últimos ${periods.length} meses` : "Este mês"}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 140 }}>
            {periods.map((p, i) => {
              const total = monthData[i].summary.previstoTotal;
              const pct = Math.round((total / maxVal) * 100);
              return (
                <div key={p} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{formatBRL(total)}</div>
                  <div style={{ width: "100%", maxWidth: 44, borderRadius: "8px 8px 0 0", background: p === period ? "var(--color-primary)" : "var(--color-primary-light)", height: `${Math.max(pct, 2)}%` }} />
                  <div style={{ fontSize: 12, color: "#334155", fontWeight: 600 }}>{monthShortLabel(p)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function monthShortLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  const label = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "short" });
  return label.replace(".", "").replace(/^./, (c) => c.toUpperCase());
}

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  borderRadius: 14,
  padding: "14px 16px",
  border: "1px solid var(--border)",
};

const labelStyle: React.CSSProperties = { fontSize: 12, color: "var(--text-secondary)" };
