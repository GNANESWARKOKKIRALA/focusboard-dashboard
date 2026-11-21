import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

export const NotificationToast: React.FC = () => {
  const { toast, dismissToast } = useTaskContext();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200"
    >
      <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 border border-slate-800 text-xs sm:text-sm font-medium max-w-sm">
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        <span className="flex-1 text-slate-100">{toast.message}</span>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-0.5 rounded-md transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
