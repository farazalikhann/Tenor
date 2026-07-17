import { generateLoanPdf } from '../lib/generatePdf';

export function DownloadPdfButton(props) {
  return (
    <button
      type="button"
      onClick={() => generateLoanPdf(props)}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(124,58,237,0.55)] transition-all duration-300 ease-out hover:bg-violet-700 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
      </svg>
      Download PDF
    </button>
  );
}
