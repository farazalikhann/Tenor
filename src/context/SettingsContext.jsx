import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CURRENCY } from '../lib/currency';
import { LOAN_TYPES } from '../lib/loanMath';

const SettingsContext = createContext(null);
const CURRENCY_KEY = 'tenor:currency';
const DEFAULTS_KEY = 'tenor:defaults';

export const FACTORY_DEFAULTS = {
  loanType: 'home',
  amount: 300000,
  rate: LOAN_TYPES.find((t) => t.id === 'home').rate,
  years: 20,
};

function readStoredCurrency() {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;
  return window.localStorage.getItem(CURRENCY_KEY) || DEFAULT_CURRENCY;
}

function readStoredDefaults() {
  if (typeof window === 'undefined') return FACTORY_DEFAULTS;
  try {
    const raw = window.localStorage.getItem(DEFAULTS_KEY);
    if (!raw) return FACTORY_DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...FACTORY_DEFAULTS, ...parsed };
  } catch {
    return FACTORY_DEFAULTS;
  }
}

export function SettingsProvider({ children }) {
  const [currency, setCurrency] = useState(readStoredCurrency);
  const [defaults, setDefaultsState] = useState(readStoredDefaults);

  useEffect(() => {
    window.localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  useEffect(() => {
    window.localStorage.setItem(DEFAULTS_KEY, JSON.stringify(defaults));
  }, [defaults]);

  const setDefaults = (patch) => setDefaultsState((prev) => ({ ...prev, ...patch }));
  const resetDefaultsToFactory = () => setDefaultsState(FACTORY_DEFAULTS);

  return (
    <SettingsContext.Provider
      value={{ currency, setCurrency, defaults, setDefaults, resetDefaultsToFactory }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
