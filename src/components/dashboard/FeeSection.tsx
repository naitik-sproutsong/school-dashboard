import { FEES } from '../../data/schoolData';

const R = 40;
const CIRC = 2 * Math.PI * R; // ≈ 251.327

export default function FeeSection() {
  // Percentages: Collected (68%), Pending (22%), Overdue (10%)
  const pCollected = FEES.collectedPct;
  const pPending = FEES.pendingPct;
  const pOverdue = FEES.overduePct;

  // Tiny gap for rounded aesthetics
  const gap = 2; // in percent
  const arcCollected = Math.max(0, ((pCollected - gap) / 100) * CIRC);
  const arcPending = Math.max(0, ((pPending - gap) / 100) * CIRC);
  const arcOverdue = Math.max(0, ((pOverdue - gap) / 100) * CIRC);

  // Dash offsets
  // Rotated -90deg so 0 is at top
  const offsetCollected = 0;
  const offsetPending = -((pCollected / 100) * CIRC);
  const offsetOverdue = -(((pCollected + pPending) / 100) * CIRC);

  return (
    <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight">Fee collection</h2>
          <p className="text-xs text-slate-400 mt-0.5">{FEES.cycle} · Academic Intake</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
          {pCollected}% Collected
        </span>
      </div>

      {/* Donut Chart Container matching Reference 1 */}
      <div className="py-2 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center" style={{ width: 170, height: 170 }}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90 overflow-visible"
            aria-label={`Fee collection: ${pCollected}% collected, ${pPending}% pending, ${pOverdue}% overdue`}
          >
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="12"
            />

            {/* Collected Segment (Green) */}
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="transparent"
              stroke="#34D399"
              strokeWidth="12"
              strokeDasharray={`${arcCollected} ${CIRC}`}
              strokeDashoffset={offsetCollected}
              strokeLinecap="round"
              className="donut-ring"
            />

            {/* Pending Segment (Amber) */}
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="transparent"
              stroke="#FBBF24"
              strokeWidth="12"
              strokeDasharray={`${arcPending} ${CIRC}`}
              strokeDashoffset={offsetPending}
              strokeLinecap="round"
              className="donut-ring"
            />

            {/* Overdue Segment (Rose) */}
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="transparent"
              stroke="#F43F5E"
              strokeWidth="12"
              strokeDasharray={`${arcOverdue} ${CIRC}`}
              strokeDashoffset={offsetOverdue}
              strokeLinecap="round"
              className="donut-ring"
            />
          </svg>

          {/* Center Text per Reference 1 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              ₹{FEES.collected}
            </span>
            <span className="text-xs font-semibold text-slate-400 mt-0.5">
              of ₹{FEES.totalTarget}
            </span>
          </div>
        </div>

        {/* Legend Row matching Reference 1 */}
        <div className="mt-5 flex items-center justify-center gap-5 sm:gap-6 text-xs select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
            <span className="text-slate-600 font-bold">Collected</span>
            <span className="text-slate-800 font-extrabold">{pCollected}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
            <span className="text-slate-600 font-bold">Pending</span>
            <span className="text-slate-800 font-extrabold">{pPending}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
            <span className="text-slate-600 font-bold">Overdue</span>
            <span className="text-slate-800 font-extrabold">{pOverdue}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Cycle: <strong className="text-slate-700">Autumn Term 2026</strong></span>
        <a href="#fees" className="text-blue-600 hover:text-blue-700 font-bold text-xs">
          View more →
        </a>
      </div>
    </section>
  );
}
