import { requireUser } from "@/lib/auth";
import { listFixedExpenses } from "@/prisma/fixedExpenses";
import { listCategories, listSubcategories } from "@/prisma/categories";
import { ensureFixedExpensesGeneratedForPeriod, listTransactionsForPeriod } from "@/prisma/transactions";
import { formatBRL, periodKey } from "@/lib/finance";
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
  const period = month || periodKey(new Date());
  const user = await requireUser();

  await ensureFixedExpensesGeneratedForPeriod(user.id, period);
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
        Cadastre aqui as contas que se repetem todo mês. O valor estimado serve para a previsão; na hora
        de pagar você informa o valor real.
      </div>

      <ModalTriggerButton modal="novoFixo">+ Novo gasto fixo</ModalTriggerButton>

      {fixedExpenses.length === 0 ? (
        <EmptyState
          title="Você ainda não tem gastos fixos"
          description="Cadastre água, luz, aluguel e outras contas que se repetem todo mês."
          actionLabel="Novo gasto fixo"
        />
      ) : (
        <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
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
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: "1px solid var(--border-soft)",
                  opacity: f.active ? 1 : 0.5,
                  flexWrap: "wrap",
                }}
              >
                <CategoryIcon icon={sub?.icon ?? "folder"} color={cat?.color ?? "#64748B"} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {sub?.name ?? "—"} · vence dia {f.dueDay}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{formatBRL(Number(f.estimatedAmount))}</div>
                  <div style={{ fontSize: 11, color: "var(--text-disabled)" }}>{statusText}</div>
                </div>
                <EditFixedExpenseButton fixedExpense={f} />
                <PauseButton id={f.id} active={f.active} />
                <DeleteButton id={f.id} desc={f.name} kind="fixedExpense" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
