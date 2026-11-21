import React from 'react';
import { Search, Plus, Filter, X, Inbox } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { TaskRow } from './TaskRow';
import { TaskStatus, TaskPriority } from '../../types/task';

export const TaskList: React.FC = () => {
  const { 
    filteredTasks, 
    tasks, 
    stats,
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    priorityFilter, 
    setPriorityFilter,
    openCreateModal
  } = useTaskContext();

  const statusTabs: { id: 'all' | TaskStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All tasks', count: stats.total },
    { id: 'todo', label: 'To do', count: stats.todo },
    { id: 'in_progress', label: 'In progress', count: stats.inProgress },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  return (
    <section aria-labelledby="tasks-heading" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-100 shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 id="tasks-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            My tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Manage and track everything in one place
          </p>
        </div>

        {/* Action Button: square on mobile matching Figma, full text on sm+ */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 shrink-0"
          title="New task"
          aria-label="New task"
        >
          <Plus className="w-5 h-5 sm:w-4 sm:h-4 stroke-[2.5]" />
          <span className="hidden sm:inline ml-1.5">New task</span>
        </button>
      </div>

      {/* Toolbar: Status Tabs + Search & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-5 border-b border-slate-100">
        {/* Status Tabs matching Figma */}
        <div 
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
          role="tablist"
          aria-label="Filter tasks by status"
        >
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 shadow-2xs ring-1 ring-brand-500/20'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-brand-100/80 text-brand-700' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and Priority Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
              aria-label="Search tasks"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Priority Filter Dropdown */}
          <div className="relative shrink-0">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'all' | TaskPriority)}
              className="appearance-none pl-8 pr-7 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all cursor-pointer"
              aria-label="Filter tasks by priority"
            >
              <option value="all">Priority: All</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Pill Helper (if filters active) */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 mt-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-700">Filters:</span>
            {searchQuery && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                "{searchQuery}"
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 capitalize">
                Status: {statusFilter.replace('_', ' ')}
              </span>
            )}
            {priorityFilter !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 capitalize">
                Priority: {priorityFilter}
              </span>
            )}
            <span className="text-slate-400 font-medium">({filteredTasks.length} results)</span>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-brand-600 hover:text-brand-700 font-semibold text-xs ml-2"
          >
            Reset
          </button>
        </div>
      )}

      {/* Task Rows List */}
      <div className="mt-4 space-y-2.5">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))
        ) : (
          /* Empty State */
          <div className="py-12 sm:py-16 text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              {tasks.length === 0 ? 'No tasks yet' : 'No matching tasks'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {tasks.length === 0
                ? 'Get started by creating your first task to stay focused.'
                : 'Try adjusting your search query, status tab, or priority filter.'}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearAllFilters}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Clear all filters
              </button>
            ) : (
              <button
                onClick={openCreateModal}
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
              >
                Create task
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
