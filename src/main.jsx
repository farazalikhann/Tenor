import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { CalculatorProvider } from './context/CalculatorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <CalculatorProvider>
          <App />
        </CalculatorProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
