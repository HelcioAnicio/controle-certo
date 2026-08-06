"use client";

import { TbMoodEmpty, TbPlus } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";

export default function EmptyState({
  title,
  description,
  actionLabel = "+ Novo lançamento",
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  const { openModal } = useModal();
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-5 py-[60px] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary">
        <TbMoodEmpty size={30} />
      </div>
      <div className="text-base font-bold">{title}</div>
      <div className="max-w-80 text-[13px] text-text-secondary">{description}</div>
      <button
        type="button"
        onClick={() => openModal("novoLancamento")}
        className="mt-2 flex items-center gap-1.5 rounded-md border-none bg-primary px-[18px] py-[11px] text-sm font-semibold text-white"
      >
        <TbPlus size={16} /> {actionLabel.replace("+ ", "")}
      </button>
    </div>
  );
}
