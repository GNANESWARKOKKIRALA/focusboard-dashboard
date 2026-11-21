import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Circle, 
  Calendar, 
  MoreVertical, 
  Pencil, 
  Trash2 
} from 'lucide-react';
import { Task, TaskPriority, TaskCategory } from '../../types/task';
import { useTaskContext } from '../../context/TaskContext';

interface TaskRowProps {
  task: Task;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const { cycleTaskStatus, updateTaskStatus, openEditModal, openDeleteModal } = useTaskContext();
  const [showMenu, setShowMenu] = useState(false);

  // Format date display (e.g. "Nov 22")
  const formattedDate = React.useMemo(() => {
    try {
      const parts = task.dueDate.split('-');
      if (parts.length === 3) {
        const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return task.dueDate;
    } catch {
      return task.dueDate;
    }
  }, [task.dueDate]);

  // Priority color styling
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-200/70';
      case 'medium':
        return 'bg-teal-50 text-teal-700 border-teal-200/70';
      case 'low':
        return 'bg-slate-100 text-slate-600 border-slate-200/70';
    }
  };

  // Category color styling
  const getCategoryBadge = (category: TaskCategory) => {
    switch (category) {
      case 'Design':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Development':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Content':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Marketing':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Research':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Operations':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  return (
    <div 
      className={`group relative bg-white border rounded-xl sm:rounded-2xl p-3.5 sm:p-4 transition-all duration-150 hover:shadow-sm ${
        isCompleted ? 'border-slate-100 bg-slate-50/40' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Section: Status Checkbox + Task Title & Description */}
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          {/* Quick Status Toggle Button */}
          <button
            onClick={() => cycleTaskStatus(task.id)}
            className="mt-0.5 sm:mt-0 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
            title={`Status: ${task.status.replace('_', ' ')}. Click to toggle next status.`}
            aria-label={`Toggle task status for ${task.title}`}
          >
            {isCompleted ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            ) : isInProgress ? (
              <div className="w-5 h-5 rounded-full border-2 border-brand-600 bg-brand-50 text-brand-600 flex items-center justify-center">
                <Clock className="w-3 h-3 stroke-[2.5]" />
              </div>
            ) : (
              <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400 stroke-[1.75]" />
            )}
          </button>

          {/* Task Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 
                className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                  isCompleted ? 'line-through text-slate-400' : 'text-slate-900 group-hover:text-brand-700'
                }`}
              >
                {task.title}
              </h3>
              {task.progress !== undefined && task.progress > 0 && task.progress < 100 && (
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded">
                  {task.progress}%
                </span>
              )}
            </div>
            {task.description && (
              <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Badges, Due Date, and Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 pl-9 sm:pl-0 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Category Badge */}
            <span 
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(task.category)}`}
            >
              {task.category}
            </span>

            {/* Priority Badge */}
            <span 
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize ${getPriorityBadge(task.priority)}`}
            >
              {task.priority}
            </span>

            {/* Due Date */}
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium px-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditModal(task)}
                className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                title="Edit task"
                aria-label={`Edit task ${task.title}`}
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => openDeleteModal(task)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete task"
                aria-label={`Delete task ${task.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors sm:hidden"
                title="More options"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Dropdown quick status changer */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)} 
                />
                <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-slate-100 rounded-xl shadow-lg py-1 text-xs text-slate-700 animate-in fade-in-50">
                  <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase">
                    Change Status
                  </div>
                  <button
                    onClick={() => { updateTaskStatus(task.id, 'todo'); setShowMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>To do</span>
                    {task.status === 'todo' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                  <button
                    onClick={() => { updateTaskStatus(task.id, 'in_progress'); setShowMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>In progress</span>
                    {task.status === 'in_progress' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                  <button
                    onClick={() => { updateTaskStatus(task.id, 'completed'); setShowMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Completed</span>
                    {task.status === 'completed' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
