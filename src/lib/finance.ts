export type TxType = "income" | "expense";
export type TxStatus = "pending" | "scheduled" | "due" | "paid" | "overdue";

export const STATUS_META: Record<
  TxStatus,
  { label: string; textClass: string; bgClass: string }
> = {
  pending: {
    label: "Pendente",
    textClass: "text-warning",
    bgClass: "bg-warning-tint",
  },
  scheduled: {
    label: "Agendado",
    textClass: "text-info",
    bgClass: "bg-primary-tint",
  },
  due: {
    label: "Vence hoje",
    textClass: "text-warning-strong",
    bgClass: "bg-warning-tint",
  },
  paid: {
    label: "Pago",
    textClass: "text-success",
    bgClass: "bg-success-tint",
  },
  overdue: {
    label: "Atrasado",
    textClass: "text-danger",
    bgClass: "bg-danger-tint",
  },
};

export function formatBRL(value: number): string {
  const n = Number(value) || 0;
  return (
    (n < 0 ? "-" : "") +
    "R$ " +
    Math.abs(n).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * This app only serves Brazil, which has been a fixed UTC-3 with no daylight
 * saving since 2019 — so instead of relying on the *runtime's* local
 * timezone (which is Brazil on a developer's machine but UTC on Vercel,
 * silently shifting dates by hours near midnight), every date helper below
 * is anchored to this fixed offset. That makes them behave identically in
 * dev, in the browser, and on any server region. `BR_TIMEZONE` is for
 * `Intl`/`toLocaleDateString` calls elsewhere, which accept a `timeZone`
 * option that (unlike local getters) doesn't depend on the runtime either.
 */
export const BR_TIMEZONE = "America/Sao_Paulo";
const BR_OFFSET_MS = 3 * 60 * 60 * 1000;

function toBRParts(d: Date): { year: number; month: number; date: number } {
  const shifted = new Date(d.getTime() - BR_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    date: shifted.getUTCDate(),
  };
}

function fromBRParts(year: number, month: number, date: number): Date {
  return new Date(Date.UTC(year, month, date) + BR_OFFSET_MS);
}

/** Truncates a Date to its calendar day in Brazil time, for date-only comparisons. */
export function dateOnly(d: Date): number {
  const p = toBRParts(d);
  return fromBRParts(p.year, p.month, p.date).getTime();
}

/** Formats a Date as "YYYY-MM-DD" in Brazil time — the inverse of `fromBRDateKey`. */
export function toBRDateKey(d: Date): string {
  const p = toBRParts(d);
  return `${p.year}-${String(p.month + 1).padStart(2, "0")}-${String(p.date).padStart(2, "0")}`;
}

/** Parses a "YYYY-MM-DD" key as Brazil-local midnight — the inverse of `toBRDateKey`. */
export function fromBRDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return fromBRParts(y, m - 1, d);
}

/**
 * Parses a `<input type="date">` value ("YYYY-MM-DD") as Brazil-local
 * midnight. `new Date("YYYY-MM-DD")` parses it as UTC midnight instead,
 * which shifts a day earlier once Brazil-local getters are used on it —
 * silently filing things under the wrong day/period.
 */
export function parseLocalDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return fromBRParts(y, m - 1, d);
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
  const p = toBRParts(d);
  return `${p.year}-${String(p.month + 1).padStart(2, "0")}`;
}

export function periodLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  const date = fromBRParts(y, m - 1, 1);
  const label = date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: BR_TIMEZONE,
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function addMonths(period: string, delta: number): string {
  const [y, m] = period.split("-").map(Number);
  const date = fromBRParts(y, m - 1 + delta, 1);
  return periodKey(date);
}

/**
 * The period a date belongs to, given the day of month the user's "month"
 * starts on. With `startDay` 1 this is just the calendar month. With e.g.
 * `startDay` 7 (paid on the 7th), the days before the 7th still belong to
 * the previous period — someone paid on 07/08 is still living off that
 * paycheck through 06/09, so 07/09 is when the "September" period starts.
 */
export function periodForDate(d: Date, startDay: number = 1): string {
  if (startDay <= 1 || toBRParts(d).date >= startDay) {
    return periodKey(d);
  }
  return addMonths(periodKey(d), -1);
}

function clampedDate(year: number, monthIndex0: number, day: number): Date {
  const lastDay = toBRParts(fromBRParts(year, monthIndex0 + 1, 0)).date;
  return fromBRParts(year, monthIndex0, Math.min(Math.max(day, 1), lastDay));
}

/** The real calendar date `startDay` of a period falls on (clamped to the month's length). */
function periodStartDate(period: string, startDay: number): Date {
  const [y, m] = period.split("-").map(Number);
  return clampedDate(y, m - 1, startDay);
}

/** The [start, end] calendar dates a "YYYY-MM" period spans, given the configured month-start day. */
export function periodDateRange(
  period: string,
  startDay: number = 1,
): { start: Date; end: Date } {
  const start = periodStartDate(period, startDay);
  const nextStart = periodStartDate(addMonths(period, 1), startDay);
  const p = toBRParts(nextStart);
  const end = fromBRParts(p.year, p.month, p.date - 1);
  return { start, end };
}

/**
 * The due date for a fixed expense's occurrence within a given "YYYY-MM"
 * period. When `startDay` pushes the period's start past the 1st, a due day
 * earlier than `startDay` falls in the following calendar month (that's the
 * whole point: it's still within this pay period, just after the 1st).
 */
export function dueDateForPeriod(
  period: string,
  dueDay: number,
  startDay: number = 1,
): Date {
  const [y, m] = period.split("-").map(Number);
  if (dueDay < startDay) {
    const [ny, nm] = addMonths(period, 1).split("-").map(Number);
    return clampedDate(ny, nm - 1, dueDay);
  }
  return clampedDate(y, m - 1, dueDay);
}

export const DEFAULT_CATEGORIES = [
  { key: "geral", name: "Geral", color: "#64748B", icon: "folder" },
  { key: "basica", name: "Despesa Básica", color: "#2563EB", icon: "home" },
  { key: "lazer", name: "Lazer", color: "#DB2777", icon: "party" },
  { key: "invest", name: "Investimento", color: "#0D9488", icon: "trending" },
  { key: "estudo", name: "Estudo", color: "#7C3AED", icon: "book" },
] as const;

export const DEFAULT_SUBCATEGORIES = [
  {
    key: "salario",
    categoryKey: "geral",
    name: "Salário",
    type: "income",
    icon: "cash",
  },
  {
    key: "freelance",
    categoryKey: "geral",
    name: "Freelance",
    type: "income",
    icon: "briefcase",
  },
  {
    key: "outros",
    categoryKey: "geral",
    name: "Outros",
    type: "expense",
    icon: "folder",
  },
  {
    key: "presentes",
    categoryKey: "geral",
    name: "Presentes",
    type: "expense",
    icon: "gift",
  },
  {
    key: "supermercado",
    categoryKey: "basica",
    name: "Supermercado",
    type: "expense",
    icon: "cart",
  },
  {
    key: "agua",
    categoryKey: "basica",
    name: "Conta de Água",
    type: "expense",
    icon: "water",
  },
  {
    key: "luz",
    categoryKey: "basica",
    name: "Conta de Luz",
    type: "expense",
    icon: "bulb",
  },
  {
    key: "condominio",
    categoryKey: "basica",
    name: "Condomínio",
    type: "expense",
    icon: "building",
  },
  {
    key: "aluguel",
    categoryKey: "basica",
    name: "Aluguel",
    type: "expense",
    icon: "home",
  },
  {
    key: "internet",
    categoryKey: "basica",
    name: "Internet",
    type: "expense",
    icon: "wifi",
  },
  {
    key: "restaurantes",
    categoryKey: "lazer",
    name: "Restaurantes",
    type: "expense",
    icon: "food",
  },
  {
    key: "streaming",
    categoryKey: "lazer",
    name: "Streaming",
    type: "expense",
    icon: "movie",
  },
  {
    key: "viagem",
    categoryKey: "lazer",
    name: "Viagem",
    type: "expense",
    icon: "plane",
  },
  {
    key: "reserva",
    categoryKey: "invest",
    name: "Reserva de Emergência",
    type: "expense",
    icon: "piggy",
  },
  {
    key: "acoes",
    categoryKey: "invest",
    name: "Ações",
    type: "expense",
    icon: "chart",
  },
  {
    key: "cursos",
    categoryKey: "estudo",
    name: "Cursos",
    type: "expense",
    icon: "graduation",
  },
  {
    key: "livros",
    categoryKey: "estudo",
    name: "Livros",
    type: "expense",
    icon: "book",
  },
] as const;

/**
 * Builds `<select>` options for subcategories ordered by category (in the
 * order `categories` was given) then alphabetically by subcategory name,
 * labeled "Category - Subcategory" so a select reads e.g. "Geral - Salário".
 */
export function buildSubcategoryOptions<
  C extends { id: string; name: string },
  S extends { id: string; name: string; categoryId: string; type: TxType },
>(
  categories: C[],
  subcategories: S[],
  filter?: (s: S) => boolean,
): { id: string; label: string }[] {
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
    .map((s) => ({
      id: s.id,
      label: `${catNameById.get(s.categoryId) ?? "—"} - ${s.name}`,
    }));
}

export const COLOR_SWATCHES = [
  "#2563EB",
  "#DB2777",
  "#0D9488",
  "#7C3AED",
  "#F59E0B",
  "#EF4444",
  "#64748B",
  "#0EA5E9",
];

export const ICON_SWATCHES = [
  "folder",
  "home",
  "party",
  "trending",
  "book",
  "cart",
  "water",
  "food",
] as const;
