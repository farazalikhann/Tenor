import { useState } from 'react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { useTheme } from '../context/ThemeContext';
import { FACTORY_DEFAULTS, useSettings } from '../context/SettingsContext';
import { useCalculator } from '../context/CalculatorContext';
import { CURRENCIES } from '../lib/currency';
import { LOAN_TYPES } from '../lib/loanMath';

const APP_VERSION = '1.0.0';

function SettingsSection({ title, children }) {
  return (
    <section className="tenor-card p-6 sm:p-7">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-5">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, defaults, setDefaults, resetDefaultsToFactory } = useSettings();
  const calc = useCalculator();

  const [form, setForm] = useState(defaults);

  const applyDefaults = (patch) => {
    const next = { ...form, ...patch };
    setForm(next);
    setDefaults(patch);
  };

  const handleReset = () => {
    resetDefaultsToFactory();
    setForm(FACTORY_DEFAULTS);
    calc.setLoanType(FACTORY_DEFAULTS.loanType);
    calc.setAmount(FACTORY_DEFAULTS.amount);
    calc.setRate(FACTORY_DEFAULTS.rate);
    calc.setYears(FACTORY_DEFAULTS.years);
  };

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
          Settings
        </h1>
        <p className="mt-2 text-[var(--text-subheading)] text-sm sm:text-base max-w-md mx-auto transition-colors duration-300 ease-out">
          Personalize how Tenor looks and what it starts with.
        </p>
      </header>

      <div className="space-y-6 max-w-2xl mx-auto">
        <SettingsSection title="Appearance">
          <div className="flex items-center justify-between tap-target">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                {theme === 'dark' ? 'Easy on the eyes, default look' : 'Bright background, same purple accents'}
              </p>
            </div>
            <ToggleSwitch
              checked={theme === 'dark'}
              onChange={(isDark) => setTheme(isDark ? 'dark' : 'light')}
              label="Toggle dark mode"
            />
          </div>
        </SettingsSection>

        <SettingsSection title="Currency">
          <label className="block text-sm text-slate-500 mb-2" htmlFor="settings-currency">
            Display currency
          </label>
          <select
            id="settings-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </SettingsSection>

        <SettingsSection title="Defaults">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500 mb-2">Default loan type</p>
              <div className="flex flex-wrap gap-2">
                {LOAN_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => applyDefaults({ loanType: type.id, rate: type.rate })}
                    className={`tap-target rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-out ${
                      form.loanType === type.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2" htmlFor="default-amount">
                  Loan amount
                </label>
                <input
                  id="default-amount"
                  type="number"
                  min={1000}
                  max={1000000}
                  step={1000}
                  value={form.amount}
                  onChange={(e) => applyDefaults({ amount: Number(e.target.value) })}
                  className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2" htmlFor="default-rate">
                  Interest rate
                </label>
                <input
                  id="default-rate"
                  type="number"
                  min={1}
                  max={30}
                  step={0.1}
                  value={form.rate}
                  onChange={(e) => applyDefaults({ rate: Number(e.target.value) })}
                  className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2" htmlFor="default-years">
                  Tenure (yrs)
                </label>
                <input
                  id="default-years"
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={form.years}
                  onChange={(e) => applyDefaults({ years: Number(e.target.value) })}
                  className="tap-target w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="tap-target w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-colors duration-300 ease-out hover:bg-slate-50 hover:text-slate-900"
            >
              Reset to defaults
            </button>
          </div>
        </SettingsSection>

        <SettingsSection title="About">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">App version</span>
            <span className="text-sm font-medium text-slate-900 tabular-nums">{APP_VERSION}</span>
          </div>
          <div className="mt-3 text-sm text-slate-500">
            Made with <span className="text-rose-500">♥</span> for smart borrowers
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
