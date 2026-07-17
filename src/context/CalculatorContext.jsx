import { createContext, useContext, useMemo, useState } from 'react';
import { useSettings } from './SettingsContext';
import { LOAN_TYPES, computeAmortizationSchedule, computeSummary } from '../lib/loanMath';

const CalculatorContext = createContext(null);

export function CalculatorProvider({ children }) {
  const { defaults } = useSettings();
  const [loanType, setLoanType] = useState(defaults.loanType);
  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [years, setYears] = useState(defaults.years);

  const handleLoanTypeChange = (id) => {
    const type = LOAN_TYPES.find((t) => t.id === id);
    setLoanType(id);
    setRate(type.rate);
  };

  const resetToDefaults = () => {
    setLoanType(defaults.loanType);
    setAmount(defaults.amount);
    setRate(defaults.rate);
    setYears(defaults.years);
  };

  const summary = useMemo(() => computeSummary(amount, rate, years), [amount, rate, years]);
  const schedule = useMemo(
    () => computeAmortizationSchedule(amount, rate, years),
    [amount, rate, years]
  );

  return (
    <CalculatorContext.Provider
      value={{
        loanType,
        amount,
        rate,
        years,
        setAmount,
        setRate,
        setYears,
        setLoanType: handleLoanTypeChange,
        resetToDefaults,
        ...summary,
        schedule,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error('useCalculator must be used within a CalculatorProvider');
  return ctx;
}
