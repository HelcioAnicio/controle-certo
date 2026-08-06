import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { listFixedExpenses } from "@/prisma/fixedExpenses";
import { listCategories, listSubcategories } from "@/prisma/categories";
import { ensureFixedExpensesGeneratedForPeriod, listTransactionsForPeriod } from "@/prisma/transactions";
import { getUserSettings } from "@/prisma/settings";
import { formatBRL, periodForDate } from "@/lib/finance";
import CategoryIcon from "@/components/CategoryIcon";
import PauseButton from "@/components/PauseButton";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import EmptyState from "@/components/EmptyState";
import EditFixedExpenseButton from "@/components/EditFixedExpenseButton";
import DeleteButton from "@/components/DeleteButton";

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

  await ensureFixedExpensesGeneratedForPeriod(user.id, period, monthStartDay, trackingStartPeriod);
  const [fixedExpenses, categories, subcategories, transactions] = await Promise.all([
    listFixedExpenses(user.id),
    listCategories(user.id),
    listSubcategories(user.id),
    listTransactionsForPeriod(user.id, period),
  ]);

  const subById = new Map(subcategories.map((s) => [s.id, s]));
  const catById = new Map(categories.map((c) => [c.id, c]));
  const generatedIds = new Set(transactions.map((t) => t.fixedExpenseId).filter(Boolean));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          background: "var(--color-primary-tint)",
          borderRadius: 14,
          padding: "14px 18px",
          fontSize: 13,
          color: "var(--color-primary-dark)",
          lineHeight: 1.5,
        }}
      >
        Cadastre aqui as contas e receitas que se repetem todo mês, como aluguel, salário ou
        assinaturas. O valor serve para a previsão; na hora de confirmar você informa o valor real.
      </div>

      <ModalTriggerButton modal="novoFixo">+ Novo fixo</ModalTriggerButton>

      {fixedExpenses.length === 0 ? (
        <EmptyState
          title="Você ainda não tem fixos"
          description="Cadastre água, luz, aluguel, salário e outras contas ou receitas que se repetem todo mês."
          actionLabel="Novo fixo"
        />
      ) : (
        <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", maxWidth: "600px" }}>
          {fixedExpenses.map((f) => {
            const sub = subById.get(f.subcategoryId);
            const cat = sub ? catById.get(sub.categoryId) : undefined;
            const generated = generatedIds.has(f.id);
            const statusText = !f.active ? "Pausado" : generated ? "Gerado este mês" : "Ainda não gerado";
            return (
              <div
                key={f.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: "1px solid var(--border-soft)",
                  opacity: f.active ? 1 : 0.5,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, display: "flex", minWidth: 0, alignItems: "center", gap: 10 }}>
                  <CategoryIcon icon={sub?.icon ?? "folder"} color={cat?.color ?? "#64748B"} size={32} />
                  <div style={{ fontSize: 16, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {sub?.name ?? "—"} · vence dia {f.dueDay}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      flex: 1,
                      fontSize: 11,
                      color: "var(--text-disabled)",
                    }}
                  >
                    {statusText}
                  </div>
                  <div
                    style={{
                      width: 110,
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: 700,
                      color: sub?.type === "income" ? "var(--color-success)" : "var(--text)",
                    }}
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
