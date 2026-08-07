"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addMonths, BR_TIMEZONE, periodDateRange, periodForDate, periodLabel } from "@/lib/finance";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useSettings } from "./providers/SettingsProvider";

export default function MonthSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { monthStartDay, trackingStartPeriod } = useSettings();
  const current = searchParams.get("month") || periodForDate(new Date(), monthStartDay);
  const atFloor = !!trackingStartPeriod && current <= trackingStartPeriod;

  function goTo(period: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", period);
    router.push(`${pathname}?${params.toString()}`);
  }

  const range = monthStartDay > 1 ? periodDateRange(current, monthStartDay) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        onClick={() => goTo(addMonths(current, -1))}
        disabled={atFloor}
        title={atFloor ? "Você definiu este como o mês de início" : undefined}
        style={{ ...navBtnStyle, opacity: atFloor ? 0.4 : 1, cursor: atFloor ? "not-allowed" : "pointer" }}
      >
        <TbChevronLeft size={16} />
      </button>
      <div style={{ textAlign: "center", minWidth: 140 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{periodLabel(current)}</div>
        {range && (
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
            {range.start.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: BR_TIMEZONE })} –{" "}
            {range.end.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: BR_TIMEZONE })}
          </div>
        )}
      </div>
      <button onClick={() => goTo(addMonths(current, 1))} style={navBtnStyle}>
        <TbChevronRight size={16} />
      </button>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "#334155",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
