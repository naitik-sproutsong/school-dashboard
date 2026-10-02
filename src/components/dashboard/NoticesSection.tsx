import { useState } from 'react';
import { NOTICES, type NoticeItem } from '../../data/schoolData';
import { Megaphone, X } from 'lucide-react';

const ICON_BG: Record<string, string> = {
  sky:     'bg-[#3B82F6]',
  emerald: 'bg-[#10B981]',
  amber:   'bg-[#F59E0B]',
  rose:    'bg-[#F43F5E]',
};

export default function NoticesSection() {
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  return (
    <>
      <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight">Notices</h2>
          <a
            href="#notices"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            All notices →
          </a>
        </div>

        {/* Notices vertical list matching Reference 2 */}
        <div className="space-y-3.5">
          {NOTICES.slice(0, 3).map((notice) => {
            const bg = ICON_BG[notice.categoryColor] || ICON_BG.sky;

            return (
              <div
                key={notice.id}
                onClick={() => setActiveNotice(notice)}
                className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group select-none"
              >
                {/* Circular megaphone icon badge */}
                <div
                  className={`w-11 h-11 rounded-full ${bg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  <Megaphone className="w-5 h-5 -rotate-12" />
                </div>

                {/* Title & Date */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate font-sans">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans truncate">
                    {notice.body}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[11px] font-semibold text-slate-400">{notice.dateStr}</span>
                    <span className="text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">View more &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 transition-opacity"
            onClick={() => setActiveNotice(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Circular
              </span>
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  {activeNotice.category}
                </span>
                <span className="text-xs text-slate-400">{activeNotice.dateStr}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">{activeNotice.title}</h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {activeNotice.body}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
