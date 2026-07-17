import { Link } from 'react-router-dom';

export function ContentPageHeader({ title, subtitle }) {
  return (
    <header className="mb-8 px-5 max-w-full overflow-hidden box-border">
      <Link
        to="/"
        className="tap-target inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-subheading)] hover:text-[var(--text-heading)] transition-colors duration-300 ease-out mb-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Calculator
      </Link>

      <div className="text-center">
        <h1 className="max-w-full break-words text-3xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-full break-words text-[var(--text-subheading)] text-sm sm:text-base sm:max-w-md mx-auto transition-colors duration-300 ease-out">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
