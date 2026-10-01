import { X, CalendarDays, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { CALENDAR_EVENTS, OCTOBER_2026 } from '../../data/schoolData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-900',  dot: 'bg-amber-600'  },
  sky:    { bg: 'bg-sky-100',    text: 'text-sky-900',    dot: 'bg-sky-600'    },
  violet: { bg: 'bg-violet-100', text: 'text-violet-900', dot: 'bg-violet-600' },
  rose:   { bg: 'bg-rose-100',   text: 'text-rose-900',   dot: 'bg-rose-600'   },
};

const BADGE_COLOR: Record<string, string> = {
  amber:  'bg-amber-100 text-amber-800',
  sky:    'bg-sky-100 text-sky-800',
  violet: 'bg-violet-100 text-violet-800',
  rose:   'bg-rose-100 text-rose-800',
};

export default function CalendarDrawer({ isOpen, onClose }: Props) {
  const { startDayIndex, totalDays, prevMonthDays, today, eventDays, holidayRange } = OCTOBER_2026;

  // Build the day grid: leading prev-month days + oct days + trailing blanks
  const leadingBlanks = startDayIndex; // Oct 1 = Thursday = index 4
  const cells: Array<{ day: number; type: 'prev' | 'current' | 'next' }> = [];
  prevMonthDays.forEach((d) => cells.push({ day: d, type: 'prev' }));
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, type: 'current' });
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - totalDays - leadingBlanks + 1, type: 'next' });

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-50 drawer-overlay ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl border-l border-slate-200 z-50 drawer-slide flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Academic Calendar"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-sky-50/60 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Academic Calendar</h3>
              <p className="text-[11px] text-slate-500 font-medium">October 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
            aria-label="Close calendar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Month grid */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">October 2026</span>
              <div className="flex gap-1">
                <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors" aria-label="Previous month">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors" aria-label="Next month">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[10px] font-semibold text-slate-400">{d}</span>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1 text-center">
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
                    className={`w-7 h-7 mx-auto flex items-center justify-center text-[11px] font-medium rounded-full relative cursor-default transition-colors ${
                      isToday
                        ? 'bg-sky-600 text-white font-bold shadow-sm'
                        : colors
                        ? `${colors.bg} ${colors.text} font-bold`
                        : isHoliday
                        ? 'text-rose-400'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                    {colors && !isToday && (
                      <span className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${colors.dot}`} />
                    )}
                  </span>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-2 pt-2.5 border-t border-slate-200">
              {CALENDAR_EVENTS.map(ev => (
                <span key={ev.date} className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${BADGE_COLOR[ev.color]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${COLOR_MAP[ev.color].dot}`} />
                  {ev.title.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Events list */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Key Academic Events</h4>
            <div className="space-y-2.5">
              {CALENDAR_EVENTS.map((ev) => {
                const c = COLOR_MAP[ev.color];
                return (
                  <div
                    key={ev.date}
                    className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-default"
                  >
                    <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex flex-col items-center justify-center flex-shrink-0`}>
                      <span className="text-[9px] uppercase font-semibold">{ev.month}</span>
                      <span className="text-sm font-extrabold leading-none">{String(ev.date).padStart(2, '0')}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800">{ev.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ev.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500 font-medium">AY 2026-27 · Term 1</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition-colors">
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </aside>
    </>
  );
}
