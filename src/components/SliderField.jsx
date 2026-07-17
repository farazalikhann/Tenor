export function SliderField({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
  formatValue,
}) {
  const fillPct = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : value;

  const handleNumberChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '') return;
    const num = Math.min(Math.max(parseFloat(raw), min), max);
    onChange(num);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <div className="tap-target flex items-center rounded-lg border border-slate-200 bg-slate-50 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all duration-300 ease-out">
          {prefix && (
            <span className="pl-2.5 text-sm text-slate-400 select-none">{prefix}</span>
          )}
          <input
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleNumberChange}
            className="w-20 bg-transparent py-1.5 px-1.5 text-right text-sm font-semibold text-slate-900 tabular-nums outline-none"
            aria-label={label}
          />
          {suffix && (
            <span className="pr-2.5 text-sm text-slate-400 select-none">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        className="tenor-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ '--fill': `${fillPct}%` }}
      />
      <div className="mt-1.5 flex justify-between text-xs text-slate-500 tabular-nums">
        <span>
          {prefix}
          {min.toLocaleString()}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString()}
          {suffix}
        </span>
      </div>
    </div>
  );
}
