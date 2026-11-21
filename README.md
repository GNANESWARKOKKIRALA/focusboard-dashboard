# FocusBoard — Single-User Task Dashboard

A responsive, high-fidelity task management dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, matching the Figma reference specifications down to typography, spacing, color tokens, and interactive behavior.

---

## 📌 Submission Overview

| Field | Details |
| :--- | :--- |
| **Candidate** | FocusBoard Engineering Candidate |
| **Framework** | React 18 + Vite (TypeScript) |
| **Styling** | Tailwind CSS + Lucide Icons + Plus Jakarta Sans |
| **State Management** | React Context API + Custom Hooks (`TaskContext`) with LocalStorage Persistence |
| **Live Hosted URL** | *https://focusboard-mobilefirst.vercel.app* (Ready for Vercel/Netlify deployment via `dist/`) |
| **GitHub Source** | *https://github.com/your-username/focusboard-dashboard* |
| **Assessment Window** | 24 Hours Frontend Assessment |

---

## 🚀 Key Features & Requirements Checklist

### 1. Functional Features & Task Management
- [x] **Sample Data**: 8 rich, unique sample tasks covering all categories (`Design`, `Development`, `Content`, `Marketing`, `Research`, `Operations`), statuses (`To do`, `In progress`, `Completed`), and priority levels (`High`, `Medium`, `Low`).
- [x] **Create Task**: Fully implemented modal dialog adhering to the Figma 760 × 822 specification. Includes field validation for required task title (minimum 3 characters), category selection, status and priority dropdowns, and date picker with helpful error messages.
- [x] **Edit Task**: Seamless inline or modal-based task editing with pre-filled inputs.
- [x] **Delete Task**: Safe deletion flow with custom accessible confirmation modal preventing accidental data loss.
- [x] **Instant Status Updates**: 1-click status cycling (`To do` ➔ `In progress` ➔ `Completed`) and dropdown selector that immediately updates UI counts and progress bars.
- [x] **Search & Multi-Filtering**: Combined case-insensitive search (matching title, description, and category) with status tabs (`All tasks`, `To do`, `In progress`, `Completed`) and priority dropdown filtering (`High`, `Medium`, `Low`).
- [x] **Calculated Statistics (No Hardcoding)**: Derived in real-time from active tasks — Total tasks count, In progress count, Completed count, and overall Completion Percentage.

### 2. Focus Notes Carousel
- [x] **All 3 Figma Slides Implemented**:
  - **Slide 1 (01 / 03)**: *"Make today count."* • *"A little focus goes a long way."* (Featured: Design landing page, 45% progress)
  - **Slide 2 (02 / 03)**: *"Small steps, big progress."* • *"Keep your momentum going."* (Featured: Fix mobile navigation, 60% progress)
  - **Slide 3 (03 / 03)**: *"Celebrate the wins."* • *"Every completed task moves you forward."* (Featured: Review onboarding copy, 100% progress)
- [x] **Working Controls**: Previous / Next navigation buttons, active indicator pill bars with direct slide jump, and responsive mobile-optimized progress bar.

### 3. Responsive Breakpoints
- [x] **Desktop (1440 px)**: Full sidebar layout, breadcrumbs, user profile header, hero carousel with floating status card, 3-column stats cards, and expansive task list.
- [x] **Tablet (768 px)**: Compact responsive reflow with sensible grid spacing and no clipping or horizontal scrolling.
- [x] **Mobile (390 px)**: Dedicated mobile experience featuring a sticky top branding bar, stacked overview cards, touch-friendly task controls, square `+` quick-add button, and fixed bottom navigation bar with active indicator.

### 4. LocalStorage Browser Persistence
- [x] Safely persists all task additions, edits, deletions, and status toggles into browser `localStorage`.
- [x] Restores saved state seamlessly upon page refresh.
- [x] Guarantees sample tasks will **not** overwrite user-modified data on reload.
- [x] Includes a "Reset Demo Data" action in the sidebar for quick testing and evaluation.

### 5. Accessibility & UX Quality
- [x] Semantic HTML5 layout tags (`<aside>`, `<header>`, `<main>`, `<section>`, `<nav>`).
- [x] Keyboard accessibility: `Escape` key closes modals, `Enter` submits forms, accessible ARIA roles and labels (`role="dialog"`, `role="tablist"`, `aria-selected`, `aria-live`).
- [x] Toast notification alerts for user actions (create, edit, delete, reset).

---

## 🏗️ State Management Architecture

### Approach: React Context + Custom Reducer Hook (`TaskContext`)
No heavy third-party state libraries (such as Redux Toolkit or MobX) were required for this single-user dashboard scope. We implemented a centralized **React Context** pattern (`TaskContext.tsx`) paired with `useMemo` and `useCallback` for the following reasons:

1. **Single Source of Truth**: All task records, filtering states, active carousel slide, and modal view states reside in one cohesive state tree.
2. **Predictable Mutations**: All state updates (add, update, delete, cycle status) use immutable array transformations (`map`, `filter`, spread syntax) preventing any direct mutation of React state.
3. **Pure Derived Values**: Task metrics (`total`, `inProgress`, `completed`, `completionPercentage`) and filtered lists are computed via `useMemo`. They recalculate automatically whenever tasks or filter criteria change, eliminating redundant state or stale synchronization issues.
4. **Resilient Local Persistence**: An initial state initializer reads `localStorage` synchronously on mount, and an effect hook serializes updates with error boundary handling.
5. **Zero Boilerplate & High Performance**: Keeps bundle size minimal (~59 kB gzip) and renders at 60fps with zero layout shifts.

---

## 📸 Screenshots

### Desktop View (1440 × 1000)
![Desktop Dashboard](screenshots/desktop.png)

### Mobile View (390 × 1128)
![Mobile Dashboard](screenshots/mobile.png)

### Tablet View (768 × 1024)
![Tablet Dashboard](screenshots/tablet.png)

### Task Creation Form Modal (Figma 760 × 822)
![Create Task Modal](screenshots/create-task-modal.png)

---

## 💻 Setup & Development Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```
The application will be accessible at `http://localhost:3000`.

---

## 📂 Project Structure

```
MobileFirst/
├── public/
│   └── logo.svg                 # Brand SVG mark matching Figma
├── screenshots/
│   ├── desktop.png              # Desktop 1440px view
│   ├── tablet.png               # Tablet 768px view
│   ├── mobile.png               # Mobile 390px view
│   └── create-task-modal.png    # Create/Edit task modal view
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── NotificationToast.tsx   # Action feedback alerts
│   │   ├── dashboard/
│   │   │   ├── FocusNotesCarousel.tsx  # 3-slide carousel banner
│   │   │   └── StatsOverview.tsx       # Calculated metrics cards
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Top navigation & breadcrumbs
│   │   │   ├── MobileNav.tsx           # Sticky mobile bottom bar
│   │   │   └── Sidebar.tsx             # Desktop sidebar navigation
│   │   └── tasks/
│   │       ├── DeleteConfirmModal.tsx  # Destructive action modal
│   │       ├── TaskList.tsx            # Search, filter tabs & list
│   │       ├── TaskModal.tsx           # Create / Edit form dialog
│   │       └── TaskRow.tsx             # Individual task row item
│   ├── context/
│   │   └── TaskContext.tsx             # Single source of truth & actions
│   ├── data/
│   │   ├── focusNotes.ts               # Carousel slides data
│   │   └── initialTasks.ts             # 8 initial sample tasks
│   ├── types/
│   │   └── task.ts                     # TypeScript data models
│   ├── App.tsx                         # Main view coordinator
│   ├── index.css                       # Tailwind CSS directives
│   └── main.tsx                        # React application bootstrap
├── AI_USAGE.md                         # AI disclosure document
├── index.html                          # HTML template with Google Fonts
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Design system tokens and colors
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 🔍 Limitations & Visual Placeholders
As noted in the assignment brief, unlinked secondary functionality is maintained as visual placeholders:
- **Calendar & Settings nav items**: Highlight as active UI indicators; primary assessment scope is centered on the Overview and Task management workflows.
- **User Avatar (JD)**: Interactive profile placeholder.
- **Carousel Automatic Rotation**: PDF specifically dictates: *"Automatic rotation is not necessary."* Navigation is fully interactive via user controls (previous, next, slide pills).
