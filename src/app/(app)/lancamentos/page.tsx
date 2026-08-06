import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { buildDailyLedger, loadMonthData, type EnrichedTransaction } from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import PayButton from "@/components/PayButton";
import DeleteButton from "@/components/DeleteButton";
import EditTransactionButton from "@/components/EditTransactionButton";
import FilterChips from "@/components/FilterChips";
import SearchInput from "@/components/SearchInput";
import HelpButton from "@/components/HelpButton";
import EmptyState from "@/components/EmptyState";

export default async function LancamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; status?: string; q?: string }>;
}) {
  const { month, status, q } = await searchParams;
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const period = month || periodForDate(new Date(), monthStartDay);
  if (trackingStartPeriod && period < trackingStartPeriod) {
    const params = new URLSearchParams();
    params.set("month", trackingStartPeriod);
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    redirect(`/lancamentos?${params.toString()}`);
  }
  const { transactions } = await loadMonthData(user.id, period, monthStartDay, trackingStartPeriod);

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="Nenhum lançamento neste mês"
        description="Adicione uma receita ou despesa para começar a acompanhar este mês."
      />
    );
  }

  const filter = status || "todos";
  const query = (q || "").trim().toLowerCase();
  const filtered = transactions.filter((t) => {
    if (filter === "todos") {
      // no-op
    } else if (filter === "pending") {
      if (t.status !== "pending" && t.status !== "scheduled") return false;
    } else if (t.status !== filter) {
      return false;
    }
    if (!query) return true;
    const haystack = `${t.description ?? ""} ${t.subcategoryName}`.toLowerCase();
    return haystack.includes(query);
  });

  const filteredTotal = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.displayAmount, 0);

  const { days, undated } = buildDailyLedger(transactions, filtered);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SearchInput placeholder="Buscar por descrição ou subcategoria..." />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <FilterChips />
        <HelpButton title="Como ler os lançamentos">
          <LancamentosHelpContent />
        </HelpButton>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            background: "var(--surface)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            padding: "40px 20px",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: 14,
            maxWidth: "600px",
          }}
        >
          Nenhum lançamento neste filtro.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: "600px" }}>
          {days.map((day) => (
            <div key={day.dateKey}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "4px 12px",
                  padding: "0 4px 8px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
                  {formatDayHeader(day.date)}
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-secondary)" }}>
                  <span>
                    Saldo{" "}
                    <b style={{ color: day.actualBalance >= 0 ? "var(--color-success)" : "var(--color-danger)" }}>
                      {formatBRL(day.actualBalance)}
                    </b>
                  </span>
                  <span>
                    Previsto{" "}
                    <b style={{ color: day.projectedBalance >= 0 ? "var(--color-primary)" : "var(--color-danger)" }}>
                      {formatBRL(day.projectedBalance)}
                    </b>
                  </span>
                </div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
                {day.transactions.map((t, i) => (
                  <TxRow key={t.id} t={t} last={i === day.transactions.length - 1} />
                ))}
              </div>
            </div>
          ))}

          {undated.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", padding: "0 4px 8px" }}>
                Sem data definida
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
                {undated.map((t, i) => (
                  <TxRow key={t.id} t={t} last={i === undated.length - 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
          maxWidth: "600px",
        }}
      >
        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Total filtrado</span>
        <span>{formatBRL(filteredTotal)}</span>
      </div>
    </div>
  );
}

function LancamentosHelpContent() {
  return (
    <>
      <div>
        <b style={{ color: "var(--text)" }}>Saldo do dia</b>: o quanto entrou/saiu de fato até
        aquele dia (só conta o que já foi pago ou recebido).
      </div>
      <div>
        <b style={{ color: "var(--text)" }}>Previsto</b>: o mesmo saldo, mas já considerando
        contas com data de vencimento futura — mostra pra onde seu saldo vai, mesmo antes de
        você confirmar o pagamento/recebimento.
      </div>
      <div>
        <b style={{ color: "var(--text)" }}>Ordem</b>: os lançamentos são agrupados por dia
        (data de pagamento se já foi pago, senão a data de vencimento) e ordenados do mais
        antigo pro mais recente. Sem nenhuma data, o lançamento aparece em &quot;Sem data
        definida&quot;.
      </div>
      <div>
        <b style={{ color: "var(--text)" }}>Botão de ação</b>: já indica o status — para
        despesas, alterna entre Agendado, Pagar e Pago; para receitas, entre Agendado, Receber
        e Recebido. &quot;Agendado&quot; fica bloqueado até a data chegar.
      </div>
      <div>
        <b style={{ color: "var(--text)" }}>Filtros e busca</b>: os chips filtram por status
        (Pendentes, Pagos, A vencer, Atrasados) e o campo de busca filtra por descrição ou
        subcategoria — os dois podem ser usados juntos.
      </div>
    </>
  );
}

function formatDayHeader(date: Date): string {
  const s = date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function TxRow({ t, last }: { t: EnrichedTransaction; last: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        borderBottom: last ? "none" : "1px solid var(--border-soft)",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, display: "flex", minWidth: 0, alignItems: "center", gap: 10 }}>
        <CategoryIcon icon={t.subcategoryIcon} color={t.categoryColor} size={32} />
        <div style={{ fontSize: 16, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {t.description || t.subcategoryName}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          {t.subcategoryName} · {t.dueDate ? t.dueDate.toLocaleDateString("pt-BR") : "—"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end" }}>
        <PayButton tx={t} variant="row" />
        <div
          style={{
            width: 110,
            textAlign: "right",
            fontSize: 14,
            fontWeight: 700,
            color: t.status === "paid" ? (t.type === "income" ? "var(--color-success)" : "var(--text)") : "var(--text-disabled)",
          }}
        >
          {t.type === "income" ? "+ " : "- "}
          {formatBRL(t.displayAmount)}
        </div>
        <EditTransactionButton tx={t} />
        <DeleteButton id={t.id} desc={t.description || t.subcategoryName} />
      </div>
    </div>
  );
}
