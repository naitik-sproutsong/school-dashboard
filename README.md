# School Administration Dashboard

An interactive, responsive school administration dashboard designed for a
school Principal / Administrator to get a quick overview of what is happening
across the institution and identify areas that require attention.

## Overview

This project was developed as part of the **SproutSong 3-Day Trainee Exercise
(1–3 October 2026)**.

The dashboard focuses on presenting important school information in a clear
visual hierarchy rather than displaying every available metric on the first
screen.

The primary persona for the dashboard is a **School Principal / Administrator**.

### Primary User Goal

> Understand the current state of the school quickly and identify anything
> that requires attention or action.

---

## Key Features

### Dashboard Overview
- Total students
- Student attendance
- Teacher/staff attendance
- New admissions this academic year

### Attendance Overview
- Monthly attendance trend
- Student and staff attendance
- Attendance percentage and present/absent information

### Classes & Grades
- Grade-level overview
- Section and student counts
- Detailed class information available through the dedicated page

### Staff Overview
- Total staff
- Permanent staff
- Visiting staff
- New staff onboarded this year
- Open staffing requirements

### Fee Collection
- Fee collection percentage displayed using a ring/donut chart
- Total collected amount
- Total pending amount

### Issues & Action Required
- School issues and complaints
- Status/priority indicators
- Action-oriented view of items requiring attention

### Notices
- Recent school announcements
- Important notices and dates

### Academic Calendar
- Persistent calendar tab on the right side of the dashboard
- Expandable calendar drawer
- Important academic events and dates

---

## Design Decisions

### 1. Persona

The dashboard is designed primarily for a **School Principal / Administrator**.

The exercise asks the designer to identify who would use the dashboard and
what they would want to know first. The dashboard therefore prioritizes
institution-wide information and decision-support rather than individual
student or teacher workflows. :contentReference[oaicite:2]{index=2}

### 2. Information Hierarchy

The dashboard follows this hierarchy:

1. **Current school status**
2. **Attendance and trends**
3. **Issues requiring attention**
4. **Upcoming events and notices**
5. **Staff and class overview**
6. **Detailed information through dedicated pages**

The intention is to avoid overwhelming the user with every school metric on the
first screen. The exercise specifically emphasizes prioritizing information
rather than displaying everything at once. :contentReference[oaicite:3]{index=3}

### 3. Card-Based Information Structure

Major dashboard sections are presented as containers with smaller internal
cards, metrics, charts and lists.

This creates a clear visual hierarchy:

**Dashboard → Section → Internal Card/Data → Detail**

The goal is to keep the interface information-rich without making it visually
dense.

### 4. Attendance as a Trend

Attendance is represented as a chart rather than only a single percentage so
the user can understand how attendance changes over time.

The interface also provides context selection/toggles where appropriate,
supporting the exercise requirement for meaningful interactions and
visualizations. :contentReference[oaicite:4]{index=4}

### 5. Calendar as a Secondary Layer

Instead of permanently occupying a large area of the dashboard, the academic
calendar is accessible through a persistent right-side drawer.

This keeps the main dashboard focused on current school status while allowing
academic dates and upcoming events to remain easily accessible.

### 6. Details Through Dedicated Pages

The dashboard provides summaries for areas such as students, staff, classes,
fees and notices.

More detailed information is accessed through navigation rather than placing
large tables or lists on the homepage.

This supports the exercise's emphasis on deciding what should be immediately
visible and what should remain secondary. :contentReference[oaicite:5]{index=5}

---

## Data

The dashboard uses **realistic fictional sample data** to represent a school
environment.

The data includes:
- Student counts
- Attendance
- Staff information
- Admissions
- Fees
- Classes
- Events
- Notices
- Issues

The exercise specifically asks for realistic sample data so that the dashboard
feels like a real school environment. :contentReference[oaicite:6]{index=6}

---

## Interactions

The dashboard includes meaningful interactions such as:

- Collapsible navigation
- Active navigation states
- Attendance view/context selection
- Calendar drawer open/close
- Hover states
- Interactive charts
- View-all/detail navigation
- Responsive mobile navigation

These interactions are intended to support the user's workflow rather than
being purely decorative. The exercise encourages meaningful interactions such
as filters, tabs, dropdowns, hover states, drill-downs, charts and search. :contentReference[oaicite:7]{index=7}

---

## Responsive Design

The dashboard is designed to remain usable across:

- Desktop
- Tablet
- Mobile

On smaller screens:
- Navigation adapts to available space
- Dashboard sections stack vertically
- Cards resize appropriately
- Charts remain readable
- The calendar drawer adapts to the mobile layout

Responsive usability is one of the stated requirements of the exercise.
:contentReference[oaicite:8]{index=8}

---

## Tech Stack

- React
- Tailwind CSS
- JavaScript
- Lucide React
---

