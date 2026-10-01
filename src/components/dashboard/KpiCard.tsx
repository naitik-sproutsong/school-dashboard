import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  badge?: string;
  badgeVariant?: 'success' | 'info' | 'warning' | 'violet';
  sub?: ReactNode;
  barPct?: number;
  barColor?: string;
  icon: ReactNode;
  iconBg?: string;
}

const BADGE_STYLES: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-600',
  info:    'bg-sky-50 text-sky-700',
  warning: 'bg-amber-50 text-amber-700',
  violet:  'bg-violet-50 text-violet-700',
};

export default function KpiCard({
  label, value, badge, badgeVariant = 'success',
  sub, barPct, barColor = 'bg-sky-500', icon, iconBg = 'bg-sky-50 text-sky-600',
}: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <span className={`p-1.5 rounded-lg text-sm ${iconBg}`}>{icon}</span>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-slate-900 tracking-tight font-metric">{value}</span>
        {badge && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${BADGE_STYLES[badgeVariant]}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Sub content */}
      {sub && <div className="text-xs text-slate-500 flex justify-between items-center mb-1.5">{sub}</div>}

      {/* Progress bar */}
      {barPct !== undefined && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className={`${barColor} h-full rounded-full transition-all`}
            style={{ width: `${barPct}%` }}
          />
        </div>
      )}
    </div>
  );
}
