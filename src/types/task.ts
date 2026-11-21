export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'Design' | 'Development' | 'Content' | 'Marketing' | 'Research' | 'Operations';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // formatted e.g. "2026-11-22"
  progress?: number; // 0-100 percentage
  createdAt: string;
}

export interface FocusNoteSlide {
  id: number;
  slideNumber: string; // "01 / 03"
  title: string;
  subtitle: string;
  featuredTitle: string;
  featuredProgress: number;
  featuredStatus: string;
}

export interface TaskStats {
  total: number;
  inProgress: number;
  completed: number;
  todo: number;
  completionPercentage: number;
}
