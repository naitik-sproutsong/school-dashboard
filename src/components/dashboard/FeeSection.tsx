import { FEES } from '../../data/schoolData';

// SVG donut: r=42, circumference = 2π*42 ≈ 263.9
const R = 42;
const CIRC = 2 * Math.PI * R;

function DonutChart({ pct }: { pct: number }) {
  const collected = (pct / 100) * CIRC;
  const pending = CIRC - collected;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 148, height: 148 }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: 'rotate(-90deg)' }}
        aria-label={`Fee collection: ${pct}% collected`}
      >
        {/* Track */}
        <circle cx="50" cy="50" r={R} fill="transparent" stroke="#f1f5f9" strokeWidth="13" />
        {/* Pending arc (amber) */}
        <circle
          cx="50" cy="50" r={R}
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth="13"
          strokeDasharray={`${pending} ${CIRC}`}
          strokeDashoffset={-collected}
          strokeLinecap="round"
          className="donut-ring"
        />
        {/* Collected arc (teal) */}
        <circle
          cx="50" cy="50" r={R}
          fill="transparent"
          stroke="#0d9488"
          strokeWidth="13"
          strokeDasharray={`${collected} ${CIRC}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="donut-ring"
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-slate-800 font-metric leading-none">{pct}%</span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">Realized</span>
      </div>
    </div>
  );
}

export default function FeeSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <h2 className="font-bold text-sm text-slate-900">Fee Collection</h2>
        </div>
        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{FEES.cycle}</span>
      </div>

      {/* Donut + stats — chart takes centre stage */}
      <div className="flex items-center gap-5 mt-4">
        {/* Donut — prominent */}
        <div className="flex-shrink-0">
          <DonutChart pct={FEES.collectionRate} />
        </div>

        {/* Metric blocks */}
        <div className="flex-1 space-y-2.5">
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-semibold text-teal-700 block">Collected</span>
              <span className="text-lg font-bold text-teal-900 font-metric">₹{FEES.collected}</span>
            </div>
            <span className="text-xs font-bold text-teal-600">{FEES.collectionRate}%</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-semibold text-amber-700 block">Pending</span>
              <span className="text-lg font-bold text-amber-900 font-metric">₹{FEES.pending}</span>
            </div>
            <span className="text-xs font-bold text-amber-600">{FEES.pendingRate}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
        <span>Target: <strong className="text-slate-700">₹{FEES.target}</strong></span>
        <a href="#fees" className="text-teal-600 font-semibold hover:underline text-[11px]">Reconcile →</a>
      </div>
    </section>
  );
}
