"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addMonths, periodKey, periodLabel } from "@/lib/finance";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

export default function MonthSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("month") || periodKey(new Date());

  function goTo(period: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", period);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => goTo(addMonths(current, -1))} style={navBtnStyle}>
        <TbChevronLeft size={16} />
      </button>
      <div style={{ fontSize: 15, fontWeight: 600, minWidth: 140, textAlign: "center" }}>
        {periodLabel(current)}
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
