import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { loadMonthData } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import StatusBadge from "@/components/StatusBadge";
import PayButton from "@/components/PayButton";
import EmptyState from "@/components/EmptyState";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const period = month || periodForDate(new Date(), monthStartDay);
  if (trackingStartPeriod && period < trackingStartPeriod) {
    redirect(`/painel?month=${trackingStartPeriod}`);
  }
  const { transactions, summary, budgetProgress } = await loadMonthData(
    user.id,
    period,
    monthStartDay,
    trackingStartPeriod,
  );

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="Faça seu primeiro lançamento"
        description="Registre uma receita ou despesa para começar a acompanhar seu saldo."
      />
    );
  }

  const expenses = transactions.filter((t) => t.type === "expense");
  const upcoming = expenses
    .filter((t) => t.status !== "paid")
    .sort((a, b) => statusOrder(a.status) - statusOrder(b.status))
    .slice(0, 4);
  const recent = [...transactions]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="app-balances-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        <BalanceCard
          label="Saldo Atual"
          value={summary.saldoAtual}
          color={summary.saldoAtual >= 0 ? "var(--color-success)" : "var(--color-danger)"}
          hint="o que você tem hoje"
          footer={
            <>
              <div>Entradas {formatBRL(summary.incomeTotal)} · Já pago {formatBRL(summary.paidExpenseTotal)}</div>
              <div style={{ marginTop: 4 }}>Previsão de receitas {formatBRL(summary.incomeForecastTotal)}</div>
            </>
          }
        />
        <BalanceCard
          label="Saldo Previsto (fim do mês)"
          value={summary.saldoPrevisto}
          color="var(--color-primary)"
          hint="depois de pagar tudo"
          footer={`Despesas previstas ${formatBRL(summary.previstoTotal)}`}
        />
      </div>

      {budgetProgress.length > 0 && (
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: "18px 20px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Orçamentos do mês</div>
          {budgetProgress.map((b) => (
            <div key={b.subcategoryId}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginBottom: 6 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CategoryIcon icon={b.subcategoryIcon} color={b.categoryColor} size={24} />
                  {b.subcategoryName}
                </span>
                <span style={{ fontWeight: 600, color: b.remaining < 0 ? "var(--color-danger)" : "var(--text)" }}>
                  {formatBRL(b.spent)} de {formatBRL(b.monthlyAmount)}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: "var(--border-soft)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    width: `${b.pct}%`,
                    background: b.remaining < 0 ? "var(--color-danger)" : "var(--color-primary)",
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                {b.remaining >= 0
                  ? `${formatBRL(b.remaining)} restantes`
                  : `${formatBRL(-b.remaining)} acima do orçamento`}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="app-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MetricCard label="Receitas do mês" value={summary.incomeTotal} color="var(--color-success)" />
        <MetricCard label="Total previsto" value={summary.previstoTotal} color="var(--color-primary)" />
        <MetricCard
          label="Já pago"
          value={summary.paidExpenseTotal}
          color="var(--color-success)"
          badge={`${summary.progressPct}%`}
        />
        <MetricCard label="A pagar" value={summary.pendingTotal} color="var(--color-warning)" />
      </div>

      <div className="app-pie-lists-grid" style={{ display: "grid", gridTemplateColumns: "340px minmax(0,1fr)", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Gastos por categoria</div>
          {summary.pieSlices.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Sem despesas neste mês.</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: summary.pieGradient, flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 140 }}>
                {summary.pieSlices.map((s) => (
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

        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div style={{ background: "var(--surface)", borderRadius: 16, padding: "18px 20px", border: "1px solid var(--border)", minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Próximos vencimentos</div>
            {upcoming.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Tudo pago por aqui ✓</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {upcoming.map((t) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <CategoryIcon icon={t.subcategoryIcon} color={t.categoryColor} size={32} />
                    <div style={{ flex: 1, minWidth: 80 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.description || t.subcategoryName}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                        {t.dueDate ? t.dueDate.toLocaleDateString("pt-BR") : "—"} · {formatBRL(Number(t.amount))}
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                    <PayButton tx={t} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: "var(--surface)", borderRadius: 16, padding: "18px 20px", border: "1px solid var(--border)", minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Últimos lançamentos</div>
              <Link href="/lancamentos" style={{ border: "none", background: "none", color: "var(--color-primary)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                ver todos →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recent.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CategoryIcon icon={t.subcategoryIcon} color={t.categoryColor} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.description || t.subcategoryName}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      {t.subcategoryName} · {t.dueDate ? t.dueDate.toLocaleDateString("pt-BR") : "—"}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.status === "paid" ? (t.type === "income" ? "var(--color-success)" : "var(--text)") : "var(--text-disabled)" }}>
                    {t.type === "income" ? "+ " : "- "}
                    {formatBRL(t.displayAmount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusOrder(status: string) {
  const order: Record<string, number> = { overdue: 0, due: 1, pending: 2, scheduled: 3 };
  return order[status] ?? 4;
}

function BalanceCard({
  label,
  value,
  color,
  hint,
  footer,
}: {
  label: string;
  value: number;
  color: string;
  hint: string;
  footer: React.ReactNode;
}) {
  return (
    <div style={{ background: "var(--surface)", borderRadius: 18, padding: "22px 20px", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: -0.5 }}>{formatBRL(value)}</div>
      <div style={{ fontSize: 12, color: "var(--text-disabled)", marginTop: 2 }}>{hint}</div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 10, borderTop: "1px solid var(--border-soft)", paddingTop: 10 }}>
        {footer}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
  badge,
}: {
  label: string;
  value: number;
  color: string;
  badge?: string;
}) {
  return (
    <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</div>
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--color-success)",
              background: "var(--color-success-tint)",
              padding: "2px 7px",
              borderRadius: 99,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ fontSize: 19, fontWeight: 700, color, marginTop: 4 }}>{formatBRL(value)}</div>
    </div>
  );
}
