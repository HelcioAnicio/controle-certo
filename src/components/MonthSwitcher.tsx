"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addMonths, periodDateRange, periodForDate, periodLabel } from "@/lib/finance";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useSettings } from "./providers/SettingsProvider";

export default function MonthSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { monthStartDay } = useSettings();
  const current = searchParams.get("month") || periodForDate(new Date(), monthStartDay);

  function goTo(period: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", period);
    router.push(`${pathname}?${params.toString()}`);
  }

  const range = monthStartDay > 1 ? periodDateRange(current, monthStartDay) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => goTo(addMonths(current, -1))} style={navBtnStyle}>
        <TbChevronLeft size={16} />
      </button>
      <div style={{ textAlign: "center", minWidth: 140 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{periodLabel(current)}</div>
        {range && (
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
            {range.start.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} –{" "}
            {range.end.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
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
