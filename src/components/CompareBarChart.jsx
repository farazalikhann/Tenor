import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../lib/format';

const COLORS = { principal: '#7C3AED', interest: '#F59E0B' };

function CustomTooltip({ active, payload, label, currency }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-slate-900 mb-1">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="tabular-nums text-slate-600" style={{ color: item.color }}>
          {item.name}: {formatCurrency(item.value, currency)}
        </p>
      ))}
    </div>
  );
}

export function CompareBarChart({ loanA, loanB, currency }) {
  const data = [
    { name: 'Loan A', principal: Math.max(loanA.principal, 0), interest: Math.max(loanA.interest, 0) },
    { name: 'Loan B', principal: Math.max(loanB.principal, 0), interest: Math.max(loanB.interest, 0) },
  ];

  return (
    <div className="h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 13 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v, currency)}
            width={72}
          />
          <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Bar dataKey="principal" name="Principal" stackId="cost" fill={COLORS.principal} radius={[0, 0, 0, 0]} animationDuration={600} />
          <Bar dataKey="interest" name="Interest" stackId="cost" fill={COLORS.interest} radius={[6, 6, 0, 0]} animationDuration={600} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
