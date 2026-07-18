import { ContentPageHeader } from '../components/ContentPageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const STEPS = [
  {
    emoji: '🎯',
    title: 'Enter Your Details',
    description:
      'Enter your loan amount, interest rate, and tenure using our easy sliders. Results update instantly — no calculate button needed.',
  },
  {
    emoji: '📊',
    title: 'Understand Your Numbers',
    description:
      'See your monthly payment, total interest, and full amortization schedule broken down year by year.',
  },
  {
    emoji: '💰',
    title: 'Compare and Save',
    description:
      'Use Compare mode to put two loans side by side. Use Prepay mode to see how extra payments save you thousands.',
  },
];

const FAQS = [
  {
    q: 'Is Tenor free?',
    a: 'Yes, completely free. No account needed.',
  },
  {
    q: 'How accurate are the calculations?',
    a: 'Our calculations use standard amortization formulas used by banks worldwide. Results are estimates — actual terms vary by lender.',
  },
  {
    q: 'Can I save my calculation?',
    a: 'Use the PDF download button to save and share your calculation.',
  },
  {
    q: 'Does Tenor work on mobile?',
    a: 'Yes! Tenor is fully optimized for mobile devices.',
  },
];

export function HowItWorksPage() {
  useDocumentTitle('How Tenor Works – Loan Calculator Guide & FAQ');

  return (
    <div className="tab-fade">
      <ContentPageHeader title="How Tenor Works" subtitle="3 simple steps to loan clarity" />

      <div className="space-y-6 max-w-3xl mx-auto">
        <section className="tenor-card p-6 sm:p-7">
          <div className="space-y-6">
            {STEPS.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-violet-500 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.4)]">
                    {index + 1}
                  </span>
                  {index < STEPS.length - 1 && (
                    <span className="mt-2 h-full w-px flex-1 bg-slate-200" />
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-1.5">
                    {step.title} <span className="text-lg">{step.emoji}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tenor-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Frequently asked questions</h2>
          <div className="divide-y divide-slate-100">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-slate-900 mb-1.5">{faq.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
