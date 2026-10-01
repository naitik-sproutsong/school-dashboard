import { useState } from 'react';
import { ATTENDANCE_TRENDS } from '../../data/schoolData';

// Map data values (90–98 range) to SVG Y coordinates (chart area: y=20..160)
function valueToY(v: number, min = 90, max = 98, yTop = 15, yBot = 155): number {
  return yBot - ((v - min) / (max - min)) * (yBot - yTop);
}

const CHART_X = [60, 148, 236, 324, 412, 500];

function buildPath(values: number[]): string {
  const pts = values.map((v, i) => [CHART_X[i], valueToY(v)] as [number, number]);
  // Smooth curve via cubic bezier
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const cpx1 = px + (cx - px) / 2;
    const cpx2 = cx - (cx - px) / 2;
    d += ` C ${cpx1} ${py}, ${cpx2} ${cy}, ${cx} ${cy}`;
  }
  return d;
}

function buildAreaPath(values: number[]): string {
  const line = buildPath(values);
  const lastX = CHART_X[values.length - 1];
  const firstX = CHART_X[0];
  return `${line} L ${lastX} 160 L ${firstX} 160 Z`;
}

export default function AttendanceSection() {
  const [cohort, setCohort] = useState<'students' | 'staff'>('students');
  const data = ATTENDANCE_TRENDS[cohort];

  const accentColor = cohort === 'students' ? '#0284c7' : '#059669';
  const accentLight = cohort === 'students' ? '#bae6fd' : '#a7f3d0';
  const gradientId = cohort === 'students' ? 'attGradBlue' : 'attGradGreen';

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-sm text-slate-900">Attendance Trends</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-semibold">AY 2026-27</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">6-month historical · {data.months[0]}–{data.months[5]}</p>
        </div>
        {/* Toggle */}
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 text-xs font-medium self-start sm:self-auto flex-shrink-0">
          <button
            onClick={() => setCohort('students')}
            className={`px-3 py-1 rounded-md transition-all text-xs ${
              cohort === 'students'
                ? 'bg-white shadow-sm font-semibold text-slate-800'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCohort('staff')}
            className={`px-3 py-1 rounded-md transition-all text-xs ${
              cohort === 'staff'
                ? 'bg-white shadow-sm font-semibold text-slate-800'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Staff
          </button>
        </div>
      </div>

      {/* 3 sub-metric tiles */}
      <div className="grid grid-cols-3 gap-3 px-5 py-3">
        <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3">
          <span className="text-[10px] text-sky-700 font-semibold block">Avg Rate</span>
          <span className="text-lg font-bold text-sky-900 font-metric">{data.avgRate}</span>
        </div>
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
          <span className="text-[10px] text-emerald-700 font-semibold block">Peak Month</span>
          <span className="text-base font-bold text-emerald-900 font-metric truncate">{data.highestMonth}</span>
        </div>
        <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3">
          <span className="text-[10px] text-amber-700 font-semibold block">Peak Day</span>
          <span className="text-base font-bold text-amber-900 font-metric truncate">{data.peakDay}</span>
        </div>
      </div>

      {/* SVG Chart — full width, prominent */}
      <div className="px-3 pb-4">
        <div className="relative w-full" style={{ height: '200px' }}>
          <svg
            viewBox="0 0 560 175"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-label={`Attendance trend chart for ${cohort}`}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal gridlines */}
            {[15, 50, 85, 120, 155].map((y) => (
              <line key={y} x1="50" x2="540" y1={y} y2={y}
                stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 4" />
            ))}

            {/* Y-axis labels */}
            {[98, 96, 94, 92, 90].map((v, i) => (
              <text key={v} x="44" y={[15, 50, 85, 120, 155][i] + 4}
                textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="Inter">
                {v}%
              </text>
            ))}

            {/* Area fill */}
            <path
              d={buildAreaPath(data.values)}
              fill={`url(#${gradientId})`}
            />

            {/* Line */}
            <path
              d={buildPath(data.values)}
              fill="none"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.values.map((v, i) => {
              const x = CHART_X[i];
              const y = valueToY(v);
              const isHighest = v === Math.max(...data.values);
              const isCurrent = i === data.values.length - 1;
              return (
                <g key={i} className="chart-dot" transform={`translate(${x},${y})`}>
                  <circle
                    r={isHighest || isCurrent ? 5 : 4}
                    fill={isHighest ? '#f59e0b' : accentColor}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    y="-9"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight={isHighest || isCurrent ? '700' : '600'}
                    fill={isHighest ? '#b45309' : '#475569'}
                    fontFamily="Inter"
                  >
                    {v}%
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {data.months.map((m, i) => (
              <text
                key={m}
                x={CHART_X[i]}
                y="172"
                textAnchor="middle"
                fontSize="9.5"
                fill={i === data.months.length - 1 ? accentColor : '#94a3b8'}
                fontWeight={i === data.months.length - 1 ? '700' : '500'}
                fontFamily="Inter"
              >
                {m}{i === data.months.length - 1 ? ' ▴' : ''}
              </text>
            ))}

            {/* Benchmark line at 95% */}
            <line
              x1="50" x2="540"
              y1={valueToY(95)}
              y2={valueToY(95)}
              stroke={accentLight}
              strokeWidth="1"
              strokeDasharray="5 3"
            />
            <text x="544" y={valueToY(95) + 4} fontSize="8" fill={accentColor} fontFamily="Inter">
              95%
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: accentColor }} />
              Monthly Rate
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: accentLight }} />
              Target 95%
            </span>
          </div>
          <a href="#attendance" className="text-sky-600 font-medium hover:underline text-[11px]">
            Full roster →
          </a>
        </div>
      </div>
    </section>
  );
}
