"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlus } from "react-icons/tb";
import { NAV_ICONS } from "@/lib/icons";
import { useModal } from "./providers/ModalProvider";
import MonthSwitcher from "./MonthSwitcher";

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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        className="app-sidebar"
        style={{
          width: 232,
          flexShrink: 0,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: "20px 16px",
          flexDirection: "column",
          gap: 22,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--color-primary)", flexShrink: 0 }} />
          <div style={{ fontSize: 16, fontWeight: 700 }}>Casa em Dia</div>
        </div>

        <button
          onClick={() => openModal("novoLancamento")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 12,
            border: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <TbPlus size={16} /> Novo lançamento
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.id];
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  background: active ? "var(--color-primary-tint)" : "transparent",
                  color: active ? "var(--color-primary-dark)" : "#334155",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} color={active ? "var(--color-primary)" : "var(--text-disabled)"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 6px",
            borderTop: "1px solid var(--border)",
            paddingTop: 16,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--color-primary-tint)",
              color: "var(--color-primary-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials || "?"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {name}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {email}
            </div>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 28px",
            background: "var(--bg)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <MonthSwitcher />
          <div className="app-topbar-title" style={{ fontSize: 18, fontWeight: 700 }}>
            {SCREEN_TITLES[pathname] ?? ""}
          </div>
          <div
            className="app-topbar-avatar"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--color-primary-tint)",
              color: "var(--color-primary-dark)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {initials || "?"}
          </div>
        </div>

        <div className="app-screen-body" style={{ flex: 1, padding: "24px 28px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
          {children}
        </div>
      </div>

      <div
        className="app-bottom-nav"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64,
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 4px",
          zIndex: 40,
        }}
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = NAV_ICONS[item.id];
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "none",
                padding: "6px 8px",
                color: active ? "var(--color-primary)" : "var(--text-disabled)",
                fontWeight: active ? 600 : 500,
                textDecoration: "none",
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: 10 }}>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        className="app-fab"
        onClick={() => openModal("novoLancamento")}
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 36,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--color-primary)",
          border: "none",
          color: "#fff",
          boxShadow: "0 6px 18px rgba(37,99,235,0.4)",
          zIndex: 41,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TbPlus size={26} />
      </button>
    </div>
  );
}
