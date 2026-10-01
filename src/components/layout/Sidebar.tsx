import {
  LayoutDashboard, Users, ClipboardCheck, UserPlus, Briefcase,
  BookOpen, IndianRupee, CalendarDays, Bell, AlertTriangle,
  ChevronLeft, ChevronRight, GraduationCap,
} from 'lucide-react';
import { NAV_ITEMS, SCHOOL } from '../../data/schoolData';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, ClipboardCheck, UserPlus, Briefcase,
  BookOpen, IndianRupee, CalendarDays, Bell, AlertTriangle,
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
      className={`sidebar-enter bg-white border-r border-slate-200/80 flex flex-col justify-between flex-shrink-0 z-30 select-none h-full ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top: Logo + toggle */}
      <div>
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            {/* School crest */}
            <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-sky-200">
              <GraduationCap className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="min-w-0 sidebar-text">
                <span className="font-bold text-slate-800 text-sm tracking-tight block truncate">
                  {SCHOOL.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">{SCHOOL.affiliation}</span>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = activeNav === item.id;
            const isCalendar = item.id === 'calendar';

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (isCalendar) {
                    onCalendarOpen();
                  } else {
                    onNavClick(item.id);
                  }
                }}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-colors group ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 ${
                    isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                {!collapsed && (
                  <span className="sidebar-text truncate">{item.label}</span>
                )}
                {/* Issues badge */}
                {item.id === 'issues' && !collapsed && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Academic Year badge */}
      <div className="p-3 border-t border-slate-100">
        {collapsed ? (
          <div className="flex justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
              AY 26–27
            </span>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Academic Year</span>
            <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md shadow-xs border border-slate-200">
              {SCHOOL.academicYear}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
