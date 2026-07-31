export type TxType = "income" | "expense";
export type TxStatus = "pending" | "scheduled" | "due" | "paid" | "overdue";

export const STATUS_META: Record<TxStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pendente", color: "#F59E0B", bg: "#FEF3C7" },
  scheduled: { label: "Agendado", color: "#3B82F6", bg: "#DBEAFE" },
  due: { label: "Vence hoje", color: "#D97706", bg: "#FEF3C7" },
  paid: { label: "Pago", color: "#10B981", bg: "#D1FAE5" },
  overdue: { label: "Atrasado", color: "#EF4444", bg: "#FEE2E2" },
};

export function formatBRL(value: number): string {
  const n = Number(value) || 0;
  return (n < 0 ? "-" : "") + "R$ " + Math.abs(n).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Truncates a Date to its calendar day in local time, for date-only comparisons. */
export function dateOnly(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function computeStatus(
  tx: { paidDate: Date | null; dueDate: Date | null },
  today: Date = new Date(),
): TxStatus {
  if (tx.paidDate) return "paid";
  if (!tx.dueDate) return "pending";
  const due = dateOnly(tx.dueDate);
  const now = dateOnly(today);
  if (due < now) return "overdue";
  if (due === now) return "due";
  return "scheduled";
}

/** Format a Date as the "YYYY-MM" period key transactions are scoped by. */
export function periodKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function periodLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  const date = new Date(y, m - 1, 1);
  const label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function addMonths(period: string, delta: number): string {
  const [y, m] = period.split("-").map(Number);
  const date = new Date(y, m - 1 + delta, 1);
  return periodKey(date);
}

/** The due date for a fixed expense's occurrence within a given "YYYY-MM" period. */
export function dueDateForPeriod(period: string, dueDay: number): Date {
  const [y, m] = period.split("-").map(Number);
  const lastDay = new Date(y, m, 0).getDate();
  return new Date(y, m - 1, Math.min(dueDay, lastDay));
}

export const DEFAULT_CATEGORIES = [
  { key: "geral", name: "Geral", color: "#64748B", icon: "folder" },
  { key: "basica", name: "Despesa Básica", color: "#2563EB", icon: "home" },
  { key: "lazer", name: "Lazer", color: "#DB2777", icon: "party" },
  { key: "invest", name: "Investimento", color: "#0D9488", icon: "trending" },
  { key: "estudo", name: "Estudo", color: "#7C3AED", icon: "book" },
] as const;

export const DEFAULT_SUBCATEGORIES = [
  { key: "salario", categoryKey: "geral", name: "Salário", type: "income", icon: "cash" },
  { key: "freelance", categoryKey: "geral", name: "Freelance", type: "income", icon: "briefcase" },
  { key: "outros", categoryKey: "geral", name: "Outros", type: "expense", icon: "folder" },
  { key: "presentes", categoryKey: "geral", name: "Presentes", type: "expense", icon: "gift" },
  { key: "supermercado", categoryKey: "basica", name: "Supermercado", type: "expense", icon: "cart" },
  { key: "agua", categoryKey: "basica", name: "Conta de Água", type: "expense", icon: "water" },
  { key: "luz", categoryKey: "basica", name: "Conta de Luz", type: "expense", icon: "bulb" },
  { key: "condominio", categoryKey: "basica", name: "Condomínio", type: "expense", icon: "building" },
  { key: "aluguel", categoryKey: "basica", name: "Aluguel", type: "expense", icon: "home" },
  { key: "internet", categoryKey: "basica", name: "Internet", type: "expense", icon: "wifi" },
  { key: "restaurantes", categoryKey: "lazer", name: "Restaurantes", type: "expense", icon: "food" },
  { key: "streaming", categoryKey: "lazer", name: "Streaming", type: "expense", icon: "movie" },
  { key: "viagem", categoryKey: "lazer", name: "Viagem", type: "expense", icon: "plane" },
  { key: "reserva", categoryKey: "invest", name: "Reserva de Emergência", type: "expense", icon: "piggy" },
  { key: "acoes", categoryKey: "invest", name: "Ações", type: "expense", icon: "chart" },
  { key: "cursos", categoryKey: "estudo", name: "Cursos", type: "expense", icon: "graduation" },
  { key: "livros", categoryKey: "estudo", name: "Livros", type: "expense", icon: "book" },
] as const;

/**
 * Builds `<select>` options for subcategories ordered by category (in the
 * order `categories` was given) then alphabetically by subcategory name,
 * labeled "Category - Subcategory" so a select reads e.g. "Geral - Salário".
 */
export function buildSubcategoryOptions<
  C extends { id: string; name: string },
  S extends { id: string; name: string; categoryId: string; type: TxType },
>(categories: C[], subcategories: S[], filter?: (s: S) => boolean): { id: string; label: string }[] {
  const categoryOrder = new Map(categories.map((c, i) => [c.id, i]));
  const catNameById = new Map(categories.map((c) => [c.id, c.name]));
  return subcategories
    .filter((s) => !filter || filter(s))
    .slice()
    .sort((a, b) => {
      const ao = categoryOrder.get(a.categoryId) ?? Number.MAX_SAFE_INTEGER;
      const bo = categoryOrder.get(b.categoryId) ?? Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      return a.name.localeCompare(b.name, "pt-BR");
    })
    .map((s) => ({ id: s.id, label: `${catNameById.get(s.categoryId) ?? "—"} - ${s.name}` }));
}

export const COLOR_SWATCHES = ["#2563EB", "#DB2777", "#0D9488", "#7C3AED", "#F59E0B", "#EF4444", "#64748B", "#0EA5E9"];

export const ICON_SWATCHES = [
  "folder", "home", "party", "trending", "book", "cart", "water", "food",
] as const;
