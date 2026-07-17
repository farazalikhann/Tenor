import { useCountUp } from '../hooks/useCountUp';
import { formatCurrency } from '../lib/format';

export function ResultCard({ label, value, accent, icon, currency }) {
  const animated = useCountUp(value, 500);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.35)] border-l-4 transition-transform duration-300 ease-out hover:-translate-y-0.5"
      style={{ borderLeftColor: accent }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: `${accent}14`, color: accent }}
          >
            {icon}
          </span>
          <span className="text-sm font-medium text-slate-500">{label}</span>
        </div>
        <p
          className="tabular-nums font-extrabold tracking-tight text-2xl sm:text-3xl"
          style={{ color: accent }}
        >
          {formatCurrency(animated, currency)}
        </p>
      </div>
    </div>
  );
}
