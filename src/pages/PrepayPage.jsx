import { useMemo, useState } from 'react';
import { SliderField } from '../components/SliderField';
import { useCalculator } from '../context/CalculatorContext';
import { useSettings } from '../context/SettingsContext';
import { computeSummary, computeSummaryWithExtraPayment } from '../lib/loanMath';
import { formatCurrency } from '../lib/format';
import { getCurrency } from '../lib/currency';

const PRESETS = [100, 250, 500, 1000];

function monthsToYearsMonths(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatMonthYear(date) {
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export function PrepayPage() {
  const calc = useCalculator();
  const { currency } = useSettings();
  const currencySymbol = getCurrency(currency).symbol;

  const [amount, setAmount] = useState(calc.amount);
  const [rate, setRate] = useState(calc.rate);
  const [years, setYears] = useState(calc.years);
  const [extra, setExtra] = useState(0);

  const original = useMemo(() => computeSummary(amount, rate, years), [amount, rate, years]);
  const originalMonths = years * 12;

  const withExtra = useMemo(
    () => computeSummaryWithExtraPayment(amount, rate, years, extra),
    [amount, rate, years, extra]
  );

  const monthsSaved = Math.max(originalMonths - withExtra.months, 0);
  const interestSaved = Math.max(original.totalInterest - withExtra.totalInterest, 0);

  const today = useMemo(() => new Date(), []);
  const originalPayoff = formatMonthYear(addMonths(today, originalMonths));
  const newPayoff = formatMonthYear(addMonths(today, withExtra.months));

  const newBarPct = originalMonths > 0 ? Math.max((withExtra.months / originalMonths) * 100, 2) : 0;

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
          What if I pay extra?
        </h1>
        <p className="mt-2 text-[var(--text-subheading)] text-sm sm:text-base max-w-md mx-auto transition-colors duration-300 ease-out">
          See how much time and interest an extra monthly payment saves you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 tenor-card p-6 sm:p-7">
          <h2 className="text-base font-semibold text-slate-900 mb-6">Loan details</h2>
          <div className="space-y-7">
            <SliderField
              label="Loan Amount"
              value={amount}
              min={1000}
              max={1000000}
              step={1000}
              prefix={currencySymbol}
              onChange={setAmount}
              formatValue={(v) => Math.round(v).toLocaleString()}
            />
            <SliderField
              label="Interest Rate"
              value={rate}
              min={1}
              max={30}
              step={0.1}
              suffix="%"
              onChange={setRate}
              formatValue={(v) => v.toFixed(1)}
            />
            <SliderField
              label="Original Tenure"
              value={years}
              min={1}
              max={30}
              step={1}
              suffix=" yr"
              onChange={setYears}
              formatValue={(v) => Math.round(v)}
            />
            <SliderField
              label="Extra Monthly Payment"
              value={extra}
              min={0}
              max={2000}
              step={10}
              prefix={currencySymbol}
              onChange={setExtra}
              formatValue={(v) => Math.round(v).toLocaleString()}
            />
          </div>

          <div className="mt-5">
            <p className="text-xs text-slate-500 mb-2">Quick presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setExtra(preset)}
                  className={`tap-target rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out ${
                    extra === preset
                      ? 'bg-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.55)]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  +{currencySymbol}
                  {preset}/mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 tenor-card p-6 sm:p-7">
          <h2 className="text-base font-semibold text-slate-900 mb-6">Impact of prepaying</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm text-slate-600 mb-1">Time saved</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-violet-700 tabular-nums">
                {monthsSaved > 0 ? monthsToYearsMonths(monthsSaved) : '—'}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm text-slate-600 mb-1">Total interest saved</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tabular-nums">
                {formatCurrency(interestSaved, currency)}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-2">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-slate-500">Original payoff · {originalPayoff}</span>
                <span className="text-slate-700 font-medium tabular-nums">{monthsToYearsMonths(originalMonths)}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-slate-400" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-slate-500">New payoff · {newPayoff}</span>
                <span className="text-emerald-700 font-medium tabular-nums">
                  {monthsToYearsMonths(withExtra.months)}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
                  style={{ width: `${newBarPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500">New monthly payment</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">
                {formatCurrency(original.monthly + extra, currency)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">New total interest</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">
                {formatCurrency(withExtra.totalInterest, currency)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
