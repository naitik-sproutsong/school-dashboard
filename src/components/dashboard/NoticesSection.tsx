import { NOTICES } from '../../data/schoolData';

const COLOR_MAP = {
  rose: {
    badgeBg: 'bg-rose-50 text-rose-600',
    dateBg: 'bg-rose-50 text-rose-600',
    tagText: 'text-rose-600',
  },
  sky: {
    badgeBg: 'bg-sky-50 text-sky-600',
    dateBg: 'bg-sky-50 text-sky-600',
    tagText: 'text-sky-600',
  },
  amber: {
    badgeBg: 'bg-amber-50 text-amber-600',
    dateBg: 'bg-amber-50 text-amber-600',
    tagText: 'text-amber-600',
  },
  emerald: {
    badgeBg: 'bg-emerald-50 text-emerald-600',
    dateBg: 'bg-emerald-50 text-emerald-600',
    tagText: 'text-emerald-600',
  },
};

export default function NoticesSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <h2 className="font-bold text-sm sm:text-base text-slate-900">Recent Notices &amp; Circulars</h2>
        </div>
        <a href="#notices" className="text-xs text-rose-600 hover:text-rose-700 font-medium">
          View all notices →
        </a>
      </div>

      {/* Notice items */}
      <div className="mt-3.5 space-y-2.5">
        {NOTICES.map((notice) => {
          const style = COLOR_MAP[notice.categoryColor] || COLOR_MAP.rose;
          return (
            <div
              key={notice.id}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-white transition-all flex items-start gap-3 cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-lg ${style.dateBg} font-bold text-xs flex flex-col items-center justify-center flex-shrink-0 select-none`}
              >
                <span className="text-[9px] uppercase tracking-wider">{notice.month}</span>
                <span className="text-sm leading-none font-extrabold">{notice.day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${style.tagText}`}>
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{notice.timeAgo}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-800 truncate mt-0.5">{notice.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{notice.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
