import { X, CalendarDays, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { CALENDAR_EVENTS, OCTOBER_2026 } from '../../data/schoolData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-900',  dot: 'bg-amber-500'  },
  sky:    { bg: 'bg-blue-100',   text: 'text-blue-900',   dot: 'bg-blue-500'   },
  violet: { bg: 'bg-violet-100', text: 'text-violet-900', dot: 'bg-violet-500' },
  rose:   { bg: 'bg-rose-100',   text: 'text-rose-900',   dot: 'bg-rose-500'   },
};

const BADGE_COLOR: Record<string, string> = {
  amber:  'bg-amber-50 text-amber-800 border border-amber-200',
  sky:    'bg-blue-50 text-blue-800 border border-blue-200',
  violet: 'bg-violet-50 text-violet-800 border border-violet-200',
  rose:   'bg-rose-50 text-rose-800 border border-rose-200',
};

export default function CalendarDrawer({ isOpen, onClose }: Props) {
  const { startDayIndex, totalDays, prevMonthDays, today, eventDays, holidayRange } = OCTOBER_2026;

  // Build the day grid: leading prev-month days + oct days + trailing blanks
  const leadingBlanks = startDayIndex; // Oct 1 = Thursday = index 4
  const cells: Array<{ day: number; type: 'prev' | 'current' | 'next' }> = [];
  prevMonthDays.forEach((d) => cells.push({ day: d, type: 'prev' }));
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, type: 'current' });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - totalDays - leadingBlanks + 1, type: 'next' });

  return (
    <>
      {/* Clean overlay WITHOUT backdrop blur per approved plan */}
      <div
        className={`fixed inset-0 bg-slate-900/25 z-50 drawer-overlay ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-84 sm:w-96 bg-white shadow-2xl border-l border-slate-200/80 z-50 drawer-slide flex flex-col font-sans ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Academic Calendar"
      >
        {/* Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-slate-100 bg-[#F8F7F3] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Academic Calendar</h3>
              <p className="text-[11px] text-slate-500 font-semibold">October 2026 · Term 1</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
            aria-label="Close calendar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Month grid card */}
          <div className="bg-[#F8F7F3] rounded-2xl border border-slate-200/70 p-4">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                October 2026
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1.5 text-center">
              {cells.map((cell, i) => {
                if (cell.type !== 'current') {
                  return (
                    <span key={i} className="w-7 h-7 mx-auto flex items-center justify-center text-[11px] text-slate-300">
                      {cell.day}
                    </span>
                  );
                }
                const d = cell.day;
                const isToday = d === today;
                const eventColor = eventDays[d];
                const isHoliday = holidayRange.includes(d) && !eventColor;
                const colors = eventColor ? COLOR_MAP[eventColor] : null;

                return (
                  <span
                    key={i}
                    title={eventColor ? CALENDAR_EVENTS.find(e => e.date === d)?.title : undefined}
                    className={`w-7 h-7 mx-auto flex items-center justify-center text-[11px] font-bold rounded-full relative cursor-default transition-all ${
                      isToday
                        ? 'bg-blue-600 text-white shadow-xs'
                        : colors
                        ? `${colors.bg} ${colors.text}`
                        : isHoliday
                        ? 'text-rose-400 bg-rose-50/50'
                        : 'text-slate-700 hover:bg-white'
                    }`}
                  >
                    {d}
                    {colors && !isToday && (
                      <span className={`absolute -bottom-0.5 w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    )}
                  </span>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60">
              {CALENDAR_EVENTS.map(ev => (
                <span key={ev.date} className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${BADGE_COLOR[ev.color]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${COLOR_MAP[ev.color].dot}`} />
                  {ev.title.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Key Events List */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Upcoming Events
            </h4>
            <div className="space-y-2.5">
              {CALENDAR_EVENTS.map((ev) => {
                const c = COLOR_MAP[ev.color];
                return (
                  <div
                    key={ev.date}
                    className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-[#FBFBFA] hover:bg-white transition-all cursor-default"
                  >
                    <div className={`w-11 h-11 rounded-2xl ${c.bg} ${c.text} flex flex-col items-center justify-center flex-shrink-0 shadow-xs`}>
                      <span className="text-[9px] uppercase font-bold tracking-wider">{ev.month}</span>
                      <span className="text-base font-extrabold leading-none">{String(ev.date).padStart(2, '0')}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900">{ev.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{ev.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F8F7F3] flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500 font-medium">AY 2026-27 Calendar</span>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </aside>
    </>
  );
}
