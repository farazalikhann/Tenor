import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency } from './format';

export function generateLoanPdf({
  loanTypeLabel,
  amount,
  rate,
  years,
  monthly,
  totalInterest,
  totalAmount,
  schedule,
  currency,
}) {
  const doc = new jsPDF();
  const marginX = 14;
  let y = 20;

  doc.setFontSize(20);
  doc.setTextColor(124, 58, 237);
  doc.text('Tenor — Loan Summary', marginX, y);

  y += 7;
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, marginX, y);

  y += 10;
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Loan Details', marginX, y);
  y += 3;
  doc.setDrawColor(226, 232, 240);
  doc.line(marginX, y, 196, y);
  y += 7;

  const details = [
    ['Loan Type', loanTypeLabel],
    ['Loan Amount', formatCurrency(amount, currency)],
    ['Interest Rate', `${rate.toFixed(1)}% per year`],
    ['Loan Tenure', `${years} year${years === 1 ? '' : 's'}`],
    ['Monthly Payment', formatCurrency(monthly, currency)],
    ['Total Interest', formatCurrency(totalInterest, currency)],
    ['Total Amount Payable', formatCurrency(totalAmount, currency)],
  ];

  doc.setFontSize(10.5);
  details.forEach(([label, value]) => {
    doc.setTextColor(100, 116, 139);
    doc.text(`${label}`, marginX, y);
    doc.setTextColor(15, 23, 42);
    doc.text(String(value), marginX + 65, y);
    y += 7;
  });

  y += 4;
  autoTable(doc, {
    startY: y,
    head: [['Year', 'Principal Paid', 'Interest Paid', 'Balance Remaining']],
    body: schedule.map((row) => [
      row.year,
      formatCurrency(row.principalPaid, currency),
      formatCurrency(row.interestPaid, currency),
      formatCurrency(row.balance, currency),
    ]),
    headStyles: { fillColor: [124, 58, 237], textColor: 255, fontSize: 9.5 },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [249, 250, 251] },
    margin: { left: marginX, right: marginX },
  });

  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : y;
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Estimates only — actual loan terms vary by lender.',
    marginX,
    Math.min(finalY + 10, doc.internal.pageSize.getHeight() - 10)
  );

  doc.save('tenor-loan-summary.pdf');
}
