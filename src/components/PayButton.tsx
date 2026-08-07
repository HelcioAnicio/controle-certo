'use client';

import { useModal } from './providers/ModalProvider';
import type { EnrichedTransaction } from '@/lib/dashboard';

export default function PayButton({
  tx,
  variant = 'compact',
}: {
  tx: EnrichedTransaction;
  variant?: 'compact' | 'row';
}) {
  const { openModal } = useModal();
  const isIncome = tx.type === 'income';
  const paid = tx.status === 'paid';
  const label = paid ? (isIncome ? 'Recebido' : 'Pago') : isIncome ? 'Receber' : 'Pagar';

  const baseStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    padding: variant === 'row' ? '7px 14px' : '6px 12px',
    borderRadius: 8,
    border: 'none',
    whiteSpace: 'nowrap',
    ...(paid
      ? {
          background: 'var(--color-success-tint)',
          color: 'var(--color-success)',
          cursor: 'default',
        }
      : { background: 'var(--color-primary)', color: '#fff' }),
  };

  return (
    <button
      type='button'
      disabled={paid}
      onClick={() =>
        openModal('confirmarPagamento', {
          id: tx.id,
          desc: tx.description || tx.subcategoryName,
          amount: Number(tx.amount),
          type: tx.type,
        })
      }
      style={baseStyle}>
      {label}
    </button>
  );
}
