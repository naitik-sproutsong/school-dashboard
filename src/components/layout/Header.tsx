import { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { SCHOOL } from '../../data/schoolData';

interface Props {
  onMenuClick?: () => void;
}

function getTimeInfo() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  // ISO week
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d as unknown as number) - (yearStart as unknown as number)) / 86400000 + 1) / 7);
  return { time, date, week };
}

export default function Header({ onMenuClick }: Props) {
  const [timeInfo, setTimeInfo] = useState(getTimeInfo());

  useEffect(() => {
    const id = setInterval(() => setTimeInfo(getTimeInfo()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-5 flex items-center justify-between z-20 flex-shrink-0">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl md:hidden transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search */}
        <div className="relative w-48 sm:w-60 xl:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search student, staff..."
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 placeholder-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Center: live date/time */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs text-slate-600 font-medium">
        <span className="text-sky-600">◷</span>
        <span>
          {timeInfo.time} &nbsp;·&nbsp; {timeInfo.date} &nbsp;·&nbsp; Week {timeInfo.week}
        </span>
      </div>

      {/* Right: notification + user */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-800 leading-tight">{SCHOOL.principal.name}</div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight">{SCHOOL.principal.role}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-700 text-white font-semibold flex items-center justify-center text-xs ring-2 ring-slate-100 shadow-sm select-none">
            {SCHOOL.principal.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
