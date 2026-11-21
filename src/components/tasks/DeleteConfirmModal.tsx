import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

export const DeleteConfirmModal: React.FC = () => {
  const { taskToDelete, closeDeleteModal, confirmDelete } = useTaskContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && taskToDelete) {
        closeDeleteModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [taskToDelete, closeDeleteModal]);

  if (!taskToDelete) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in-0 duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="fixed inset-0" onClick={closeDeleteModal} />

      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-900">
              Delete task?
            </h3>
            <p id="delete-dialog-desc" className="text-xs sm:text-sm text-slate-500 mt-1">
              Are you sure you want to remove <span className="font-semibold text-slate-800">"{taskToDelete.title}"</span>? This action cannot be undone.
            </p>
          </div>
          <button
            onClick={closeDeleteModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-rose-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
};
