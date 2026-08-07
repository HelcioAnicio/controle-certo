"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "pending", label: "Pendentes" },
  { id: "paid", label: "Pagos" },
  { id: "due", label: "A vencer" },
  { id: "overdue", label: "Atrasados" },
];

export default function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "todos";

  function goTo(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "todos") params.delete("status");
    else params.set("status", id);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5">
      {FILTERS.map((f) => {
        const active = current === f.id;
        return (
          <button
            key={f.id}
            onClick={() => goTo(f.id)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold",
              active
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-[#334155]",
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
