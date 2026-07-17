const LINKS = ['About', 'How it works', 'Privacy Policy', 'Contact'];

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/5 bg-navy-950/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.6)]">
                %
              </span>
              <span className="text-lg font-semibold text-white tracking-tight">Tenor</span>
            </div>
            <p className="text-sm text-slate-400 max-w-[240px]">
              Smart loan decisions start here
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 ease-out"
              >
                {link}
              </a>
            ))}
          </nav>

          <p className="text-sm text-slate-400 whitespace-nowrap">
            Made with <span className="text-rose-400">♥</span> for smart borrowers
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Tenor. All rights reserved. Estimates only — actual loan
          terms vary by lender.
        </div>
      </div>
    </footer>
  );
}
