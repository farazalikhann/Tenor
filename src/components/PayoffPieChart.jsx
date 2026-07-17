import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../lib/format';

const COLORS = {
  principal: '#7C3AED',
  interest: '#F59E0B',
};

function CustomTooltip({ active, payload, currency }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-slate-900">{item.name}</p>
      <p className="tabular-nums text-slate-600">{formatCurrency(item.value, currency)}</p>
    </div>
  );
}

export function PayoffPieChart({ principal, totalInterest, totalAmount, currency }) {
  const data = [
    { name: 'Principal', value: Math.max(principal, 0), color: COLORS.principal },
    { name: 'Total Interest', value: Math.max(totalInterest, 0), color: COLORS.interest },
  ];

  return (
    <div>
      <div className="relative h-64 sm:h-72 max-w-[280px] sm:max-w-none mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={3}
              cornerRadius={6}
              stroke="#ffffff"
              strokeWidth={2}
              animationDuration={700}
              animationEasing="ease-out"
              isAnimationActive
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip currency={currency} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-slate-500">Total Payable</span>
          <span className="tabular-nums text-lg sm:text-xl font-bold text-slate-900">
            {formatCurrency(totalAmount, currency)}
          </span>
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-6">
        {data.map((entry) => {
          const pct = totalAmount > 0 ? (entry.value / totalAmount) * 100 : 0;
          return (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="text-left">
                <p className="text-xs text-slate-500">
                  {entry.name} · {pct.toFixed(0)}%
                </p>
                <p className="text-sm font-semibold text-slate-900 tabular-nums">
                  {formatCurrency(entry.value, currency)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
