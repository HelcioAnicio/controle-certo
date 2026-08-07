import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { listFixedExpenses } from "@/prisma/fixedExpenses";
import { listCategories, listSubcategories } from "@/prisma/categories";
import {
  ensureFixedExpensesGeneratedForPeriod,
  listTransactionsForPeriod,
} from "@/prisma/transactions";
import { getUserSettings } from "@/prisma/settings";
import { formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import PauseButton from "@/components/PauseButton";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import EmptyState from "@/components/EmptyState";
import EditFixedExpenseButton from "@/components/EditFixedExpenseButton";
import DeleteButton from "@/components/DeleteButton";
import { cn } from "@/lib/cn";

export default async function GastosFixosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const period = month || periodForDate(new Date(), monthStartDay);
  if (trackingStartPeriod && period < trackingStartPeriod) {
    redirect(`/gastos-fixos?month=${trackingStartPeriod}`);
  }

  await ensureFixedExpensesGeneratedForPeriod(
    user.id,
    period,
    monthStartDay,
    trackingStartPeriod,
  );
  const [fixedExpenses, categories, subcategories, transactions] =
    await Promise.all([
      listFixedExpenses(user.id),
      listCategories(user.id),
      listSubcategories(user.id),
      listTransactionsForPeriod(user.id, period),
    ]);

  const subById = new Map(subcategories.map((s) => [s.id, s]));
  const catById = new Map(categories.map((c) => [c.id, c]));
  const generatedIds = new Set(
    transactions.map((t) => t.fixedExpenseId).filter(Boolean),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[14px] bg-primary-tint px-[18px] py-3.5 text-[13px] leading-normal text-primary-dark">
        Cadastre aqui as contas e receitas que se repetem todo mês, como
        aluguel, salário ou assinaturas. O valor serve para a previsão; na hora
        de confirmar você informa o valor real.
      </div>

      <ModalTriggerButton modal="novoFixo">+ Novo fixo</ModalTriggerButton>

      {fixedExpenses.length === 0 ? (
        <EmptyState
          title="Você ainda não tem fixos"
          description="Cadastre água, luz, aluguel, salário e outras contas ou receitas que se repetem todo mês."
          actionLabel="Novo fixo"
        />
      ) : (
        <div className="max-w-[600px] overflow-hidden rounded-lg border border-border bg-surface">
          {fixedExpenses.map((f) => {
            const sub = subById.get(f.subcategoryId);
            const cat = sub ? catById.get(sub.categoryId) : undefined;
            const generated = generatedIds.has(f.id);
            const statusText = !f.active
              ? "Pausado"
              : generated
                ? "Gerado este mês"
                : "Ainda não gerado";
            return (
              <div
                key={f.id}
                className={cn(
                  "flex flex-col flex-wrap gap-3 border-b border-border-soft px-4 py-3.5",
                  !f.active && "opacity-50",
                )}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <CategoryIcon
                    icon={sub?.icon ?? "folder"}
                    color={cat?.color ?? "#64748B"}
                    size={32}
                  />
                  <div className="overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap">
                    {f.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {sub?.name ?? "—"} · vence dia {f.dueDay}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 text-[11px] text-text-disabled">
                    {statusText}
                  </div>
                  <div
                    className={cn(
                      "w-[110px] text-right text-sm font-bold",
                      sub?.type === "income" ? "text-success" : "text-text",
                    )}
                  >
                    {sub?.type === "income" ? "+ " : "- "}
                    {formatBRL(Number(f.estimatedAmount))}
                  </div>
                  <EditFixedExpenseButton fixedExpense={f} />
                  <PauseButton id={f.id} active={f.active} />
                  <DeleteButton id={f.id} desc={f.name} kind="fixedExpense" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
