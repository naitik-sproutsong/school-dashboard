// All mock data for Greenwood International School Dashboard
// Separated from UI components per the project brief

export const SCHOOL = {
  name: "Greenwood Int'l",
  fullName: "Greenwood International School",
  affiliation: "CBSE #93012",
  academicYear: "AY 2026–27",
  principal: {
    name: "Dr. Ananya Mehta",
    role: "Principal",
    initials: "AM",
  },
};

export const KPI = {
  students: {
    total: 1248,
    male: 652,
    female: 596,
    yoyGrowth: "+3.2% YoY",
  },
  studentAttendance: {
    rate: 94.2,
    present: 1176,
    absent: 72,
    trend: "+0.6% vs yest.",
  },
  teacherAttendance: {
    rate: 94.2,
    present: 81,
    absent: 5,
    total: 86,
    label: "81 / 86 Present",
  },
  newAdmissions: {
    count: 126,
    target: 140,
    growth: "+14% vs LY",
    label: "AY 2026–27 Intake",
  },
};

export const ATTENDANCE_TRENDS = {
  students: {
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    values: [93.1, 94.4, 92.8, 95.2, 94.6, 94.2],
    avgRate: "94.2%",
    highestMonth: "Aug 95.2%",
    peakDay: "96.8% Mon",
    lowDay: "Fri 92.4%",
  },
  staff: {
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    values: [94.0, 95.6, 93.5, 97.1, 96.2, 95.6],
    avgRate: "95.6%",
    highestMonth: "Sep 97.1%",
    peakDay: "97.8% Mon",
    lowDay: "Fri 93.6%",
  },
};

export const GRADES = [
  { grade: "Grade 1", students: 92, sections: ["A", "B", "C"], capacity: 76 },
  { grade: "Grade 2", students: 96, sections: ["A", "B", "C"], capacity: 80 },
  { grade: "Grade 3", students: 128, sections: ["A", "B", "C", "D"], capacity: 95 },
  { grade: "Grade 4", students: 101, sections: ["A", "B", "C"], capacity: 84 },
  { grade: "Grade 5", students: 134, sections: ["A", "B", "C", "D"], capacity: 98 },
];

export const GRADES_SUMMARY = {
  label: "Grades 6 – 12",
  total: 697,
  sections: 25,
  wings: "Middle & Senior Wings",
};

export const STAFF = {
  total: 86,
  permanent: 72,
  visiting: 14,
  newHires: 8,
  openPosts: 5,
  urgentNeeds: [
    "Mathematics (2)",
    "Physics Lab (1)",
    "English (1)",
    "Physical Ed (1)",
  ],
};

export const FEES = {
  collected: "82.4L",
  collectedRaw: 8240000,
  pending: "6.8L",
  pendingRaw: 680000,
  collectionRate: 92,
  pendingRate: 7.6,
  target: "89.2L",
  cycle: "Q3 Cycle",
};

export const ISSUES = [
  {
    id: 1,
    priority: "URGENT",
    tag: "urgent" as const,
    title: "Science Lab Projector Malfunction",
    meta: "Room 302 · Dr. R. Sharma",
    time: "2 hrs ago",
    action: "Assign",
    actionVariant: "danger" as const,
  },
  {
    id: 2,
    priority: "TRANSPORT",
    tag: "warning" as const,
    title: "Bus Route 4 Delay",
    meta: "Sector 14 · 6 parents flagged",
    time: "8:15 AM · Under review",
    action: "Review",
    actionVariant: "neutral" as const,
  },
  {
    id: 3,
    priority: "FACILITY",
    tag: "info" as const,
    title: "Classroom 204 AC Maintenance",
    meta: "Block B · HVAC on site",
    time: "In Progress · ETA 4:00 PM",
    action: "Status",
    actionVariant: "neutral" as const,
  },
];

export const NOTICES = [
  {
    id: 1,
    month: "OCT",
    day: "02",
    category: "Admin",
    categoryColor: "rose" as const,
    title: "Q3 Fee Grace Period Extended",
    body: "5-day extension, no late surcharge.",
    timeAgo: "Yesterday",
  },
  {
    id: 2,
    month: "OCT",
    day: "01",
    category: "Sports",
    categoryColor: "sky" as const,
    title: "Football Trials — Under 16",
    body: "Grounds open Saturday 8:00 AM.",
    timeAgo: "2 days ago",
  },
  {
    id: 3,
    month: "SEP",
    day: "29",
    category: "Holiday",
    categoryColor: "amber" as const,
    title: "Diwali Break Oct 24 – 29",
    body: "School remains closed all 6 days.",
    timeAgo: "Sep 29",
  },
  {
    id: 4,
    month: "SEP",
    day: "28",
    category: "Academic",
    categoryColor: "emerald" as const,
    title: "Term 1 PTM Booking Open",
    body: "Parent portal live for all grades.",
    timeAgo: "Sep 28",
  },
];

export const CALENDAR_EVENTS = [
  {
    date: 5,
    month: "OCT",
    color: "amber" as const,
    title: "Term 1 Unit Test Begins",
    detail: "Grades 6–12 · Shift 1",
  },
  {
    date: 12,
    month: "OCT",
    color: "sky" as const,
    title: "Annual Sports Meet 2026",
    detail: "All campus houses · Main Ground",
  },
  {
    date: 18,
    month: "OCT",
    color: "violet" as const,
    title: "Inter-House Science Expo",
    detail: "Junior & Senior Auditoriums",
  },
  {
    date: 24,
    month: "OCT",
    color: "rose" as const,
    title: "Diwali Break Commences",
    detail: "School reopens Mon, Nov 2",
  },
];

// October 2026: Oct 1 = Thursday = index 4 (Sun=0)
export const OCTOBER_2026 = {
  startDayIndex: 4,
  totalDays: 31,
  prevMonthDays: [27, 28, 29, 30],
  today: 1,
  eventDays: { 5: "amber", 12: "sky", 18: "violet", 24: "rose" } as Record<number, string>,
  holidayRange: [24, 25, 26, 27, 28, 29],
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "students", label: "Students", icon: "Users" },
  { id: "attendance", label: "Attendance", icon: "ClipboardCheck" },
  { id: "admissions", label: "Admissions", icon: "UserPlus" },
  { id: "staff", label: "Staff", icon: "Briefcase" },
  { id: "classes", label: "Classes", icon: "BookOpen" },
  { id: "fees", label: "Fees", icon: "IndianRupee" },
  { id: "calendar", label: "Calendar", icon: "CalendarDays" },
  { id: "notices", label: "Notices", icon: "Bell" },
  { id: "issues", label: "Issues / Requests", icon: "AlertTriangle" },
] as const;
