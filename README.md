# School Administration Dashboard

An interactive, responsive dashboard built for a school **Principal / Administrator** to understand the current state of their institution at a glance and quickly identify anything that requires attention.
[Demo Video]([https://your-project.vercel.app](https://drive.google.com/file/d/18YvCwbP9HEzya5tJj5htkdCa49Ju5Gpt/view?usp=drive_link)

> Built as part of the **SproutSong 3-Day Trainee Exercise (1–3 October 2026)**.
---

## Getting Started

### Prerequisites

- **Node.js** — v18 or later ([download](https://nodejs.org/))
- **npm** — ships with Node.js

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/naitik-sproutsong/school-dashboard.git
cd school-dashboard

# 2. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Vite will start a dev server — open the URL printed in the terminal (usually `http://localhost:5173`).

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

### Linting

```bash
npm run lint       # runs oxlint
```

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + TypeScript               |
| Build Tool  | Vite 8                              |
| Styling     | Tailwind CSS 4                      |
| Icons       | Lucide React                        |
| Linting     | oxlint                              |

---

## Project Structure

```
school-dashboard/
├── public/                       # Static assets
├── src/
│   ├── components/
│   │   ├── dashboard/            # Dashboard section components
│   │   │   ├── AttendanceSection.tsx
│   │   │   ├── ClassesSection.tsx
│   │   │   ├── FeeSection.tsx
│   │   │   ├── IssuesSection.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   ├── NoticesSection.tsx
│   │   │   └── StaffSection.tsx
│   │   └── layout/               # Shell / chrome components
│   │       ├── CalendarDrawer.tsx
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── data/
│   │   └── schoolData.ts         # Realistic sample data
│   ├── App.tsx                   # Root layout & page composition
│   ├── index.css                 # Global styles & Tailwind directives
│   └── main.tsx                  # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Dashboard Sections

| # | Section                        | What it shows                                                                                    |
|---|--------------------------------|--------------------------------------------------------------------------------------------------|
| 1 | **Key Metrics / Overview**     | Total students, today's student attendance, today's teacher attendance, new admissions this year  |
| 2 | **Action Required / Issues**   | Open issues and complaints with priority badges — items that need the principal's attention first |
| 3 | **Attendance Overview**        | Interactive time-series chart (1 Week → 1 Year) for student & staff attendance trends            |
| 4 | **Classes / Grade Overview**   | Per-grade average scores with a bar chart; click any bar for section-level detail in a modal      |
| 5 | **Staff Overview**             | Total, permanent, visiting, new hires, and open positions at a glance                            |
| 6 | **Fee Collection**             | Donut chart showing collected vs. pending fees with amounts                                      |
| 7 | **Notices**                    | Recent school announcements and important dates                                                  |
| 8 | **Upcoming Events**            | Event badges on the persistent calendar strip                                                    |
| 9 | **Academic Calendar**          | Expandable calendar drawer accessible from the right-side strip                                  |

---

## Design Decisions

### 1. Principal-First Design

The dashboard was designed around the needs of a school principal rather than trying to surface every available metric. The primary goal is to let the user understand the school's current status **within a few seconds** and then identify anything that requires attention. That's why high-level KPIs and attendance come first, followed by actionable issues, while areas such as fees, staff, classes, notices, and events are kept summarized.

### 2. Information Hierarchy

Content is ordered by urgency and frequency of use:

1. Current school status (KPI cards)
2. Attendance trends
3. Issues requiring attention
4. Class & staff overview
5. Fee collection
6. Notices & calendar

This avoids overwhelming the user with every school metric on the first screen.

### 3. Progressive Disclosure

For detailed information the dashboard uses **dedicated pages, modals, and the calendar drawer** rather than packing everything onto the homepage. Summaries live on the main canvas; detail is one click away.

### 4. Attendance as a Trend

Attendance is shown as an interactive spline chart — not just a single percentage — so the principal can spot patterns over time. A dropdown lets the user toggle between 1 Week, 1 Month, 3 Months, 6 Months, and 1 Year views.

### 5. Calendar as a Secondary Layer

Instead of permanently occupying a large portion of the layout, the academic calendar lives in a persistent right-side strip with event dots. Clicking opens a full calendar drawer. This keeps the main canvas focused on current status while keeping dates easily accessible.

### 6. Visual Approach

The interface is kept **professional and approachable**: light content area, dark navigation sidebar, restrained color palette, clear typography, and subtle card styling — so that data remains the focus rather than the decoration.

---

## Interactions

- Collapsible sidebar navigation with active states
- Attendance time-range dropdown (1 Week / 1 Month / 3 Months / 6 Months / 1 Year)
- Hover tooltips on chart data points
- Click-to-expand grade detail modal
- Calendar drawer slide-in
- Responsive mobile navigation (hamburger → slide-over)
- Hover states and micro-animations on cards, bars, and buttons

---

## Responsive Design

The dashboard adapts across desktop, tablet, and mobile:

- **Desktop** — two-column asymmetric grid with persistent calendar strip and full sidebar
- **Tablet** — stacked layout, calendar strip visible, sidebar collapses
- **Mobile** — single-column stack, hamburger menu, calendar strip hidden, cards and charts resize to fit

---

## Data

All data in the dashboard is **realistic fictional sample data** representing a typical Indian school environment (student counts, attendance, staff, admissions, fees, classes, events, notices, and issues). This is defined in `src/data/schoolData.ts`.

---
