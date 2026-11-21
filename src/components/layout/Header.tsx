import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTab }) => {
  const tabName = currentTab === 'overview' ? 'Overview' : currentTab === 'tasks' ? 'My tasks' : currentTab === 'calendar' ? 'Calendar' : 'Settings';

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Desktop Breadcrumb / Mobile Brand */}
      <div className="flex items-center gap-2">
        {/* Mobile Logo Mark */}
        <div className="md:hidden flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm">
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
              <span className="w-1 h-1 bg-white rounded-[1.5px]" />
              <span className="w-1 h-1 bg-white rounded-[1.5px]" />
              <span className="w-1 h-1 bg-white rounded-[1.5px]" />
              <span className="w-1 h-1 bg-white rounded-[1.5px]" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">FocusBoard</span>
        </div>

        {/* Desktop Breadcrumb navigation matching Figma */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span className="hover:text-slate-600 transition-colors">Application</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-700 font-semibold">{tabName}</span>
        </nav>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-3">
        {/* Pro / Live badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100/60 text-[11px] font-semibold text-brand-700">
          <Sparkles className="w-3 h-3 text-brand-600" />
          <span>Active Session</span>
        </div>

        {/* User Profile Avatar matching Figma JD icon */}
        <div className="relative group cursor-pointer" tabIndex={0} aria-label="User Profile">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-400 flex items-center justify-center text-white font-semibold text-xs shadow-sm ring-2 ring-white">
            JD
          </div>
          <span 
            className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" 
            title="Online"
          />
        </div>
      </div>
    </header>
  );
};
