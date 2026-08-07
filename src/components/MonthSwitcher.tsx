"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  addMonths,
  BR_TIMEZONE,
  periodDateRange,
  periodForDate,
  periodLabel,
} from "@/lib/finance";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useSettings } from "./providers/SettingsProvider";
import { cn } from "@/lib/cn";

const navBtnStyle =
  "flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-surface text-[#334155]";

export default function MonthSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { monthStartDay, trackingStartPeriod } = useSettings();
  const current =
    searchParams.get("month") || periodForDate(new Date(), monthStartDay);
  const atFloor = !!trackingStartPeriod && current <= trackingStartPeriod;

  function goTo(period: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", period);
    router.push(`${pathname}?${params.toString()}`);
  }

  const range =
    monthStartDay > 1 ? periodDateRange(current, monthStartDay) : null;

  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={() => goTo(addMonths(current, -1))}
        disabled={atFloor}
        title={atFloor ? "Você definiu este como o mês de início" : undefined}
        className={cn(navBtnStyle, atFloor && "cursor-not-allowed opacity-40")}
      >
        <TbChevronLeft size={16} />
      </button>
      <div className="min-w-[140px] text-center">
        <div className="text-[15px] font-semibold">{periodLabel(current)}</div>
        {range && (
          <div className="text-[11px] text-text-secondary">
            {range.start.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              timeZone: BR_TIMEZONE,
            })}{" "}
            –{" "}
            {range.end.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              timeZone: BR_TIMEZONE,
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => goTo(addMonths(current, 1))}
        className={navBtnStyle}
      >
        <TbChevronRight size={16} />
      </button>
    </div>
  );
}
