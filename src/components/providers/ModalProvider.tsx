"use client";

import { createContext, useCallback, useContext, useState } from "react";
import NovoLancamentoModal from "../modals/NovoLancamentoModal";
import NovoFixoModal, { type NovoFixoCtx } from "../modals/NovoFixoModal";
import ConfirmarPagamentoModal, { type PagamentoCtx } from "../modals/ConfirmarPagamentoModal";
import NovaCategoriaModal, { type NovaCategoriaCtx } from "../modals/NovaCategoriaModal";
import ConfirmarExclusaoModal, { type ExclusaoCtx } from "../modals/ConfirmarExclusaoModal";

export type ModalName =
  | "novoLancamento"
  | "novoFixo"
  | "confirmarPagamento"
  | "novaCategoria"
  | "confirmarExclusao";

export type ModalCtxMap = {
  novoLancamento: undefined;
  novoFixo: NovoFixoCtx | undefined;
  confirmarPagamento: PagamentoCtx;
  novaCategoria: NovaCategoriaCtx;
  confirmarExclusao: ExclusaoCtx;
};

type ModalContextValue = {
  openModal: <N extends ModalName>(name: N, ctx?: ModalCtxMap[N]) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<{ name: ModalName; ctx: unknown } | null>(null);

  const openModal = useCallback(<N extends ModalName>(name: N, ctx?: ModalCtxMap[N]) => {
    setActive({ name, ctx });
  }, []);
  const closeModal = useCallback(() => setActive(null), []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {active && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            {active.name === "novoLancamento" && <NovoLancamentoModal />}
            {active.name === "novoFixo" && <NovoFixoModal ctx={active.ctx as NovoFixoCtx | undefined} />}
            {active.name === "confirmarPagamento" && (
              <ConfirmarPagamentoModal ctx={active.ctx as PagamentoCtx} />
            )}
            {active.name === "novaCategoria" && (
              <NovaCategoriaModal ctx={active.ctx as NovaCategoriaCtx} />
            )}
            {active.name === "confirmarExclusao" && (
              <ConfirmarExclusaoModal ctx={active.ctx as ExclusaoCtx} />
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
