import { LOAN_TYPES } from '../lib/loanMath';

const ICONS = {
  home: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9"
    />
  ),
  car: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16.5V12l1.8-4.6A2 2 0 0 1 7.66 6h8.68a2 2 0 0 1 1.86 1.4L20 12v4.5M4 16.5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1H4v1Zm16 0a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1h3v1ZM4 12h16M7.5 12v3.5m9-3.5v3.5"
    />
  ),
  personal: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
    />
  ),
};

export function LoanTypePills({ activeType, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Loan type"
      className="inline-flex items-center gap-1 rounded-full bg-navy-800/70 p-1.5 border border-white/5 backdrop-blur-sm"
    >
      {LOAN_TYPES.map((type) => {
        const isActive = type.id === activeType;
        return (
          <button
            key={type.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(type.id)}
            className={`relative flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
              isActive
                ? 'bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_8px_24px_-4px_rgba(124,58,237,0.65)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 shrink-0"
            >
              {ICONS[type.id]}
            </svg>
            {type.label}
          </button>
        );
      })}
    </div>
  );
}
