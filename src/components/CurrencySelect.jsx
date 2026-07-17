import { CURRENCIES } from '../lib/currency';

export function CurrencySelect({ value, onChange }) {
  return (
    <div className="tap-target relative inline-flex items-center rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] backdrop-blur-sm transition-colors duration-300 ease-out">
      <select
        aria-label="Currency"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent rounded-full pl-4 pr-8 py-2.5 text-sm font-medium text-[var(--text-heading)] outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code} className="bg-navy-800 text-slate-100">
            {c.symbol} {c.code}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[var(--text-inactive)]"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
