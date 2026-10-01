import { GRADES, GRADES_SUMMARY } from '../../data/schoolData';

const SECTION_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
];

export default function ClassesSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <h2 className="font-bold text-sm text-slate-900">Classes & Grades</h2>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-600">12 Grades</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-600">42 Sections</span>
          <a href="#classes" className="text-indigo-600 font-medium hover:text-indigo-700 text-[11px]">All →</a>
        </div>
      </div>

      {/* Grade sub-cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {GRADES.map((g) => (
          <div
            key={g.grade}
            className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-800">{g.grade}</span>
              <span className="text-[10px] font-semibold text-slate-500">{g.students}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {g.sections.map((s, i) => (
                <span
                  key={s}
                  className={`w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center ${
                    SECTION_COLORS[i % SECTION_COLORS.length]
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${g.capacity}%` }}
              />
            </div>
          </div>
        ))}

        {/* G6–12 summary tile */}
        <div className="border border-dashed border-indigo-200 rounded-xl p-3 bg-indigo-50/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-900">{GRADES_SUMMARY.label}</span>
            <span className="block text-base font-bold text-indigo-700 font-metric mt-0.5">{GRADES_SUMMARY.total}</span>
            <p className="text-[10px] text-indigo-600/80 mt-1">{GRADES_SUMMARY.sections} sections · {GRADES_SUMMARY.wings}</p>
          </div>
          <a href="#classes" className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 mt-2 block">
            View roster →
          </a>
        </div>
      </div>
    </section>
  );
}
