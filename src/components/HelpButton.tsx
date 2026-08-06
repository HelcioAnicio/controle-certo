"use client";

import { useState } from "react";
import { TbQuestionMark } from "react-icons/tb";
import { closeBtn, modalHeader, modalTitle } from "./modals/styles";

export default function HelpButton({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Como ler esta tela"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary"
      >
        <TbQuestionMark size={15} />
      </button>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className={modalHeader}>
              <div className={modalTitle}>{title}</div>
              <button type="button" onClick={() => setOpen(false)} className={closeBtn}>
                ×
              </button>
            </div>
            <div className="flex flex-col gap-3.5 text-[13px] leading-normal text-text-secondary">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
