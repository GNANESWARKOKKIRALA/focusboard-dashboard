import React from 'react';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

export const StatsOverview: React.FC = () => {
  const { stats } = useTaskContext();

  const statCards = [
    {
      id: 'total',
      label: 'Total tasks',
      count: stats.total,
      subtext: 'Across all projects',
      icon: ListTodo,
      iconBg: 'bg-indigo-50 text-brand-600',
      badge: `${stats.todo} to do`,
      badgeBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'in_progress',
      label: 'In progress',
      count: stats.inProgress,
      subtext: 'Currently active tasks',
      icon: Clock,
      iconBg: 'bg-sky-50 text-sky-600',
      badge: `${stats.inProgress > 0 ? 'Active' : 'None'}`,
      badgeBg: 'bg-sky-50 text-sky-700',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: stats.completed,
      subtext: `${stats.completionPercentage}% completion rate`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: `${stats.completionPercentage}%`,
      badgeBg: 'bg-emerald-50 text-emerald-700',
      trendIcon: TrendingUp,
    },
  ];

  return (
    <section aria-label="Task Statistics Overview" className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        const TrendIcon = card.trendIcon;
        const isThirdOnMobile = idx === 2;

        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between ${
              isThirdOnMobile ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            {/* Header: Icon and Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${card.badgeBg}`}>
                {TrendIcon && <TrendIcon className="w-3 h-3" />}
                {card.badge}
              </span>
            </div>

            {/* Content: Big Number and Labels */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.count}
                </span>
                <span className="text-xs font-semibold text-slate-600">{card.label}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
