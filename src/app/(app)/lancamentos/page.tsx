import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import {
  buildDailyLedger,
  effectiveDate,
  loadMonthData,
  type EnrichedTransaction,
} from "@/lib/dashboard";
import { getUserSettings } from "@/prisma/settings";
import { BR_TIMEZONE, formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import PayButton from "@/components/PayButton";
import DeleteButton from "@/components/DeleteButton";
import EditTransactionButton from "@/components/EditTransactionButton";
import FilterChips from "@/components/FilterChips";
import SearchInput from "@/components/SearchInput";
import HelpButton from "@/components/HelpButton";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/cn";

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
  const { transactions } = await loadMonthData(
    user.id,
    period,
    monthStartDay,
    trackingStartPeriod,
  );

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
    const haystack =
      `${t.description ?? ""} ${t.subcategoryName}`.toLowerCase();
    return haystack.includes(query);
  });

  const filteredTotal = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.displayAmount, 0);

  const { days, undated } = buildDailyLedger(transactions, filtered);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput placeholder="Buscar por descrição ou subcategoria..." />
      <div className="flex items-center gap-2.5">
        <FilterChips />
        <HelpButton title="Como ler os lançamentos">
          <LancamentosHelpContent />
        </HelpButton>
      </div>

      {filtered.length === 0 ? (
        <div className="max-w-[860px] rounded-lg border border-border bg-surface px-5 py-10 text-center text-sm text-text-secondary">
          Nenhum lançamento neste filtro.
        </div>
      ) : (
        <div className="flex max-w-[860px] flex-col gap-[18px]">
          {days.map((day) => (
            <div key={day.dateKey}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1 pt-0 pb-2">
                <div className="text-[13px] font-bold text-text">
                  {formatDayHeader(day.date)}
                </div>
                <div className="flex gap-3 text-[11px] text-text-secondary">
                  <span>
                    Saldo{" "}
                    <b
                      className={
                        day.actualBalance >= 0 ? "text-success" : "text-danger"
                      }
                    >
                      {formatBRL(day.actualBalance)}
                    </b>
                  </span>
                  <span>
                    Previsto{" "}
                    <b
                      className={
                        day.projectedBalance >= 0
                          ? "text-primary"
                          : "text-danger"
                      }
                    >
                      {formatBRL(day.projectedBalance)}
                    </b>
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border bg-surface">
                {day.transactions.map((t, i) => (
                  <TxRow
                    key={t.id}
                    t={t}
                    last={i === day.transactions.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}

          {undated.length > 0 && (
            <div>
              <div className="px-1 pt-0 pb-2 text-[13px] font-bold text-text">
                Sem data definida
              </div>
              <div className="overflow-hidden rounded-lg border border-border bg-surface">
                {undated.map((t, i) => (
                  <TxRow key={t.id} t={t} last={i === undated.length - 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex max-w-[860px] justify-between rounded-[14px] border border-border bg-surface px-[18px] py-3.5 text-sm font-semibold">
        <span className="font-medium text-text-secondary">Total filtrado</span>
        <span>{formatBRL(filteredTotal)}</span>
      </div>
    </div>
  );
}

function LancamentosHelpContent() {
  return (
    <>
      <div>
        <b className="text-text">Saldo do dia</b>: o quanto entrou/saiu de fato
        até aquele dia (só conta o que já foi pago ou recebido).
      </div>
      <div>
        <b className="text-text">Previsto</b>: o mesmo saldo, mas já
        considerando contas com data de vencimento futura. Mostra pra onde seu
        saldo vai, mesmo antes de você confirmar o pagamento/recebimento.
      </div>
      <div>
        <b className="text-text">Ordem</b>: os lançamentos são agrupados por dia
        (data de pagamento se já foi pago, senão a data de vencimento) e
        ordenados do mais antigo pro mais recente. Sem nenhuma data, o
        lançamento aparece em &quot;Sem data definida&quot;.
      </div>
      <div>
        <b className="text-text">Botão de ação</b>: já indica o status. Para
        despesas, alterna entre Pagar (azul) e Pago (tom azulado); para
        receitas, entre Receber (azul) e Recebido (verde). Pode confirmar a
        qualquer momento, mesmo antes da data de vencimento. Clicando de novo
        depois de confirmado, dá pra editar valor/data ou desfazer o pagamento.
      </div>
      <div>
        <b className="text-text">Filtros e busca</b>: os chips filtram por
        status (Pendentes, Pagos, A vencer, Atrasados) e o campo de busca filtra
        por descrição ou subcategoria; os dois podem ser usados juntos.
      </div>
    </>
  );
}

function formatDayHeader(date: Date): string {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const weekday = cap(
    date
      .toLocaleDateString("pt-BR", { weekday: "short", timeZone: BR_TIMEZONE })
      .replace(".", ""),
  );
  const day = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    timeZone: BR_TIMEZONE,
  });
  const month = cap(
    date
      .toLocaleDateString("pt-BR", { month: "short", timeZone: BR_TIMEZONE })
      .replace(".", ""),
  );
  return `${weekday}, ${day}/${month}`;
}

function TxRow({ t, last }: { t: EnrichedTransaction; last: boolean }) {
  const d = effectiveDate(t);
  const paid = t.status === "paid";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 px-4 py-3.5",
        !last && "border-b border-border-soft",
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <CategoryIcon
          icon={t.subcategoryIcon}
          color={t.categoryColor}
          size={32}
        />
        <div className="min-w-0">
          <div className="overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap">
            {t.description || t.subcategoryName}
          </div>
          <div className="text-xs text-text-secondary">
            {t.subcategoryName} ·{" "}
            {d
              ? paid
                ? `${t.type === "income" ? "recebido" : "pago"} em ${d.toLocaleDateString("pt-BR", { timeZone: BR_TIMEZONE })}`
                : d.toLocaleDateString("pt-BR", { timeZone: BR_TIMEZONE })
              : "—"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <PayButton tx={t} variant="row" />
        <div
          className={cn(
            "w-[110px] text-right text-sm font-bold",
            paid ? "text-text-secondary" : "text-text",
          )}
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
