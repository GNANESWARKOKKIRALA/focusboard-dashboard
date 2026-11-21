import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { FocusNotesCarousel } from './components/dashboard/FocusNotesCarousel';
import { StatsOverview } from './components/dashboard/StatsOverview';
import { TaskList } from './components/tasks/TaskList';
import { TaskModal } from './components/tasks/TaskModal';
import { DeleteConfirmModal } from './components/tasks/DeleteConfirmModal';
import { NotificationToast } from './components/common/NotificationToast';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { openCreateModal } = useTaskContext();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row antialiased text-slate-800">
      {/* Desktop / Tablet Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-12">
        {/* Top Header */}
        <Header currentTab={activeTab} />

        {/* Dashboard Main View */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
          {/* Greeting Hero Header matching Figma */}
          <section aria-label="Dashboard Overview Header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                Your work, in focus.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Plan your day, stay organized, and get more done.
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New task</span>
            </button>
          </section>

          {/* Focus Notes Carousel Banner (Figma Slides 1, 2, 3) */}
          <FocusNotesCarousel />

          {/* Overview Statistics Cards */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1 md:hidden">
              Overview
            </h2>
            <StatsOverview />
          </div>

          {/* Tasks Section with Search, Tabs, Priority Filter, and Actions */}
          <TaskList />
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task Creation & Editing Modal */}
      <TaskModal />

      {/* Deletion Confirmation Modal */}
      <DeleteConfirmModal />

      {/* Action Notification Toasts */}
      <NotificationToast />
    </div>
  );
};

export function App() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
}

export default App;
