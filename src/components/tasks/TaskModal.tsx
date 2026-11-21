import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { TaskStatus, TaskPriority, TaskCategory } from '../../types/task';

export const TaskModal: React.FC = () => {
  const { isTaskModalOpen, editingTask, closeTaskModal, addTask, updateTask } = useTaskContext();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Design');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  
  // Validation error state
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // Sync form with editingTask or clear when modal opens/changes
  useEffect(() => {
    if (isTaskModalOpen) {
      if (editingTask) {
        setTitle(editingTask.title);
        setDescription(editingTask.description || '');
        setCategory(editingTask.category);
        setStatus(editingTask.status);
        setPriority(editingTask.priority);
        setDueDate(editingTask.dueDate);
      } else {
        // Defaults for new task
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('todo');
        setPriority('medium');
        // Default due date: tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDueDate(tomorrow.toISOString().split('T')[0]);
      }
      setError(null);
      setIsTouched(false);

      // Focus title input
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isTaskModalOpen, editingTask]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTaskModalOpen) {
        closeTaskModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTaskModalOpen, closeTaskModal]);

  if (!isTaskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);

    if (!title.trim()) {
      setError('Task title is required. Please give your task a clear name.');
      titleInputRef.current?.focus();
      return;
    }

    if (title.trim().length < 3) {
      setError('Task title must be at least 3 characters long.');
      titleInputRef.current?.focus();
      return;
    }

    if (!dueDate) {
      setError('Please select a valid due date.');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        status,
        priority,
        dueDate,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        category,
        status,
        priority,
        dueDate,
      });
    }
  };

  const categories: TaskCategory[] = [
    'Design',
    'Development',
    'Content',
    'Marketing',
    'Research',
    'Operations',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in-0 duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={closeTaskModal} />

      {/* Modal Dialog Card matching Figma 760 x 822 */}
      <div className="relative w-full max-w-[580px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {editingTask ? 'Edit task' : 'Create new task'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {editingTask ? 'Update the details and progress of your task.' : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button
            onClick={closeTaskModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
          {/* Validation Error Banner */}
          {error && (
            <div 
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in slide-in-from-top-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Task Title Input */}
          <div>
            <label htmlFor="task-title" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Task title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              onBlur={() => setIsTouched(true)}
              placeholder="e.g. Design landing page mockups"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                error && isTouched && !title.trim()
                  ? 'border-rose-400 focus:ring-rose-500/30'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/30'
              }`}
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="task-desc" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Description
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes, context, or checklist items..."
              className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-all resize-none"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    category === cat
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status & Priority 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status Select */}
            <div>
              <label htmlFor="task-status" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-all"
              >
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority Select */}
            <div>
              <label htmlFor="task-priority" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Due Date Input */}
          <div>
            <label htmlFor="task-due-date" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Due date
            </label>
            <div className="relative">
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-all"
                required
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">* Required field</p>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              {editingTask ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
