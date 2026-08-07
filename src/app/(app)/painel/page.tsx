import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { effectiveDate, loadMonthData } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { BR_TIMEZONE, formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import StatusBadge from "@/components/StatusBadge";
import PayButton from "@/components/PayButton";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/cn";

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
    <div className="flex flex-col gap-5">
      <div className="app-balances-grid grid grid-cols-2 gap-5">
        <BalanceCard
          label="Saldo Atual"
          value={summary.saldoAtual}
          colorClass={summary.saldoAtual >= 0 ? "text-success" : "text-danger"}
          hint="o que você tem hoje"
          footer={
            <>
              <div>
                Entradas {formatBRL(summary.incomeTotal)} · Já pago{" "}
                {formatBRL(summary.paidExpenseTotal)}
              </div>
              <div className="mt-1">
                Previsão de receitas {formatBRL(summary.incomeForecastTotal)}
              </div>
            </>
          }
        />
        <BalanceCard
          label="Saldo Previsto (fim do mês)"
          value={summary.saldoPrevisto}
          colorClass="text-primary"
          hint="depois de pagar tudo"
          footer={`Despesas previstas ${formatBRL(summary.previstoTotal)}`}
        />
      </div>

      {budgetProgress.length > 0 && (
        <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-surface px-5 py-[18px]">
          <div className="text-sm font-semibold">Orçamentos do mês</div>
          {budgetProgress.map((b) => (
            <div key={b.subcategoryId}>
              <div className="mb-1.5 flex justify-between text-[13px] text-[#334155]">
                <span className="flex items-center gap-2">
                  <CategoryIcon
                    icon={b.subcategoryIcon}
                    color={b.categoryColor}
                    size={24}
                  />
                  {b.subcategoryName}
                </span>
                <span
                  className={cn(
                    "font-semibold",
                    b.remaining < 0 ? "text-danger" : "text-text",
                  )}
                >
                  {formatBRL(b.spent)} de {formatBRL(b.monthlyAmount)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border-soft">
                <div
                  className={cn(
                    "h-full rounded-full",
                    b.remaining < 0 ? "bg-danger" : "bg-primary",
                  )}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-text-secondary">
                {b.remaining >= 0
                  ? `${formatBRL(b.remaining)} restantes`
                  : `${formatBRL(-b.remaining)} acima do orçamento`}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="app-metrics-grid grid grid-cols-4 gap-4">
        <MetricCard
          label="Receitas do mês"
          value={summary.incomeTotal}
          colorClass="text-success"
        />
        <MetricCard
          label="Total previsto"
          value={summary.previstoTotal}
          colorClass="text-primary"
        />
        <MetricCard
          label="Já pago"
          value={summary.paidExpenseTotal}
          colorClass="text-success"
          badge={`${summary.progressPct}%`}
        />
        <MetricCard
          label="A pagar"
          value={summary.pendingTotal}
          colorClass="text-warning"
        />
      </div>

      <div className="app-pie-lists-grid">
        <div className="rounded-lg border border-border bg-surface p-5 [grid-area:pie]">
          <div className="mb-4 text-sm font-semibold">Gastos por categoria</div>
          {summary.pieSlices.length === 0 ? (
            <div className="text-[13px] text-text-secondary">
              Sem despesas neste mês.
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-6">
              <div
                className="h-[120px] w-[120px] shrink-0 rounded-full"
                style={{ background: summary.pieGradient }}
              />
              <div className="flex min-w-[220px] flex-1 flex-col gap-2">
                {summary.pieSlices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 text-[13px]"
                  >
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    <span className="flex-1 text-[#334155]">{s.name}</span>
                    <span className="text-text-secondary">
                      {formatBRL(s.value)}
                    </span>
                    <span className="w-10 text-right font-semibold">
                      {s.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-lg border border-border bg-surface px-5 py-[18px] [grid-area:vencimentos]">
          <div className="mb-3 text-sm font-semibold">Próximos vencimentos</div>
          {upcoming.length === 0 ? (
            <div className="text-[13px] text-text-secondary">
              Tudo pago por aqui ✓
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((t) => (
                <div key={t.id} className="flex flex-col gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <CategoryIcon
                      icon={t.subcategoryIcon}
                      color={t.categoryColor}
                      size={32}
                    />
                    <div className="overflow-hidden text-[13px] font-semibold text-ellipsis whitespace-nowrap">
                      {t.description || t.subcategoryName}
                    </div>
                    <div className="text-xs whitespace-nowrap text-text-secondary">
                      {t.dueDate
                        ? t.dueDate.toLocaleDateString("pt-BR", {
                            timeZone: BR_TIMEZONE,
                          })
                        : "—"}{" "}
                      · {formatBRL(Number(t.amount))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-[42px]">
                    <StatusBadge status={t.status} />
                    <PayButton tx={t} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-lg border border-border bg-surface px-5 py-[18px] [grid-area:lancamentos]">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Últimos lançamentos</div>
            <Link
              href="/lancamentos"
              className="border-none bg-transparent text-xs font-semibold text-primary no-underline"
            >
              ver todos →
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {recent.map((t) => {
              const d = effectiveDate(t);
              return (
                <div key={t.id} className="flex items-center gap-2.5">
                  <CategoryIcon
                    icon={t.subcategoryIcon}
                    color={t.categoryColor}
                    size={32}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="overflow-hidden text-[13px] font-semibold text-ellipsis whitespace-nowrap">
                      {t.description || t.subcategoryName}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {t.subcategoryName} ·{" "}
                      {d
                        ? d.toLocaleDateString("pt-BR", {
                            timeZone: BR_TIMEZONE,
                          })
                        : "—"}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-[13px] font-bold",
                      t.status === "paid"
                        ? t.type === "income"
                          ? "text-success"
                          : "text-text"
                        : "text-text-disabled",
                    )}
                  >
                    {t.type === "income" ? "+ " : "- "}
                    {formatBRL(t.displayAmount)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function statusOrder(status: string) {
  const order: Record<string, number> = {
    overdue: 0,
    due: 1,
    pending: 2,
    scheduled: 3,
  };
  return order[status] ?? 4;
}

function BalanceCard({
  label,
  value,
  colorClass,
  hint,
  footer,
}: {
  label: string;
  value: number;
  colorClass: string;
  hint: string;
  footer: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-border bg-surface px-5 py-[22px] shadow-card">
      <div className="mb-1.5 text-[13px] font-medium text-text-secondary">
        {label}
      </div>
      <div
        className={cn(
          "text-[32px] font-extrabold tracking-[-0.5px]",
          colorClass,
        )}
      >
        {formatBRL(value)}
      </div>
      <div className="mt-0.5 text-xs text-text-disabled">{hint}</div>
      <div className="mt-2.5 border-t border-border-soft pt-2.5 text-xs text-text-secondary">
        {footer}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  colorClass,
  badge,
}: {
  label: string;
  value: number;
  colorClass: string;
  badge?: string;
}) {
  return (
    <div className="rounded-[14px] border border-border bg-surface px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-text-secondary">{label}</div>
        {badge && (
          <span className="rounded-full bg-success-tint px-[7px] py-0.5 text-[11px] font-bold text-success">
            {badge}
          </span>
        )}
      </div>
      <div className={cn("mt-1 text-[19px] font-bold", colorClass)}>
        {formatBRL(value)}
      </div>
    </div>
  );
}
