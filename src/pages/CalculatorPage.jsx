import { LoanTypePills } from '../components/LoanTypePills';
import { SliderField } from '../components/SliderField';
import { ResultCard } from '../components/ResultCard';
import { PayoffPieChart } from '../components/PayoffPieChart';
import { AmortizationTable } from '../components/AmortizationTable';
import { DownloadPdfButton } from '../components/DownloadPdfButton';
import { useCalculator } from '../context/CalculatorContext';
import { useSettings } from '../context/SettingsContext';
import { LOAN_TYPES } from '../lib/loanMath';
import { getCurrency } from '../lib/currency';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function CalculatorPage() {
  useDocumentTitle('Tenor – Free Loan EMI Calculator & Loan Comparison Tool');

  const {
    loanType,
    amount,
    rate,
    years,
    setAmount,
    setRate,
    setYears,
    setLoanType,
    monthly,
    totalInterest,
    totalAmount,
    schedule,
  } = useCalculator();
  const { currency } = useSettings();
  const currencySymbol = getCurrency(currency).symbol;
  const loanTypeLabel = LOAN_TYPES.find((t) => t.id === loanType).label;

  return (
    <div>
      <header className="flex flex-col items-center text-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight text-balance transition-colors duration-300 ease-out">
            Know your loan, to the last unit.
          </h1>
          <p className="mt-2 text-[var(--text-subheading)] text-sm sm:text-base max-w-md mx-auto transition-colors duration-300 ease-out">
            Adjust the sliders and watch your payment, interest, and payoff timeline update instantly.
          </p>
        </div>
        <LoanTypePills activeType={loanType} onChange={setLoanType} />
      </header>

      {/* Result cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard
          label="Monthly Payment"
          value={monthly}
          currency={currency}
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
          accent="#16A34A"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6M4 6l2-3h12l2 3M9 11h6" />
            </svg>
          }
        />
      </section>

      {/* Inputs + Pie chart */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 tenor-card p-6 sm:p-7">
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

        <div className="lg:col-span-2 tenor-card p-6 sm:p-7">
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
      <section className="tenor-card p-6 sm:p-7">
        <AmortizationTable key={`${loanType}-${years}`} rows={schedule} currency={currency} />
        <DownloadPdfButton
          loanTypeLabel={loanTypeLabel}
          amount={amount}
          rate={rate}
          years={years}
          monthly={monthly}
          totalInterest={totalInterest}
          totalAmount={totalAmount}
          schedule={schedule}
          currency={currency}
        />
      </section>
    </div>
  );
}
