import { DEFAULT_CURRENCY, getCurrency } from './currency';

const formatterCache = new Map();

function getFormatter(currencyCode, maximumFractionDigits) {
  const key = `${currencyCode}:${maximumFractionDigits}`;
  if (!formatterCache.has(key)) {
    const { code, locale } = getCurrency(currencyCode);
    formatterCache.set(
      key,
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: code,
        maximumFractionDigits,
      })
    );
  }
  return formatterCache.get(key);
}

export function formatCurrency(value, currencyCode = DEFAULT_CURRENCY) {
  return getFormatter(currencyCode, 0).format(Math.round(value));
}

export function formatCurrencyPrecise(value, currencyCode = DEFAULT_CURRENCY) {
  return getFormatter(currencyCode, 2).format(value);
}
