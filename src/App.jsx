import { useMemo, useState } from 'react';
import { LoanTypePills } from './components/LoanTypePills';
import { SliderField } from './components/SliderField';
import { ResultCard } from './components/ResultCard';
import { PayoffPieChart } from './components/PayoffPieChart';
import { AmortizationTable } from './components/AmortizationTable';
import { CurrencySelect } from './components/CurrencySelect';
import { LOAN_TYPES, computeAmortizationSchedule, computeSummary } from './lib/loanMath';
import { DEFAULT_CURRENCY, getCurrency } from './lib/currency';

function App() {
  const [loanType, setLoanType] = useState('home');
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(LOAN_TYPES.find((t) => t.id === 'home').rate);
  const [years, setYears] = useState(20);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const currencySymbol = getCurrency(currency).symbol;

  const handleLoanTypeChange = (id) => {
    const type = LOAN_TYPES.find((t) => t.id === id);
    setLoanType(id);
    setRate(type.rate);
  };

  const { monthly, totalInterest, totalAmount } = useMemo(
    () => computeSummary(amount, rate, years),
    [amount, rate, years]
  );

  const schedule = useMemo(
    () => computeAmortizationSchedule(amount, rate, years),
    [amount, rate, years]
  );

  return (
    <div className="relative min-h-screen">
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob--1" />
        <div className="mesh-blob mesh-blob--2" />
        <div className="mesh-blob mesh-blob--3" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-6 mb-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.6)]">
                %
              </span>
              <span className="text-lg font-semibold text-white tracking-tight">Tenor</span>
            </div>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Know your loan, to the last unit.
            </h1>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Adjust the sliders and watch your payment, interest, and payoff timeline update instantly.
            </p>
          </div>
          <LoanTypePills activeType={loanType} onChange={handleLoanTypeChange} />
        </header>

        {/* Result cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <ResultCard
            label="Monthly Payment"
            value={monthly}
            currency={currency}
            emphasis
            accent="#7C3AED"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-3-5.5 1.5-1a2.5 2.5 0 0 1 3 0l1.5 1M8 15.5l1.5 1a2.5 2.5 0 0 0 3 0l1.5-1M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" />
              </svg>
            }
          />
          <ResultCard
            label="Total Interest"
            value={totalInterest}
            currency={currency}
            accent="#F59E0B"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17 9 11l4 4 8-8M14 7h6v6" />
              </svg>
            }
          />
          <ResultCard
            label="Total Amount"
            value={totalAmount}
            currency={currency}
            accent="#0F172A"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6M4 6l2-3h12l2 3M9 11h6" />
              </svg>
            }
          />
        </section>

        {/* Inputs + Pie chart */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.35)] p-6 sm:p-7">
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
                label="Loan Tenure"
                value={years}
                min={1}
                max={30}
                step={1}
                suffix=" yr"
                onChange={setYears}
                formatValue={(v) => Math.round(v)}
              />
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.35)] p-6 sm:p-7">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Principal vs. interest</h2>
            <PayoffPieChart
              principal={amount}
              totalInterest={totalInterest}
              totalAmount={totalAmount}
              currency={currency}
            />
          </div>
        </section>

        {/* Amortization table */}
        <section className="rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.35)] p-6 sm:p-7">
          <AmortizationTable key={`${loanType}-${years}`} rows={schedule} currency={currency} />
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Estimates only — actual loan terms vary by lender.
        </footer>
      </div>
    </div>
  );
}

export default App;
