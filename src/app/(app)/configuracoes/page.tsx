import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";
import { getUserSettings } from "@/prisma/settings";
import MonthStartDaySelect from "@/components/MonthStartDaySelect";

export default async function ConfiguracoesPage() {
  const user = await requireUser();
  const { monthStartDay } = await getUserSettings(user.id);
  const name = (user.user_metadata?.name as string | undefined)?.trim() || user.email || "Você";
  const email = user.email ?? "";
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
      <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--color-primary-tint)", color: "var(--color-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
          {initials || "?"}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{name}</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{email}</div>
        </div>
      </div>

      <Link
        href="/categorias"
        className="config-categorias-link"
        style={{
          background: "var(--surface)",
          borderRadius: 16,
          padding: "14px 20px",
          border: "1px solid var(--border)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text)",
          textDecoration: "none",
        }}
      >
        Categorias e subcategorias →
      </Link>

      <div style={{ background: "var(--surface)", borderRadius: 16, padding: "6px 20px", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
        <Row label="Modo escuro">
          <Toggle />
        </Row>
        <Row label="Moeda">
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>R$ (Real)</span>
        </Row>
        <Row label="Dia de início do mês" last>
          <MonthStartDaySelect initialDay={monthStartDay} />
        </Row>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: -8, lineHeight: 1.5 }}>
        Se você recebe salário depois do dia 1, defina o dia aqui — os primeiros dias do mês
        continuam contando como parte do período anterior, junto com o que você já recebeu.
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginTop: 6 }}>Em breve</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ComingSoon
          title="Importação automática do banco"
          description="Sincronize seu extrato automaticamente."
        />
        <ComingSoon
          title="Lançar gastos pelo WhatsApp"
          description="Envie uma mensagem e registramos por você."
        />
      </div>

      <form action={signOut}>
        <button
          type="submit"
          style={{
            alignSelf: "flex-start",
            marginTop: 6,
            padding: "11px 18px",
            border: "1px solid var(--color-danger-tint)",
            borderRadius: "var(--radius-md)",
            background: "var(--color-danger-tint)",
            color: "var(--color-danger)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Sair da conta
        </button>
      </form>
    </div>
  );
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: last ? "none" : "1px solid var(--border-soft)",
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
      {children}
    </div>
  );
}

function Toggle() {
  return (
    <div style={{ width: 42, height: 24, borderRadius: 99, background: "var(--border)", position: "relative" }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: 3 }} />
    </div>
  );
}

function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px dashed var(--border)",
        borderRadius: 14,
        padding: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: 0.75,
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{description}</div>
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--color-info)",
          background: "var(--color-primary-tint)",
          padding: "4px 10px",
          borderRadius: 99,
          whiteSpace: "nowrap",
        }}
      >
        Em breve
      </span>
    </div>
  );
}
