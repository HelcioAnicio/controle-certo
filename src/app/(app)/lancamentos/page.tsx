import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { loadMonthData } from '@/lib/dashboard';
import { getUserSettings } from '@/prisma/settings';
import { formatBRL, periodForDate } from '@/lib/finance';
import CategoryIcon from '@/components/CategoryIcon';
import StatusBadge from '@/components/StatusBadge';
import PayButton from '@/components/PayButton';
import DeleteButton from '@/components/DeleteButton';
import EditTransactionButton from '@/components/EditTransactionButton';
import FilterChips from '@/components/FilterChips';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';

export default async function LancamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; status?: string; q?: string }>;
}) {
  const { month, status, q } = await searchParams;
  const user = await requireUser();
  const { monthStartDay, trackingStartPeriod } = await getUserSettings(user.id);
  const period = month || periodForDate(new Date(), monthStartDay);
  if (trackingStartPeriod && period < trackingStartPeriod) {
    const params = new URLSearchParams();
    params.set('month', trackingStartPeriod);
    if (status) params.set('status', status);
    if (q) params.set('q', q);
    redirect(`/lancamentos?${params.toString()}`);
  }
  const { transactions } = await loadMonthData(
    user.id,
    period,
    monthStartDay,
    trackingStartPeriod,
  );

  if (transactions.length === 0) {
    return (
      <EmptyState
        title='Nenhum lançamento neste mês'
        description='Adicione uma receita ou despesa para começar a acompanhar este mês.'
      />
    );
  }

  const filter = status || 'todos';
  const query = (q || '').trim().toLowerCase();
  const filtered = transactions
    .filter((t) => {
      if (filter === 'todos') return true;
      if (filter === 'pending')
        return t.status === 'pending' || t.status === 'scheduled';
      return t.status === filter;
    })
    .filter((t) => {
      if (!query) return true;
      const haystack =
        `${t.description ?? ''} ${t.subcategoryName}`.toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => {
      const aTime = a.dueDate ? a.dueDate.getTime() : Infinity;
      const bTime = b.dueDate ? b.dueDate.getTime() : Infinity;
      return aTime - bTime;
    });

  const filteredTotal = filtered
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.displayAmount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SearchInput placeholder='Buscar por descrição ou subcategoria...' />
      <FilterChips />

      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 16,
          border: '1px solid var(--border)',
          overflow: 'hidden',
          maxWidth: '600px',
        }}>
        {filtered.length === 0 ? (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: 14,
            }}>
            Nenhum lançamento neste filtro.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                gap: 12,
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-soft)',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  minWidth: 0,
                  alignItems: 'center',
                  gap: 10,
                }}>
                <CategoryIcon
                  icon={t.subcategoryIcon}
                  color={t.categoryColor}
                  size={32}
                />
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                  {t.description || t.subcategoryName}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {t.subcategoryName} ·{' '}
                  {t.dueDate ? t.dueDate.toLocaleDateString('pt-BR') : '—'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <PayButton
                  tx={t}
                  variant='row'
                />

                {t.type === 'expense' && <StatusBadge status={t.status} />}
                <div
                  style={{
                    width: 110,
                    textAlign: 'right',
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      t.status === 'paid'
                        ? t.type === 'income'
                          ? 'var(--color-success)'
                          : 'var(--text)'
                        : 'var(--text-disabled)',
                  }}>
                  {t.type === 'income' ? '+ ' : '- '}
                  {formatBRL(t.displayAmount)}
                </div>
                <EditTransactionButton tx={t} />
                <DeleteButton
                  id={t.id}
                  desc={t.description || t.subcategoryName}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 14,
          padding: '14px 18px',
          border: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          fontWeight: 600,
        }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
          Total filtrado
        </span>
        <span>{formatBRL(filteredTotal)}</span>
      </div>
    </div>
  );
}
