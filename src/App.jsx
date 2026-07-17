import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Nav } from './components/nav/Nav';
import { CurrencySelect } from './components/CurrencySelect';
import { Footer } from './components/Footer';
import { CalculatorPage } from './pages/CalculatorPage';
import { ComparePage } from './pages/ComparePage';
import { PrepayPage } from './pages/PrepayPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import { useSettings } from './context/SettingsContext';

const TAB_PAGES = {
  calculator: CalculatorPage,
  compare: ComparePage,
  prepay: PrepayPage,
  settings: SettingsPage,
};

function CalculatorShell({ activeTab }) {
  const ActivePage = TAB_PAGES[activeTab];
  return (
    <div key={activeTab} className="tab-fade">
      <ActivePage />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const { currency, setCurrency } = useSettings();

  return (
    <div className="relative min-h-screen">
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob--1" />
        <div className="mesh-blob mesh-blob--2" />
        <div className="mesh-blob mesh-blob--3" />
      </div>

      <Nav activeTab={activeTab} onChange={setActiveTab} />

      <div className="relative z-10 sm:pl-56">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-14">
          <div className="flex items-center justify-between mb-8 sm:justify-end">
            <div className="flex items-center gap-2.5 sm:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 text-white font-bold text-sm shadow-[0_4px_14px_-2px_rgba(124,58,237,0.6)]">
                %
              </span>
              <span className="text-lg font-semibold text-[var(--text-heading)] tracking-tight transition-colors duration-300 ease-out">
                Tenor
              </span>
            </div>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>

          <Routes>
            <Route path="/" element={<CalculatorShell activeTab={activeTab} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
