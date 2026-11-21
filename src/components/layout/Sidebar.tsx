import React from 'react';
import { LayoutGrid, ListTodo, Calendar, Settings, RotateCcw } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { stats, resetToSampleData } = useTaskContext();

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutGrid,
      count: null,
    },
    {
      id: 'tasks',
      label: 'My tasks',
      icon: ListTodo,
      count: stats.total,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      count: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      count: null,
    },
  ];

  return (
    <aside 
      className="hidden md:flex flex-col w-60 lg:w-64 bg-white border-r border-slate-100 min-h-screen p-5 shrink-0 select-none"
      aria-label="Main Navigation"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md shadow-brand-500/20">
          <div className="grid grid-cols-2 gap-1 w-4 h-4">
            <span className="w-1.5 h-1.5 bg-white rounded-[2px]" />
            <span className="w-1.5 h-1.5 bg-white rounded-[2px]" />
            <span className="w-1.5 h-1.5 bg-white rounded-[2px]" />
            <span className="w-1.5 h-1.5 bg-white rounded-[2px]" />
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">FocusBoard</span>
      </div>

      {/* Navigation Group */}
      <div className="flex-1">
        <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2.5">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Utility Section */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <button
          onClick={resetToSampleData}
          title="Restore original sample tasks"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-colors border border-dashed border-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <div className="px-2 text-[11px] text-slate-400 text-center">
          FocusBoard v1.0 • Candidate Task
        </div>
      </div>
    </aside>
  );
};
