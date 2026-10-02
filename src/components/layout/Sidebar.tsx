import {
  LayoutDashboard, Users, ClipboardCheck, UserPlus, Briefcase,
  BookOpen, IndianRupee, CalendarDays, Bell, AlertCircle,
  ChevronLeft, ChevronRight, GraduationCap,
} from 'lucide-react';
import { NAV_ITEMS, SCHOOL } from '../../data/schoolData';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, ClipboardCheck, UserPlus, Briefcase,
  BookOpen, IndianRupee, CalendarDays, Bell, AlertTriangle: AlertCircle,
};

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  activeNav: string;
  onNavClick: (id: string) => void;
  onCalendarOpen: () => void;
}

export default function Sidebar({ collapsed, onToggle, activeNav, onNavClick, onCalendarOpen }: Props) {
  return (
    <aside
      className={`sidebar-enter bg-[#101726] text-slate-300 flex flex-col justify-between flex-shrink-0 z-30 select-none h-full transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-60'
      }`}
    >
      {/* Top: Logo */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="h-20 flex items-center px-4 border-b border-slate-800/60 justify-between">
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            {/* School / Vidyalaya logo icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-400/20 ml-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            
            <div className={`min-w-0 sidebar-text flex flex-col transition-all duration-300 overflow-hidden ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100'}`}>
              <span className="font-extrabold text-white text-base tracking-tight block truncate font-sans">
                {SCHOOL.brandName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block truncate tracking-wide">
                {SCHOOL.fullName}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1.5 overflow-y-auto flex-1 custom-scroll overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon] || LayoutDashboard;
            const isActive = activeNav === item.id;
            const isCalendar = item.id === 'calendar';

            return (
              <div key={item.id} className="relative group">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isCalendar) {
                      onCalendarOpen();
                    } else {
                      onNavClick(item.id);
                    }
                  }}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-900/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  aria-label={item.label}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  
                  <div className={`flex-1 flex items-center justify-between transition-all duration-300 overflow-hidden ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}`}>
                    <span className="sidebar-text truncate text-[13.5px] tracking-tight whitespace-nowrap">{item.label}</span>
                    
                    {item.id === 'issues' && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 border border-rose-500/30">
                        4
                      </span>
                    )}
                  </div>
                </a>

                {/* Tooltip in collapsed mode */}
                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-slate-700/80">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Collapse Button toggle per Reference 2 */}
      <div className="p-3 border-t border-slate-800/60 flex flex-col items-center gap-2 overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full py-2 px-3 rounded-full border border-slate-700/80 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-medium overflow-hidden"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-wide">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
