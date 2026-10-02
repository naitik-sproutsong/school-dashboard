import { STAFF } from '../../data/schoolData';

export default function StaffSection() {
  return (
    <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight">Staff Overview</h2>
          <p className="text-xs text-slate-400 mt-0.5">Workforce metrics &amp; hiring requirements</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#staff"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View staff →
          </a>
        </div>
      </div>

      {/* Workforce Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-50 border border-slate-100 rounded-[18px] p-4 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-1">{STAFF.total}</span>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-[18px] p-4 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Permanent</span>
          <span className="text-2xl font-extrabold text-emerald-900 mt-1">{STAFF.permanent}</span>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 rounded-[18px] p-4 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Visiting</span>
          <span className="text-2xl font-extrabold text-blue-900 mt-1">{STAFF.visiting}</span>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 rounded-[18px] p-4 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">New Hires</span>
          <span className="text-2xl font-extrabold text-amber-900 mt-1">{STAFF.newHires}</span>
        </div>
        <div className="bg-rose-50/50 border border-rose-100 rounded-[18px] p-4 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">Open Posts</span>
          <span className="text-2xl font-extrabold text-rose-900 mt-1">{STAFF.openPosts}</span>
        </div>
      </div>

      {/* Urgent faculty hiring banner */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Urgent Requirements:</span>
          <div className="flex flex-wrap gap-1.5">
            {STAFF.urgentNeeds.map((need) => (
              <span
                key={need}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-100"
              >
                {need}
              </span>
            ))}
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">AY 2026-27 Recruitment</span>
      </div>
    </section>
  );
}
