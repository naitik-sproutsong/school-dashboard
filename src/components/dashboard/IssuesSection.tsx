import { useState } from 'react';
import { ISSUES, type IssueItem } from '../../data/schoolData';
import { Check, X } from 'lucide-react';

const PRIORITY_BADGES: Record<string, { bg: string; text: string }> = {
  High: { bg: 'bg-[#F43F5E] text-white', text: 'text-white' },
  Med:  { bg: 'bg-[#F59E0B] text-white', text: 'text-white' },
  Low:  { bg: 'bg-[#10B981] text-white', text: 'text-white' },
};

export default function IssuesSection() {
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);
  const [resolvedIds, setResolvedIds] = useState<number[]>([]);

  const handleResolve = (id: number) => {
    setResolvedIds((prev) => [...prev, id]);
    setSelectedIssue(null);
  };

  const activeIssues = ISSUES.filter((i) => !resolvedIds.includes(i.id));

  return (
    <>
      <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
            Action required
          </h2>
          <span className="w-5.5 h-5.5 rounded-full bg-[#F43F5E] text-white text-xs font-extrabold flex items-center justify-center font-sans shadow-xs">
            {activeIssues.length}
          </span>
        </div>

        {/* List of rounded items matching Reference 2 */}
        <div className="space-y-2.5">
          {activeIssues.map((issue) => {
            const badge = PRIORITY_BADGES[issue.priority] || PRIORITY_BADGES.Med;

            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="bg-[#F8F7F3] hover:bg-[#F2F0E8] rounded-2xl px-5 py-3 flex flex-col gap-1 transition-all cursor-pointer group border border-transparent hover:border-slate-200/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-slate-950 font-sans truncate mr-3">
                    {issue.title}
                  </span>
                  <span
                    className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full ${badge.bg} shadow-xs font-sans tracking-tight whitespace-nowrap`}
                  >
                    {issue.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{issue.meta}</p>
                <div className="flex justify-start mt-1">
                  <span className="text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">View more &rarr;</span>
                </div>
              </div>
            );
          })}

          {activeIssues.length === 0 && (
            <div className="py-6 text-center text-xs font-semibold text-emerald-600 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              ✓ All urgent actions resolved for today!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Priority dispatch queue</span>
          <a href="#issues" className="text-blue-600 hover:text-blue-700 font-bold">
            View all →
          </a>
        </div>
      </section>

      {/* Quick Action Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 transition-opacity"
            onClick={() => setSelectedIssue(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Action Required Item
              </span>
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-base">{selectedIssue.title}</h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedIssue.meta}
              </p>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>Reported: {selectedIssue.time}</span>
                <span className="font-bold text-rose-600">Priority: {selectedIssue.priority}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => handleResolve(selectedIssue.id)}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
