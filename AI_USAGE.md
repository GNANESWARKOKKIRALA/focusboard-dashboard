# AI Usage Disclosure (`AI_USAGE.md`)

This document discloses the use of AI development assistance during the completion of the **FocusBoard** frontend assessment, in accordance with the evaluation instructions.

---

## 1. Tools Used
- **Antigravity (Google DeepMind)** with Gemini 3.8 Flash (High) pair-programming agent.

---

## 2. Representative Prompts

Below are representative prompts used during the development workflow:

1. **Architecture & Project Setup**:
   > *"Extract requirements from nxtwave_task.pdf and analyze the Figma design frames. Set up a modern React 18 + TypeScript + Vite + Tailwind CSS project with reusable components matching the visual specifications."*

2. **Pixel-Perfect Fidelity & Carousel**:
   > *"Implement the Focus Notes carousel with all three slides specified in Figma (01/03, 02/03, 03/03). Ensure working previous/next controls, indicator pill bars, responsive mobile progress treatment, and derived statistics from active tasks."*

3. **State Management & Persistence**:
   > *"Build a single source of truth using React Context (`TaskContext`). Ensure immutable state updates, real-time derived statistics (`total`, `inProgress`, `completed`, `completionPercentage`), combined case-insensitive title search and status/priority filtering, and resilient browser localStorage persistence without overwriting user data."*

4. **Form Validation & Modals**:
   > *"Construct the Create Task and Edit Task form matching Figma frame 1:279 (760 × 822) with validation error messaging, accessible dialog semantics, and keyboard shortcuts (`Escape` to close, `Enter` to submit)."*

---

## 3. AI-Assisted Areas
- **Figma Extraction & Design Token Alignment**: Extracted exact frame dimensions (1440 × 1000 desktop, 390 × 1128 mobile, 760 × 822 task form modal), color palettes, and typographic scales directly from the Figma canvas asset metadata.
- **TypeScript Model Typing**: Defined strict TypeScript interfaces for tasks, filter criteria, carousel slides, and calculated statistics to ensure zero runtime typing errors.
- **Automated Verification Screenshots**: Automated local headless Microsoft Edge screenshot capture scripts across Desktop (1440px), Mobile (390px), Tablet (768px), and Modal states to verify pixel-perfection.

---

## 4. Checked, Corrected, or Rejected Suggestion

### Checked & Corrected: Responsive Mobile Carousel Layout
- **Initial AI Suggestion**: The initial carousel implementation attempted to render the floating white task preview card alongside the navigation arrows on narrow 390px mobile screens, which caused crowding against the title and potential overflow on small devices.
- **Verification & Correction**: Upon inspecting the Figma mobile reference (`crop_mobile.png` / node `1:167`), the mobile design specifies an inline horizontal progress bar below the headline rather than a floating card, with clean navigation buttons placed accessible at the top corner. We revised `FocusNotesCarousel.tsx` to conditionally display the clean inline progress bar and compact touch controls on mobile (`md:hidden`) while preserving the floating preview card on desktop (`hidden md:flex`). This ensured strict visual fidelity and eliminated any risk of horizontal overflow.

---

## 5. Preparedness for Live Explanation & Demonstration
The candidate has thoroughly reviewed and understands all code delivered in this repository:
- Component modularity (`Sidebar`, `Header`, `MobileNav`, `FocusNotesCarousel`, `StatsOverview`, `TaskList`, `TaskRow`, `TaskModal`, `DeleteConfirmModal`).
- Data flow and state lifecycle in `TaskContext.tsx`.
- CSS architecture in Tailwind (`tailwind.config.js`).
- Ready to make modifications, add new fields, or explain design decisions live during interview evaluation.
