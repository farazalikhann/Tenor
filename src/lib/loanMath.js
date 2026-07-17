export const LOAN_TYPES = [
  { id: 'home', label: 'Home', rate: 7 },
  { id: 'car', label: 'Car', rate: 9 },
  { id: 'personal', label: 'Personal', rate: 14 },
];

/**
 * Standard amortizing loan formula.
 * M = P * r * (1+r)^n / ((1+r)^n - 1), r = monthly rate, n = months
 */
export function computeMonthlyPayment(principal, annualRatePct, years) {
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

export function computeSummary(principal, annualRatePct, years) {
  const monthly = computeMonthlyPayment(principal, annualRatePct, years);
  const totalAmount = monthly * years * 12;
  const totalInterest = totalAmount - principal;
  return { monthly, totalAmount, totalInterest };
}

/**
 * Year-by-year amortization breakdown.
 */
export function computeAmortizationSchedule(principal, annualRatePct, years) {
  const monthly = computeMonthlyPayment(principal, annualRatePct, years);
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  const rows = [];

  for (let year = 1; year <= years; year++) {
    let principalPaidThisYear = 0;
    let interestPaidThisYear = 0;

    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interestPortion = balance * r;
      let principalPortion = monthly - interestPortion;
      if (principalPortion > balance) principalPortion = balance;
      balance -= principalPortion;
      principalPaidThisYear += principalPortion;
      interestPaidThisYear += interestPortion;
    }

    rows.push({
      year,
      principalPaid: principalPaidThisYear,
      interestPaid: interestPaidThisYear,
      balance: Math.max(balance, 0),
    });

    if (balance <= 0) break;
  }

  return rows;
}
