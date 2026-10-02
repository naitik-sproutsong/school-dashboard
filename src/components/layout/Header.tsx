import { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import { SCHOOL } from '../../data/schoolData';

interface Props {
  onMenuClick?: () => void;
}

function getTimeInfo() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  
  // ISO week calculation
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
    <header className="px-6 sm:px-8 pt-7 pb-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl md:hidden transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#111827] tracking-tight font-sans">
            Good day, Principal
          </h1>
          <p className="text-xs sm:text-[13px] font-medium text-[#64748B] mt-0.5 tracking-normal">
            {timeInfo.date} · {timeInfo.time} · Week {timeInfo.week}
          </p>
        </div>
      </div>

      {/* Right controls: quick actions & profile */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#f7f5ee]" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-300/80">
          <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            {SCHOOL.principal.initials}
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              {SCHOOL.principal.name}
            </span>
            <span className="block text-[11px] text-slate-500 font-medium leading-tight">
              {SCHOOL.principal.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
