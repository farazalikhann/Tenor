const TABS = [
  {
    id: 'calculator',
    label: 'Calculator',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9"
      />
    ),
  },
  {
    id: 'compare',
    label: 'Compare',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v3m0 15v-3M5 7h14M5 7 3 12a2.5 2.5 0 0 0 5 0L5 7Zm14 0-2 5a2.5 2.5 0 0 0 5 0l-2-5ZM8 21h8"
      />
    ),
  },
  {
    id: 'prepay',
    label: 'Prepay',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h10M4 12h16M4 18h10M17 4v4M9 10v4M17 16v4"
      />
    ),
  },
];

function TabIcon({ icon, className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      {icon}
    </svg>
  );
}

export function Nav({ activeTab, onChange }) {
  return (
    <>
      {/* Mobile bottom bar */}
      <nav
        aria-label="Primary"
        className="nav-surface bottom-nav-safe-area fixed inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t sm:hidden"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className="tap-target relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-300 ease-out"
            >
              <TabIcon
                icon={tab.icon}
                className={`h-5 w-5 shrink-0 transition-colors duration-300 ease-out ${
                  isActive ? 'text-violet-400' : 'text-[var(--text-inactive)]'
                }`}
              />
              <span
                className={`text-[11px] font-medium transition-colors duration-300 ease-out ${
                  isActive ? 'text-violet-400' : 'text-[var(--text-inactive)]'
                }`}
              >
                {tab.label}
              </span>
              <span
                className={`absolute bottom-1 h-1 w-1 rounded-full bg-violet-400 transition-opacity duration-300 ease-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Desktop sidebar */}
      <aside
        aria-label="Primary"
        className="nav-surface fixed inset-y-0 left-0 z-20 hidden w-56 flex-col gap-1 border-r px-3 py-8 sm:flex"
      >
        <div className="mb-6 flex items-center gap-2.5 px-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.6)]">
            %
          </span>
          <span className="text-lg font-semibold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
            Tenor
          </span>
        </div>

        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`tap-target flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ease-out ${
                isActive
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-[var(--text-inactive)] hover:bg-white/5 hover:text-[var(--text-heading)]'
              }`}
            >
              <TabIcon icon={tab.icon} className="h-5 w-5 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </aside>
    </>
  );
}
