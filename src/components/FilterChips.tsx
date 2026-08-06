'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'paid', label: 'Pagos' },
  { id: 'due', label: 'A vencer' },
  { id: 'overdue', label: 'Atrasados' },
];

export default function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('status') || 'todos';

  function goTo(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'todos') params.delete('status');
    else params.set('status', id);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
      {FILTERS.map((f) => {
        const active = current === f.id;
        return (
          <button
            key={f.id}
            onClick={() => goTo(f.id)}
            style={{
              flexShrink: 0,
              padding: '8px 14px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              border: `1px solid ${active ? 'var(--color-primary)' : 'var(--border)'}`,
              background: active ? 'var(--color-primary)' : 'var(--surface)',
              color: active ? 'var(--primary)' : '#fff',
            }}>
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
