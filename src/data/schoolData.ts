// All mock data for Greenwood International School Dashboard (Vidyalaya)
// Separated from UI components per the project brief

export const SCHOOL = {
  name: "Greenwood Int'l",
  brandName: "Vidyalaya",
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
    male: 649,
    female: 599,
    yoyGrowth: "+3.2% YoY",
  },
  studentAttendance: {
    rate: 91,
    present: 1136,
    absent: 112,
    total: 1248,
    trend: "+0.6% vs yest.",
    label: "1,136 present",
  },
  teacherAttendance: {
    rate: 96,
    present: 54,
    absent: 2,
    total: 56,
    label: "54 / 56",
  },
  newAdmissions: {
    count: 186,
    target: 200,
    growth: "+12% vs last year",
    label: "AY 2026–27 Intake",
  },
};

export const ATTENDANCE_WEEKLY = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  students: [92, 88, 86, 91, 82, 77],
  staff: [97, 94, 95, 98, 92, 89],
  avgRate: "89.3%",
  peakDay: "Thu 94.5%",
  lowDay: "Sat 83.0%",
};

export const ATTENDANCE_MONTHLY = {
  months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  students: [93.1, 94.4, 92.8, 95.2, 94.6, 94.2],
  staff: [94.0, 95.6, 93.5, 97.1, 96.2, 95.6],
  avgRate: "94.2%",
  highestMonth: "Aug 95.2%",
  peakDay: "Mon 96.8%",
  lowDay: "Fri 92.4%",
};

export const ATTENDANCE_3MONTHS = {
  months: ["Aug", "Sep", "Oct"],
  students: [95.2, 94.6, 94.2],
  staff: [97.1, 96.2, 95.6],
  avgRate: "94.6%",
  highestMonth: "Aug 95.2%",
  peakDay: "Mon 96.8%",
  lowDay: "Fri 92.4%",
};

export const ATTENDANCE_6MONTHS = {
  months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  students: [93.1, 94.4, 92.8, 95.2, 94.6, 94.2],
  staff: [94.0, 95.6, 93.5, 97.1, 96.2, 95.6],
  avgRate: "94.0%",
  highestMonth: "Aug 95.2%",
  peakDay: "Mon 96.8%",
  lowDay: "Fri 92.4%",
};

export const ATTENDANCE_1YEAR = {
  months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  students: [92.1, 91.4, 90.8, 91.2, 92.6, 93.2, 93.1, 94.4, 92.8, 95.2, 94.6, 94.2],
  staff: [93.0, 92.6, 91.5, 92.1, 93.2, 94.6, 94.0, 95.6, 93.5, 97.1, 96.2, 95.6],
  avgRate: "93.3%",
  highestMonth: "Aug 95.2%",
  peakDay: "Mon 96.8%",
  lowDay: "Fri 90.4%",
};

export interface GradeItem {
  id: string;
  roman: string;
  grade: string;
  avgGrade: number; // 0-100 percentage
  students: number;
  sections: string[];
  color: string;
  teachers: string[];
  detailedSections?: { section: string, classTeacher: string, pupils: number }[];
}

export const CLASS_GRADES: GradeItem[] = [
  { 
    id: "1", roman: "I", grade: "Grade 1", avgGrade: 84, students: 92, sections: ["A", "B", "C"], color: "#3B82F6", teachers: ["Mrs. Anita Roy", "Mr. Deepak Sen"],
    detailedSections: [
      { section: "A", classTeacher: "Mrs. Anita Roy", pupils: 30 },
      { section: "B", classTeacher: "Mr. Deepak Sen", pupils: 31 },
      { section: "C", classTeacher: "Ms. Leena Das", pupils: 31 }
    ]
  },
  { 
    id: "2", roman: "II", grade: "Grade 2", avgGrade: 81, students: 96, sections: ["A", "B", "C"], color: "#10B981", teachers: ["Ms. Priya Sharma", "Mr. Rohan Verma"],
    detailedSections: [
      { section: "A", classTeacher: "Ms. Priya Sharma", pupils: 32 },
      { section: "B", classTeacher: "Mr. Rohan Verma", pupils: 32 },
      { section: "C", classTeacher: "Mrs. Kavita Iyer", pupils: 32 }
    ]
  },
  { id: "3", roman: "III", grade: "Grade 3", avgGrade: 79, students: 128, sections: ["A", "B", "C", "D"], color: "#F59E0B", teachers: ["Mrs. Sunita Rao", "Mr. Vikram Seth"],
    detailedSections: [
      { section: "A", classTeacher: "Mrs. Sunita Rao", pupils: 32 },
      { section: "B", classTeacher: "Mr. Vikram Seth", pupils: 32 },
      { section: "C", classTeacher: "Ms. Anjali Nair", pupils: 32 },
      { section: "D", classTeacher: "Mr. Sunil Kumar", pupils: 32 }
    ]
  },
  { id: "4", roman: "IV", grade: "Grade 4", avgGrade: 88, students: 101, sections: ["A", "B", "C"], color: "#F43F5E", teachers: ["Ms. Neha Gupta", "Mr. Amit Kumar"],
    detailedSections: [
      { section: "A", classTeacher: "Ms. Neha Gupta", pupils: 33 },
      { section: "B", classTeacher: "Mr. Amit Kumar", pupils: 34 },
      { section: "C", classTeacher: "Mrs. Shilpa Rai", pupils: 34 }
    ]
  },
  { id: "5", roman: "V", grade: "Grade 5", avgGrade: 76, students: 134, sections: ["A", "B", "C", "D"], color: "#06B6D4", teachers: ["Mrs. Radhika Paul", "Mr. Manish Das"],
    detailedSections: [
      { section: "A", classTeacher: "Mrs. Radhika Paul", pupils: 33 },
      { section: "B", classTeacher: "Mr. Manish Das", pupils: 33 },
      { section: "C", classTeacher: "Ms. Geeta Menon", pupils: 34 },
      { section: "D", classTeacher: "Mr. Rajesh Singh", pupils: 34 }
    ]
  },
  { id: "6", roman: "VI", grade: "Grade 6", avgGrade: 80, students: 115, sections: ["A", "B", "C"], color: "#3B82F6", teachers: ["Dr. R. Sharma", "Ms. Kavita Nair"],
    detailedSections: [
      { section: "A", classTeacher: "Dr. R. Sharma", pupils: 38 },
      { section: "B", classTeacher: "Ms. Kavita Nair", pupils: 38 },
      { section: "C", classTeacher: "Mr. Vineet Joshi", pupils: 39 }
    ]
  },
  { id: "7", roman: "VII", grade: "Grade 7", avgGrade: 77, students: 112, sections: ["A", "B", "C"], color: "#10B981", teachers: ["Mr. Suresh Nair", "Mrs. Bina Shah"],
    detailedSections: [
      { section: "A", classTeacher: "Mr. Suresh Nair", pupils: 37 },
      { section: "B", classTeacher: "Mrs. Bina Shah", pupils: 37 },
      { section: "C", classTeacher: "Ms. Ritu Patel", pupils: 38 }
    ]
  },
  { id: "8", roman: "VIII", grade: "Grade 8", avgGrade: 85, students: 118, sections: ["A", "B", "C", "D"], color: "#F59E0B", teachers: ["Mrs. Meena Joshi", "Mr. Alok Pant"],
    detailedSections: [
      { section: "A", classTeacher: "Mrs. Meena Joshi", pupils: 29 },
      { section: "B", classTeacher: "Mr. Alok Pant", pupils: 29 },
      { section: "C", classTeacher: "Ms. Smita Deshmukh", pupils: 30 },
      { section: "D", classTeacher: "Mr. Tarun Verma", pupils: 30 }
    ]
  },
  { id: "9", roman: "IX", grade: "Grade 9", avgGrade: 74, students: 120, sections: ["A", "B", "C", "D"], color: "#F43F5E", teachers: ["Dr. K. Raman", "Mrs. S. Rai"],
    detailedSections: [
      { section: "A", classTeacher: "Dr. K. Raman", pupils: 30 },
      { section: "B", classTeacher: "Mrs. S. Rai", pupils: 30 },
      { section: "C", classTeacher: "Mr. Prakash Jha", pupils: 30 },
      { section: "D", classTeacher: "Ms. Nidhi Agarwal", pupils: 30 }
    ]
  },
  { id: "10", roman: "X", grade: "Grade 10", avgGrade: 82, students: 110, sections: ["A", "B", "C"], color: "#06B6D4", teachers: ["Mr. P. Gurung", "Mrs. A. Sharma"],
    detailedSections: [
      { section: "A", classTeacher: "Mr. P. Gurung", pupils: 36 },
      { section: "B", classTeacher: "Mrs. A. Sharma", pupils: 37 },
      { section: "C", classTeacher: "Mr. Devendra Singh", pupils: 37 }
    ]
  },
];

export const GRADES_SUMMARY = {
  label: "Grades 1 – 10 Overview",
  total: 1126,
  sections: 33,
  wings: "Primary & Middle Wings",
};

export interface TeacherCardData {
  id: string;
  name: string;
  initials: string;
  subject: string;
  status: "Present" | "Leave" | "Late";
  avatarColor: "blue" | "emerald" | "amber" | "rose" | "teal";
}

export const TEACHERS_LIST: TeacherCardData[] = [
  { id: "t1", name: "A. Sharma", initials: "S", subject: "Maths", status: "Present", avatarColor: "blue" },
  { id: "t2", name: "R. Thapa", initials: "T", subject: "Science", status: "Present", avatarColor: "emerald" },
  { id: "t3", name: "P. Gurung", initials: "G", subject: "English", status: "Leave", avatarColor: "amber" },
  { id: "t4", name: "S. Rai", initials: "R", subject: "Nepali", status: "Present", avatarColor: "rose" },
  { id: "t5", name: "M. Joshi", initials: "J", subject: "Social", status: "Late", avatarColor: "teal" },
];

export const STAFF = {
  total: 56,
  permanent: 48,
  visiting: 8,
  newHires: 6,
  openPosts: 4,
  urgentNeeds: [
    "Mathematics (2)",
    "Physics Lab (1)",
    "English (1)",
  ],
};

export const FEES = {
  collected: "42.6L",
  collectedRaw: 4260000,
  pending: "13.8L",
  pendingRaw: 1380000,
  overdue: "6.2L",
  overdueRaw: 620000,
  totalTarget: "62.6L",
  collectedPct: 68,
  pendingPct: 22,
  overduePct: 10,
  cycle: "Q3 Cycle",
};

export interface IssueItem {
  id: number;
  priority: "High" | "Med" | "Low";
  tag: "high" | "med" | "low";
  title: string;
  meta: string;
  time: string;
  action: string;
}

export const ISSUES: IssueItem[] = [
  {
    id: 1,
    priority: "High",
    tag: "high",
    title: "Bus 3 delayed",
    meta: "Route 4 · Sector 14 · Under review",
    time: "8:15 AM",
    action: "Review",
  },
  {
    id: 2,
    priority: "Med",
    tag: "med",
    title: "Lab repair",
    meta: "Physics Lab 302 · Projector fault",
    time: "2 hrs ago",
    action: "Assign",
  },
  {
    id: 3,
    priority: "High",
    tag: "high",
    title: "Parent complaint — VII",
    meta: "Grade VII-B section inquiry",
    time: "10:30 AM",
    action: "Contact",
  },
  {
    id: 4,
    priority: "Low",
    tag: "low",
    title: "Library books",
    meta: "Annual catalog & stock audit",
    time: "Yesterday",
    action: "Status",
  },
];

export interface NoticeItem {
  id: number;
  month: string;
  day: string;
  dateStr: string;
  category: string;
  categoryColor: "sky" | "emerald" | "amber" | "rose";
  title: string;
  body: string;
  timeAgo: string;
}

export const NOTICES: NoticeItem[] = [
  {
    id: 1,
    month: "OCT",
    day: "10",
    dateStr: "Oct 10",
    category: "Sports",
    categoryColor: "sky",
    title: "Sports Day",
    body: "Grounds open Saturday 8:00 AM for heats.",
    timeAgo: "Oct 10",
  },
  {
    id: 2,
    month: "OCT",
    day: "14",
    dateStr: "Oct 14",
    category: "Academic",
    categoryColor: "emerald",
    title: "PTM — Grade X",
    body: "Parent consultation bookings open on portal.",
    timeAgo: "Oct 14",
  },
  {
    id: 3,
    month: "OCT",
    day: "18",
    dateStr: "Oct 18",
    category: "Holiday",
    categoryColor: "amber",
    title: "Dashain holidays",
    body: "School campus closed for festivities.",
    timeAgo: "Oct 18",
  },
  {
    id: 4,
    month: "OCT",
    day: "02",
    dateStr: "Oct 02",
    category: "Admin",
    categoryColor: "rose",
    title: "Q3 Fee Grace Period",
    body: "Extended by 5 days with zero surcharge.",
    timeAgo: "Yesterday",
  },
];

export const CALENDAR_EVENTS = [
  {
    date: 5,
    month: "OCT",
    color: "amber" as const,
    title: "Term 1 Unit Test Begins",
    detail: "Grades 6–10 · Shift 1",
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
    title: "Autumn Break Commences",
    detail: "School reopens Mon, Nov 2",
  },
];

// October 2026: Oct 1 = Thursday = index 4 (Sun=0)
export const OCTOBER_2026 = {
  startDayIndex: 4,
  totalDays: 31,
  prevMonthDays: [27, 28, 29, 30],
  today: 2,
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
  { id: "issues", label: "Issues", icon: "AlertTriangle" },
] as const;
