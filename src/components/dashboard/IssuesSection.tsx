import { ISSUES } from '../../data/schoolData';

const BADGE_STYLES = {
  urgent: 'bg-rose-100 text-rose-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-sky-100 text-sky-800',
};

const CARD_STYLES = {
  urgent: 'border-rose-200 bg-rose-50/30',
  warning: 'border-amber-200 bg-amber-50/30',
  info: 'border-slate-200 bg-slate-50/50',
};

export default function IssuesSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <h2 className="font-bold text-sm sm:text-base text-slate-900">Issues &amp; Action Required</h2>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            {ISSUES.length} Pending
          </span>
        </div>
        <a href="#issues" className="text-xs text-amber-700 hover:text-amber-800 font-medium">
          View all →
        </a>
      </div>

      {/* Issues list */}
      <div className="mt-3.5 space-y-2.5">
        {ISSUES.map((issue) => (
          <div
            key={issue.id}
            className={`p-3 rounded-xl border ${CARD_STYLES[issue.tag]} hover:shadow-xs transition-shadow`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] tracking-wide ${BADGE_STYLES[issue.tag]}`}>
                    {issue.priority}
                  </span>
                  <h3 className="text-xs font-bold text-slate-800 truncate">{issue.title}</h3>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{issue.meta}</p>
                <span className="text-[10px] text-slate-400 block">{issue.time}</span>
              </div>
              <button
                type="button"
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors shadow-xs flex-shrink-0 cursor-pointer ${
                  issue.actionVariant === 'danger'
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {issue.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
