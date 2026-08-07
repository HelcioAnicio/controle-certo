"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlus } from "react-icons/tb";
import { NAV_ICONS } from "@/lib/icons";
import { useModal } from "./providers/ModalProvider";
import MonthSwitcher from "./MonthSwitcher";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "painel", label: "Painel", href: "/painel" },
  { id: "lancamentos", label: "Lançamentos", href: "/lancamentos" },
  { id: "fixos", label: "Gastos Fixos", href: "/gastos-fixos" },
  { id: "relatorios", label: "Relatórios", href: "/relatorios" },
  { id: "categorias", label: "Categorias", href: "/categorias" },
  { id: "config", label: "Config.", href: "/configuracoes" },
];

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((n) => n.id !== "categorias");

const SCREEN_TITLES: Record<string, string> = {
  "/painel": "Painel",
  "/lancamentos": "Lançamentos",
  "/gastos-fixos": "Gastos Fixos",
  "/relatorios": "Relatórios",
  "/categorias": "Categorias",
  "/configuracoes": "Configurações",
};

export default function AppShell({
  name,
  email,
  children,
}: {
  name: string;
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { openModal } = useModal();
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen">
      <aside className="app-sidebar sticky top-0 h-screen w-[232px] shrink-0 flex-col gap-[22px] border-r border-border bg-surface px-4 py-5">
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          <div className="h-8 w-8 shrink-0 rounded-[10px] bg-primary" />
          <div className="text-base font-bold">Casa em Dia</div>
        </div>

        <button
          onClick={() => openModal("novoLancamento")}
          className="flex items-center justify-center gap-2 rounded-md border-none bg-primary p-3 text-sm font-semibold text-white"
        >
          <TbPlus size={16} /> Novo lançamento
        </button>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.id];
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm no-underline",
                  active
                    ? "bg-primary-tint font-semibold text-primary"
                    : "bg-transparent font-medium text-text-secondary",
                )}
              >
                <Icon
                  size={16}
                  color={
                    active ? "var(--color-primary)" : "var(--text-disabled)"
                  }
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 border-t border-border pt-4 pr-1.5 pb-2.5 pl-1.5">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-primary-tint text-[13px] font-bold text-primary-dark">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <div className="overflow-hidden text-[13px] font-semibold text-ellipsis whitespace-nowrap">
              {name}
            </div>
            <div className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-text-secondary">
              {email}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-canvas px-7 py-[18px]">
          <MonthSwitcher />
          <div className="app-topbar-title text-lg font-bold">
            {SCREEN_TITLES[pathname] ?? ""}
          </div>
          <div className="app-topbar-avatar h-[34px] w-[34px] items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary-dark">
            {initials || "?"}
          </div>
        </div>

        <div className="app-screen-body flex flex-1 flex-col gap-[22px] px-7 pt-6 pb-10">
          {children}
        </div>
      </div>

      <div className="app-bottom-nav fixed inset-x-0 bottom-0 z-40 h-16 items-center justify-around border-t border-border bg-surface px-1">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = NAV_ICONS[item.id];
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 bg-transparent px-2 py-1.5 no-underline",
                active
                  ? "font-semibold text-primary"
                  : "font-medium text-text-disabled",
              )}
            >
              <Icon size={18} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        className="app-fab fixed bottom-9 left-1/2 z-[41] h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-none bg-primary text-white shadow-[0_6px_18px_rgba(37,99,235,0.4)]"
        onClick={() => openModal("novoLancamento")}
      >
        <TbPlus size={26} />
      </button>
    </div>
  );
}
