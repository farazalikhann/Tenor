import { formatCurrency } from '../lib/format';

export function AmortizationTable({ rows, currency }) {
  return (
    <div className="fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">Amortization schedule</h2>
        <span className="text-xs text-slate-500">{rows.length} year{rows.length === 1 ? '' : 's'}</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-500 border-b border-slate-200">
                Year
              </th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 border-b border-slate-200">
                Principal Paid
              </th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 border-b border-slate-200">
                Interest Paid
              </th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 border-b border-slate-200">
                Balance Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.year}
                className="odd:bg-white even:bg-[#F9FAFB] hover:bg-violet-50 transition-colors duration-200 ease-out"
              >
                <td className="px-4 py-2.5 text-left font-semibold text-slate-700 tabular-nums">
                  {row.year}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-600 tabular-nums">
                  {formatCurrency(row.principalPaid, currency)}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-600 tabular-nums">
                  {formatCurrency(row.interestPaid, currency)}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-slate-900 tabular-nums">
                  {formatCurrency(row.balance, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
