import React from 'react';
import { LayoutGrid, ListTodo, Calendar, Settings } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { stats } = useTaskContext();

  const items = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, badge: stats.total },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 py-1.5 px-4 flex justify-around items-center shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
              isActive ? 'text-brand-600 font-semibold' : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative">
              <Icon className="w-5 h-5 mb-0.5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-6 h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
