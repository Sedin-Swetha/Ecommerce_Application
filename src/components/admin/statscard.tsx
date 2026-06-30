interface Props {
  label: string;
  value: string | number;
  icon: string;
  growth?: number;        
  sub?: string;
  bg: string;
  text: string;
  border: string;
}
export default function StatsCard({ label, value, icon, growth, sub, bg, text, border }: Props) {
  const isPositive = growth !== undefined && growth >= 0;
  const isNeutral  = growth === undefined;
  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {label}
          </p>
          <p className={`mt-2 text-2xl font-bold ${text}`}>{value}</p>
          {!isNeutral && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                isPositive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
              }`}>
                {isPositive ? "↑" : "↓"} {Math.abs(growth!)}%
              </span>
              <span className="text-[11px] text-gray-400">vs last month</span>
            </div>
          )}
          {sub && !growth && (
            <p className="mt-1 text-xs text-gray-400">{sub}</p>
          )}
        </div>
        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${bg} text-2xl border ${border}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
