import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Privacy Policy', to: '/privacy' },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-sm transition-colors duration-300 ease-out pb-24 sm:pb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.6)]">
                %
              </span>
              <span className="text-lg font-semibold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
                Tenor
              </span>
            </div>
            <p className="text-sm text-[var(--text-subheading)] max-w-[240px] transition-colors duration-300 ease-out">
              Smart loan decisions start here
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-[var(--text-subheading)] hover:text-[var(--text-heading)] transition-colors duration-200 ease-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-[var(--text-subheading)] whitespace-nowrap transition-colors duration-300 ease-out">
            Made with <span className="text-rose-400">♥</span> by{' '}
            <span className="text-violet-600 font-medium">Faraz</span>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--nav-border)] text-center text-xs text-[var(--text-subheading)] transition-colors duration-300 ease-out">
          © 2026 Tenor. Built by <span className="text-violet-600 font-medium">Faraz</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
