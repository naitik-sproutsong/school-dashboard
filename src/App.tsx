import { useState } from 'react';
import {
  CalendarDays,
  X,
  ChevronLeft,
} from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CalendarDrawer from './components/layout/CalendarDrawer';
import KpiCard, { ProgressRing } from './components/dashboard/KpiCard';
import AttendanceSection from './components/dashboard/AttendanceSection';
import ClassesSection from './components/dashboard/ClassesSection';
import StaffSection from './components/dashboard/StaffSection';
import FeeSection from './components/dashboard/FeeSection';
import IssuesSection from './components/dashboard/IssuesSection';
import NoticesSection from './components/dashboard/NoticesSection';
import { KPI, CALENDAR_EVENTS } from './data/schoolData';

const EVENT_DOTS: Record<string, string> = {
  amber:  'bg-amber-400',
  sky:    'bg-blue-400',
  violet: 'bg-purple-400',
  rose:   'bg-rose-400',
};

const EVENT_BG: Record<string, string> = {
  amber:  'bg-[#FEF9EE] text-amber-900 border-[#FDE68A]',
  sky:    'bg-[#EFF6FF] text-blue-900 border-[#BFDBFE]',
  violet: 'bg-[#FAF5FF] text-purple-900 border-[#E9D5FF]',
  rose:   'bg-[#FFF1F2] text-rose-900 border-[#FECDD3]',
};

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F5EE] text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-shrink-0">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onCalendarOpen={handleCalendarOpen}
        />
      </div>

      {/* Mobile Sidebar Slide-over */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#101726] shadow-2xl z-50">
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
              activeNav={activeNav}
              onNavClick={handleNavClick}
              onCalendarOpen={handleCalendarOpen}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header with greeting */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Canvas Row: Scrollable Main Canvas + Right Calendar Strip */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* Scrollable Dashboard Canvas */}
          <main
            className="flex-1 overflow-y-auto px-6 sm:px-8 pb-10 space-y-7 custom-scroll"
            data-purpose="main-dashboard-canvas"
          >
            {/* LEVEL 1: Top 4 KPI Cards matching Reference 1 */}
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-purpose="top-kpi-metrics"
            >
              {/* Card 1: TOTAL STUDENTS */}
              <KpiCard label="STUDENTS" cornerColor="#E8F4FD">
                <div className="space-y-3">
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {KPI.students.total.toLocaleString('en-US')}
                  </div>

                  {/* Dual color progress bar: blue for male, pink for female */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                    <div
                      className="bg-[#3B82F6] h-full transition-all duration-500"
                      style={{
                        width: `${(KPI.students.male / KPI.students.total) * 100}%`,
                      }}
                      title={`Male: ${KPI.students.male}`}
                    />
                    <div
                      className="bg-[#F43F5E] h-full transition-all duration-500"
                      style={{
                        width: `${(KPI.students.female / KPI.students.total) * 100}%`,
                      }}
                      title={`Female: ${KPI.students.female}`}
                    />
                  </div>

                  {/* Male / Female legend */}
                  <div className="flex justify-between items-center text-sm font-bold pt-1">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-600 font-extrabold text-base">♂ Boys</span>
                      <span className="text-slate-900 font-extrabold">{KPI.students.male}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-rose-500 font-extrabold text-base">♀ Girls</span>
                      <span className="text-slate-900 font-extrabold">{KPI.students.female}</span>
                    </span>
                  </div>
                </div>
              </KpiCard>

              {/* Card 2: STUDENTS TODAY */}
              <KpiCard label="STUDENTS TODAY" cornerColor="#EAF7EE">
                <div className="flex items-center gap-4 group">
                  <ProgressRing
                    percentage={KPI.studentAttendance.rate}
                    color="#22C55E"
                    hoverDetail={
                      <>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Present</span>
                        <span className="text-sm font-extrabold text-emerald-600">{KPI.studentAttendance.present}</span>
                      </>
                    }
                  />
                  <div>
                    <span className="text-base font-extrabold text-slate-800 block font-sans">
                      {KPI.studentAttendance.label}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                      {KPI.studentAttendance.trend}
                    </span>
                  </div>
                </div>
              </KpiCard>

              {/* Card 3: TEACHERS TODAY */}
              <KpiCard label="TEACHERS TODAY" cornerColor="#FEF6E9">
                <div className="flex items-center gap-4 group">
                  <ProgressRing
                    percentage={KPI.teacherAttendance.rate}
                    color="#F59E0B"
                    hoverDetail={
                      <>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Present</span>
                        <span className="text-sm font-extrabold text-amber-600">{KPI.teacherAttendance.present}</span>
                      </>
                    }
                  />
                  <div>
                    <span className="text-base font-extrabold text-slate-800 block font-sans">
                      {KPI.teacherAttendance.label}
                    </span>
                    <span className="text-xs font-bold text-slate-500 block mt-0.5">
                      {KPI.teacherAttendance.present} on duty
                    </span>
                  </div>
                </div>
              </KpiCard>

              {/* Card 4: NEW ADMISSIONS */}
              <KpiCard label="NEW ADMISSIONS" cornerColor="#E7F8F7">
                <div className="space-y-1.5 flex flex-col justify-center h-full">
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {KPI.newAdmissions.count}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                    <span>▲</span>
                    <span>{KPI.newAdmissions.growth}</span>
                  </div>
                </div>
              </KpiCard>
            </section>

            {/* LEVEL 2: Two-column Asymmetrical Grid */}
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
              data-purpose="two-column-core-grid"
            >
              {/* Left Column (~60-65% width -> 7 cols) */}
              <div className="lg:col-span-7 space-y-7">
                <AttendanceSection />
                <ClassesSection />
                <StaffSection />
              </div>

              {/* Right Column (~35-40% width -> 5 cols) */}
              <div className="lg:col-span-5 space-y-7">
                <FeeSection />
                <IssuesSection />
                <NoticesSection />
              </div>
            </div>
          </main>

          {/* Persistent Calendar Vertical Strip matching Reference 3 */}
          <div className="hidden sm:flex relative z-20 flex-shrink-0 flex-col items-center bg-white border-l border-slate-200/80 shadow-xs px-2 py-5 justify-between select-none w-14">
            {/* Top Calendar Icon Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={handleCalendarOpen}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 hover:scale-105 transition-transform cursor-pointer"
                title="Academic Calendar"
                aria-label="Open Academic Calendar"
              >
                <CalendarDays className="w-5 h-5" />
              </button>

              {/* Vertical Text */}
              <span className="vertical-text text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mt-2">
                ACADEMIC CALENDAR
              </span>

              <div className="w-6 h-px bg-slate-200 my-1" />

              {/* Upcoming Event Badges */}
              <div className="flex flex-col gap-2.5">
                {CALENDAR_EVENTS.map((ev) => {
                  const bg = EVENT_BG[ev.color] || EVENT_BG.amber;
                  const dot = EVENT_DOTS[ev.color] || EVENT_DOTS.amber;

                  return (
                    <button
                      key={ev.date}
                      type="button"
                      onClick={handleCalendarOpen}
                      className={`w-9 h-11 rounded-xl border flex flex-col items-center justify-center p-1 transition-transform hover:scale-105 cursor-pointer ${bg}`}
                      title={`${ev.title} (${ev.month} ${ev.date})`}
                    >
                      <span className="text-[8px] font-bold uppercase leading-none opacity-80">{ev.month}</span>
                      <span className="text-[12px] font-extrabold leading-tight mt-0.5">{String(ev.date).padStart(2, '0')}</span>
                      <span className={`w-1 h-1 rounded-full ${dot} mt-0.5`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: « Open Cal Button */}
            <button
              type="button"
              onClick={handleCalendarOpen}
              className="mt-4 p-2 bg-[#F8F7F3] hover:bg-[#ECEAE2] rounded-xl border border-slate-200/80 flex flex-col items-center justify-center text-slate-700 hover:text-slate-900 transition-colors cursor-pointer group shadow-2xs"
              title="Open Calendar Drawer"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[8px] font-extrabold text-slate-600 uppercase mt-0.5 text-center leading-tight">
                Open<br/>Cal
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Calendar Drawer */}
      <CalendarDrawer
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </div>
  );
}
