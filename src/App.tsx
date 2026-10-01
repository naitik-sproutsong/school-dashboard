import { useState } from 'react';
import {
  Users,
  CheckCircle2,
  GraduationCap,
  UserPlus,
  CalendarDays,
  X,
} from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CalendarDrawer from './components/layout/CalendarDrawer';
import KpiCard from './components/dashboard/KpiCard';
import AttendanceSection from './components/dashboard/AttendanceSection';
import ClassesSection from './components/dashboard/ClassesSection';
import StaffSection from './components/dashboard/StaffSection';
import FeeSection from './components/dashboard/FeeSection';
import IssuesSection from './components/dashboard/IssuesSection';
import NoticesSection from './components/dashboard/NoticesSection';
import { KPI } from './data/schoolData';

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
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50">
            <div className="absolute top-2 right-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
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
        {/* Top Header */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Canvas Row: Scrollable Main Canvas + Persistent Calendar Tab */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* Scrollable Dashboard Canvas */}
          <main
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6"
            data-purpose="main-dashboard-canvas"
          >
            {/* LEVEL 1: Top 4 KPI Cards */}
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              data-purpose="top-kpi-metrics"
            >
              {/* KPI 1: Total Students */}
              <KpiCard
                label="TOTAL STUDENTS"
                value={KPI.students.total.toLocaleString('en-IN')}
                badge={KPI.students.yoyGrowth}
                badgeVariant="success"
                icon={<Users className="w-4 h-4" />}
                iconBg="bg-sky-50 text-sky-600"
                sub={
                  <div className="w-full">
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
                      <span>
                        Male: <strong className="text-slate-700">{KPI.students.male}</strong>
                      </span>
                      <span>
                        Female: <strong className="text-slate-700">{KPI.students.female}</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                      <div
                        className="bg-sky-500 h-full"
                        style={{
                          width: `${(KPI.students.male / KPI.students.total) * 100}%`,
                        }}
                        title={`Male ${Math.round((KPI.students.male / KPI.students.total) * 100)}%`}
                      />
                      <div
                        className="bg-indigo-400 h-full"
                        style={{
                          width: `${(KPI.students.female / KPI.students.total) * 100}%`,
                        }}
                        title={`Female ${Math.round((KPI.students.female / KPI.students.total) * 100)}%`}
                      />
                    </div>
                  </div>
                }
              />

              {/* KPI 2: Student Attendance */}
              <KpiCard
                label="STUDENT ATTENDANCE"
                value={`${KPI.studentAttendance.rate}%`}
                badge={`↑ ${KPI.studentAttendance.trend}`}
                badgeVariant="success"
                icon={<CheckCircle2 className="w-4 h-4" />}
                iconBg="bg-blue-50 text-blue-600"
                barPct={KPI.studentAttendance.rate}
                barColor="bg-blue-600"
                sub={
                  <div className="w-full flex justify-between text-xs text-slate-500">
                    <span>
                      Present: <span className="text-emerald-600 font-semibold">{KPI.studentAttendance.present.toLocaleString('en-IN')}</span>
                    </span>
                    <span>
                      Absent: <span className="text-rose-500 font-semibold">{KPI.studentAttendance.absent}</span>
                    </span>
                  </div>
                }
              />

              {/* KPI 3: Teacher Attendance */}
              <KpiCard
                label="TEACHER ATTENDANCE"
                value={`${KPI.teacherAttendance.rate}%`}
                badge={KPI.teacherAttendance.label}
                badgeVariant="info"
                icon={<GraduationCap className="w-4 h-4" />}
                iconBg="bg-emerald-50 text-emerald-600"
                barPct={KPI.teacherAttendance.rate}
                barColor="bg-emerald-500"
                sub={
                  <div className="w-full flex justify-between text-xs text-slate-500">
                    <span>
                      On Leave: <span className="text-amber-600 font-semibold">{KPI.teacherAttendance.absent}</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">Optimal coverage</span>
                  </div>
                }
              />

              {/* KPI 4: New Admissions */}
              <KpiCard
                label="NEW ADMISSIONS"
                value={String(KPI.newAdmissions.count)}
                badge={KPI.newAdmissions.growth}
                badgeVariant="success"
                icon={<UserPlus className="w-4 h-4" />}
                iconBg="bg-violet-50 text-violet-600"
                barPct={Math.round((KPI.newAdmissions.count / KPI.newAdmissions.target) * 100)}
                barColor="bg-violet-600"
                sub={
                  <div className="w-full flex justify-between text-xs text-slate-500">
                    <span>{KPI.newAdmissions.label}</span>
                    <span className="text-slate-400">Target: {KPI.newAdmissions.target}</span>
                  </div>
                }
              />
            </section>

            {/* LEVEL 2: Two-column Asymmetrical 60/40 Grid */}
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              data-purpose="two-column-core-grid"
            >
              {/* Left Column (~60% width -> 7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <AttendanceSection />
                <ClassesSection />
                <StaffSection />
              </div>

              {/* Right Column (~40% width -> 5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <FeeSection />
                <IssuesSection />
                <NoticesSection />
              </div>
            </div>
          </main>

          {/* Persistent Calendar Edge Tab (Attached to right edge) */}
          <div className="relative z-30 flex-shrink-0 flex items-stretch">
            <button
              type="button"
              id="calendar-vertical-tab"
              onClick={() => setCalendarOpen(true)}
              className="w-8 md:w-9 bg-sky-100 hover:bg-sky-200 text-sky-800 border-l border-sky-300 flex flex-col items-center justify-center py-6 cursor-pointer transition-colors shadow-sm select-none"
              title="Open Academic Calendar"
              aria-label="Open Academic Calendar"
            >
              <CalendarDays className="w-4 h-4 mb-2 text-sky-700" />
              <span className="vertical-text text-[11px] font-bold tracking-widest text-sky-900">
                CALENDAR
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
