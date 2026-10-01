import { STAFF } from '../../data/schoolData';

const TILES = [
  { label: 'Total', value: STAFF.total, color: 'text-slate-800' },
  { label: 'Permanent', value: STAFF.permanent, color: 'text-emerald-700' },
  { label: 'Visiting', value: STAFF.visiting, color: 'text-slate-700' },
  { label: 'New Hires', value: STAFF.newHires, color: 'text-sky-700' },
];

export default function StaffSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="font-bold text-sm text-slate-900">Staff Overview</h2>
        </div>
        <a href="#staff" className="text-[11px] font-medium text-emerald-600 hover:underline">Directory →</a>
      </div>

      {/* 4 tiles + open posts */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4">
        {TILES.map((t) => (
          <div key={t.label} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 font-medium block mb-0.5">{t.label}</span>
            <span className={`text-xl font-bold font-metric ${t.color}`}>{t.value}</span>
          </div>
        ))}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] text-amber-800 font-medium block mb-0.5">Open Posts</span>
          <span className="text-xl font-bold text-amber-700 font-metric">{STAFF.openPosts}</span>
        </div>
      </div>

      {/* Urgent needs */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-slate-400 font-medium">Urgent:</span>
        {STAFF.urgentNeeds.map((need) => (
          <span
            key={need}
            className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-amber-200 bg-amber-50 text-amber-800"
          >
            {need}
          </span>
        ))}
      </div>
    </section>
  );
}
