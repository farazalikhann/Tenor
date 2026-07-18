import { ContentPageHeader } from '../components/ContentPageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FEATURES = [
  {
    emoji: '🏠',
    title: 'Loan Calculator',
    description: 'Calculate monthly payments instantly with our real-time loan calculator.',
  },
  {
    emoji: '⚖️',
    title: 'Loan Comparison',
    description: 'Compare two loans side by side to find which one truly costs less.',
  },
  {
    emoji: '💡',
    title: 'Prepayment Planner',
    description: 'See exactly how much you save by paying a little extra every month.',
  },
];

export function AboutPage() {
  useDocumentTitle('About Tenor – Free Loan & EMI Calculator');

  return (
    <div className="tab-fade">
      <ContentPageHeader title="About Tenor" subtitle="Smart loan decisions start here" />

      <div className="space-y-6 max-w-3xl mx-auto">
        <section className="tenor-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Our Story</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tenor was built with one simple goal: help people understand their loans before
            signing anything. We believe financial clarity shouldn't require a finance degree.
          </p>
        </section>

        <section className="tenor-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-xl mb-3">
                  {feature.emoji}
                </span>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tenor-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tenor is free to use. No sign ups. No hidden fees. Just clear numbers.
          </p>
        </section>

        <section className="tenor-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">About the Creator</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tenor is built by <span className="text-violet-600 font-medium">Faraz</span>, a
            developer passionate about making financial tools simple and accessible for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
