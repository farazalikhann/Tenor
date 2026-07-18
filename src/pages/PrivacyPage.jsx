import { ContentPageHeader } from '../components/ContentPageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'Tenor does not collect any personal information. All calculations happen in your browser. We do not store your loan data.',
  },
  {
    title: '2. Cookies',
    body: 'We use Google AdSense which may use cookies to show relevant ads. You can opt out via Google Ad Settings.',
  },
  {
    title: '3. Third Party Services',
    list: ['Google AdSense (advertising)', 'Google Analytics (traffic data)'],
  },
  {
    title: '4. Data Security',
    body: "Since we don't collect personal data, your information is always safe.",
  },
  {
    title: '5. Contact',
    body: 'Questions? Email us at: hello@tenor.app',
  },
  {
    title: '6. Changes to This Policy',
    body: 'We may update this policy. Check this page for the latest version.',
  },
];

export function PrivacyPage() {
  useDocumentTitle('Privacy Policy | Tenor Loan Calculator');

  return (
    <div className="tab-fade">
      <ContentPageHeader title="Privacy Policy" subtitle="Last updated: July 2026" />

      <section className="tenor-card p-6 sm:p-7 max-w-3xl mx-auto">
        <div className="divide-y divide-slate-100">
          {SECTIONS.map((section) => (
            <div key={section.title} className="py-5 first:pt-0 last:pb-0">
              <h2 className="text-base font-semibold text-slate-900 mb-2">{section.title}</h2>
              {section.body && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{section.body}</p>
              )}
              {section.list && (
                <ul className="mt-1 space-y-1">
                  {section.list.map((item) => (
                    <li key={item} className="text-sm sm:text-base text-slate-600 flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
