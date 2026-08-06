"use client";

import { useModal, type ModalName } from "./providers/ModalProvider";

const defaultClassName = "self-start rounded-md border-none bg-primary px-[18px] py-[11px] text-sm font-semibold text-white";

export default function ModalTriggerButton<N extends ModalName>({
  modal,
  ctx,
  children,
  className,
}: {
  modal: N;
  ctx?: N extends "novaCategoria"
    ? { kind: "categoria" } | { kind: "subcategoria"; categoryId: string; categoryName: string }
    : never;
  children: React.ReactNode;
  className?: string;
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => openModal(modal, ctx as any)}
      // A caller-supplied className fully replaces the default look rather than
      // merging with it — several utilities here (bg/text/padding/font-size)
      // would otherwise collide with an override on the same CSS property,
      // and which one wins isn't determined by class string order in Tailwind.
      className={className ?? defaultClassName}
    >
      {children}
    </button>
  );
}
