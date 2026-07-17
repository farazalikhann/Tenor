import { useEffect, useRef, useState } from 'react';
import { ContentPageHeader } from '../components/ContentPageHeader';

const EMPTY_FORM = { name: '', email: '', message: '' };

const CONTACT_CARDS = [
  { emoji: '📧', label: 'Email', value: 'hello@tenor.app' },
  { emoji: '🐦', label: 'Twitter', value: '@TenorApp' },
  { emoji: '💼', label: 'For business', value: 'embed@tenor.app' },
];

export function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(EMPTY_FORM);
    setSubmitted(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="tab-fade">
      <ContentPageHeader title="Get in Touch" subtitle="We'd love to hear from you" />

      <div className="space-y-6 max-w-2xl mx-auto">
        <section className="tenor-card p-6 sm:p-7">
          {submitted && (
            <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 fade-in-up">
              Thanks! We'll get back to you soon 🎉
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-500 mb-2" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={handleChange('name')}
                className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500 mb-2" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
                className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500 mb-2" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20 resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="tap-target w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(124,58,237,0.55)] transition-all duration-300 ease-out hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Send message
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-500">
            For fastest response, email us directly. We typically respond within 24 hours.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="tenor-card p-5 text-center">
              <span className="text-2xl">{card.emoji}</span>
              <p className="mt-2 text-xs text-slate-500">{card.label}</p>
              <p className="text-sm font-semibold text-slate-900 break-words">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
