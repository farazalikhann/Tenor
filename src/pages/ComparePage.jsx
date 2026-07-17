import { useMemo, useState } from 'react';
import { LoanTypePills } from '../components/LoanTypePills';
import { SliderField } from '../components/SliderField';
import { ResultCard } from '../components/ResultCard';
import { CompareBarChart } from '../components/CompareBarChart';
import { useCalculator } from '../context/CalculatorContext';
import { useSettings } from '../context/SettingsContext';
import { LOAN_TYPES, computeSummary } from '../lib/loanMath';
import { formatCurrency } from '../lib/format';
import { getCurrency } from '../lib/currency';

function useLoanState(seed) {
  const [loanType, setLoanTypeRaw] = useState(seed.loanType);
  const [amount, setAmount] = useState(seed.amount);
  const [rate, setRate] = useState(seed.rate);
  const [years, setYears] = useState(seed.years);

  const setLoanType = (id) => {
    const type = LOAN_TYPES.find((t) => t.id === id);
    setLoanTypeRaw(id);
    setRate(type.rate);
  };

  const summary = useMemo(() => computeSummary(amount, rate, years), [amount, rate, years]);

  return { loanType, amount, rate, years, setLoanType, setAmount, setRate, setYears, ...summary };
}

function LoanColumn({ title, accent, loan, currencySymbol, currency, isWinner }) {
  return (
    <div className="tenor-card p-6 sm:p-7 relative min-w-0 w-full max-w-full box-border">
      <div className="flex items-center gap-2 mb-6">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white shrink-0"
          style={{ background: accent }}
        >
          {title.slice(-1)}
        </span>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {isWinner && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            🏆 Best value
          </span>
        )}
      </div>

      <LoanTypePills activeType={loan.loanType} onChange={loan.setLoanType} />

      <div className="space-y-6 mt-6">
        <SliderField
          label="Loan Amount"
          value={loan.amount}
          min={1000}
          max={1000000}
          step={1000}
          prefix={currencySymbol}
          onChange={loan.setAmount}
          formatValue={(v) => Math.round(v).toLocaleString()}
        />
        <SliderField
          label="Interest Rate"
          value={loan.rate}
          min={1}
          max={30}
          step={0.1}
          suffix="%"
          onChange={loan.setRate}
          formatValue={(v) => v.toFixed(1)}
        />
        <SliderField
          label="Loan Tenure"
          value={loan.years}
          min={1}
          max={30}
          step={1}
          suffix=" yr"
          onChange={loan.setYears}
          formatValue={(v) => Math.round(v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 mt-6">
        <ResultCard label="Monthly Payment" value={loan.monthly} currency={currency} accent="#7C3AED" icon={<CoinIcon />} />
        <ResultCard label="Total Interest" value={loan.totalInterest} currency={currency} accent="#F59E0B" icon={<TrendIcon />} />
        <ResultCard label="Total Amount" value={loan.totalAmount} currency={currency} accent="#16A34A" icon={<ReceiptIcon />} />
      </div>
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-3-5.5 1.5-1a2.5 2.5 0 0 1 3 0l1.5 1M8 15.5l1.5 1a2.5 2.5 0 0 0 3 0l1.5-1M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17 9 11l4 4 8-8M14 7h6v6" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6M4 6l2-3h12l2 3M9 11h6" />
    </svg>
  );
}

export function ComparePage() {
  const calc = useCalculator();
  const { currency } = useSettings();
  const currencySymbol = getCurrency(currency).symbol;

  const seed = { loanType: calc.loanType, amount: calc.amount, rate: calc.rate, years: calc.years };
  const loanA = useLoanState(seed);
  const loanB = useLoanState(seed);

  const interestDiff = Math.abs(loanA.totalInterest - loanB.totalInterest);
  const monthlyDiff = Math.abs(loanA.monthly - loanB.monthly);
  const cheaperInterest = loanA.totalInterest <= loanB.totalInterest ? 'A' : 'B';
  const pricierInterest = cheaperInterest === 'A' ? 'B' : 'A';
  const cheaperMonthly = loanA.monthly <= loanB.monthly ? 'A' : 'B';
  const pricierMonthly = cheaperMonthly === 'A' ? 'B' : 'A';
  const overallWinner = loanA.totalAmount <= loanB.totalAmount ? 'A' : 'B';

  return (
    <div className="w-full max-w-full overflow-x-hidden box-border">
      <header className="mb-8 px-5 max-w-full overflow-hidden text-center box-border">
        <h1 className="max-w-full break-words text-3xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
          Compare two loans
        </h1>
        <p className="mt-2 max-w-full break-words text-[var(--text-subheading)] text-sm sm:text-base sm:max-w-md mx-auto transition-colors duration-300 ease-out">
          Tweak each loan independently and see which one actually costs you less.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-full box-border">
        <LoanColumn
          title="Loan A"
          accent="#7C3AED"
          loan={loanA}
          currencySymbol={currencySymbol}
          currency={currency}
          isWinner={overallWinner === 'A'}
        />
        <LoanColumn
          title="Loan B"
          accent="#F59E0B"
          loan={loanB}
          currencySymbol={currencySymbol}
          currency={currency}
          isWinner={overallWinner === 'B'}
        />
      </div>

      <section className="tenor-card p-6 sm:p-7 mt-6 min-w-0 w-full max-w-full box-border">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Comparison summary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-violet-700">Loan {cheaperInterest}</span> saves you{' '}
              <span className="font-semibold text-violet-700">{formatCurrency(interestDiff, currency)}</span> in
              total interest vs Loan {pricierInterest}.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-amber-700">Loan {cheaperMonthly}</span> is{' '}
              <span className="font-semibold text-amber-700">{formatCurrency(monthlyDiff, currency)}</span> cheaper
              per month than Loan {pricierMonthly}.
            </p>
          </div>
        </div>

        <CompareBarChart
          loanA={{ principal: loanA.amount, interest: loanA.totalInterest }}
          loanB={{ principal: loanB.amount, interest: loanB.totalInterest }}
          currency={currency}
        />
      </section>
    </div>
  );
}
