import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";
import { getUserSettings } from "@/prisma/settings";
import MonthStartDaySelect from "@/components/MonthStartDaySelect";
import TrackingStartMonthInput from "@/components/TrackingStartMonthInput";
import { cn } from "@/lib/cn";

export default async function ConfiguracoesPage() {
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const name = (user.user_metadata?.name as string | undefined)?.trim() || user.email || "Você";
  const email = user.email ?? "";
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <div className="flex items-center gap-3.5 rounded-lg border border-border bg-surface p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-tint text-lg font-bold text-primary-dark">
          {initials || "?"}
        </div>
        <div>
          <div className="text-[15px] font-bold">{name}</div>
          <div className="text-[13px] text-text-secondary">{email}</div>
        </div>
      </div>

      <Link
        href="/categorias"
        className="config-categorias-link rounded-lg border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-text no-underline"
      >
        Categorias e subcategorias →
      </Link>

      <div className="flex flex-col rounded-lg border border-border bg-surface px-5 py-1.5">
        <Row label="Modo escuro">
          <Toggle />
        </Row>
        <Row label="Moeda">
          <span className="text-[13px] text-text-secondary">R$ (Real)</span>
        </Row>
        <Row label="Dia de início do mês">
          <MonthStartDaySelect initialDay={monthStartDay} />
        </Row>
        <Row label="Mês de início" last>
          <TrackingStartMonthInput initialPeriod={trackingStartPeriod} />
        </Row>
      </div>
      <div className="-mt-2 text-xs leading-normal text-text-secondary">
        Se você recebe salário depois do dia 1, defina o dia aqui — os primeiros dias do mês
        continuam contando como parte do período anterior, junto com o que você já recebeu.
      </div>
      <div className="-mt-2 text-xs leading-normal text-text-secondary">
        O mês de início marca a partir de quando você quer acompanhar. Meses anteriores a ele não
        geram gastos fixos nem aparecem no painel, lançamentos ou relatórios.
      </div>

      <div className="mt-1.5 text-[13px] font-semibold text-text-secondary">Em breve</div>
      <div className="flex flex-col gap-2.5">
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
          className="mt-1.5 self-start rounded-md border border-danger-tint bg-danger-tint px-[18px] py-[11px] text-sm font-semibold text-danger"
        >
          Sair da conta
        </button>
      </form>
    </div>
  );
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between py-3.5", !last && "border-b border-border-soft")}>
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}

function Toggle() {
  return (
    <div className="relative h-6 w-[42px] rounded-full bg-border">
      <div className="absolute top-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white" />
    </div>
  );
}

function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-dashed border-border bg-canvas p-4 opacity-75">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-xs text-text-secondary">{description}</div>
      </div>
      <span className="rounded-full bg-primary-tint px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-info">
        Em breve
      </span>
    </div>
  );
}
