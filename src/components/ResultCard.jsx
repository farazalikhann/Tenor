import { useCountUp } from '../hooks/useCountUp';
import { formatCurrency } from '../lib/format';

export function ResultCard({ label, value, emphasis, accent, icon, currency }) {
  const animated = useCountUp(value);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-out hover:-translate-y-0.5 ${
        emphasis ? 'ring-1 ring-violet-200' : ''
      }`}
    >
      {emphasis && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-amber-400" />
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: `${accent}14`, color: accent }}
          >
            {icon}
          </span>
          <span className="text-sm font-medium text-slate-500">{label}</span>
        </div>
        <p
          className={`tabular-nums font-extrabold tracking-tight ${
            emphasis
              ? 'text-3xl sm:text-4xl bg-gradient-to-br from-violet-700 to-violet-500 bg-clip-text text-transparent'
              : 'text-2xl text-slate-900'
          }`}
        >
          {formatCurrency(animated, currency)}
        </p>
      </div>
    </div>
  );
}
