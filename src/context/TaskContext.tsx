import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority, TaskStats, FocusNoteSlide } from '../types/task';
import { INITIAL_TASKS } from '../data/initialTasks';
import { FOCUS_NOTE_SLIDES } from '../data/focusNotes';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  stats: TaskStats;
  
  // Search and Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'all' | TaskStatus;
  setStatusFilter: (status: 'all' | TaskStatus) => void;
  priorityFilter: 'all' | TaskPriority;
  setPriorityFilter: (priority: 'all' | TaskPriority) => void;
  
  // Task Operations (Mutations)
  addTask: (data: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  cycleTaskStatus: (id: string) => void;
  resetToSampleData: () => void;
  
  // Modal State Management
  isTaskModalOpen: boolean;
  editingTask: Task | null;
  openCreateModal: () => void;
  openEditModal: (task: Task) => void;
  closeTaskModal: () => void;
  
  // Delete Confirmation State
  taskToDelete: Task | null;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
  confirmDelete: () => void;
  
  // Carousel State
  activeSlideIndex: number;
  slides: FocusNoteSlide[];
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  
  // Toast Notifications
  toast: ToastMessage | null;
  dismissToast: () => void;
}

const STORAGE_KEY = 'focusboard_tasks_v1';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial tasks safely from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse tasks from localStorage:', err);
    }
    return INITIAL_TASKS;
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Carousel state
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // Derived Statistics (Calculated dynamically, not hardcoded)
  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length;
    let inProgress = 0;
    let completed = 0;
    let todo = 0;

    for (const t of tasks) {
      if (t.status === 'in_progress') inProgress++;
      else if (t.status === 'completed') completed++;
      else if (t.status === 'todo') todo++;
    }

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      todo,
      completionPercentage,
    };
  }, [tasks]);

  // Derived Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter (case-insensitive check against title and description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        const matchesCategory = task.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
        return false;
      }

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Predictable state mutations
  const addTask = useCallback((data: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...data,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      progress: data.status === 'completed' ? 100 : data.status === 'in_progress' ? 50 : 0,
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" created successfully!`);
    setIsTaskModalOpen(false);
  }, [showToast]);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          if (updates.status === 'completed' && updated.progress !== 100) {
            updated.progress = 100;
          } else if (updates.status === 'todo' && updated.progress === 100) {
            updated.progress = 0;
          }
          return updated;
        }
        return t;
      })
    );
    showToast('Task updated successfully!');
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, [showToast]);

  const deleteTask = useCallback((id: string) => {
    const target = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast(`Task "${target?.title || 'item'}" deleted.`, 'info');
  }, [tasks, showToast]);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          let progress = t.progress;
          if (status === 'completed') progress = 100;
          else if (status === 'in_progress' && (progress === 0 || progress === 100 || progress === undefined)) progress = 50;
          else if (status === 'todo') progress = 0;
          return { ...t, status, progress };
        }
        return t;
      })
    );
  }, []);

  const cycleTaskStatus = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          let nextStatus: TaskStatus;
          let nextProgress = 0;

          if (t.status === 'todo') {
            nextStatus = 'in_progress';
            nextProgress = 50;
          } else if (t.status === 'in_progress') {
            nextStatus = 'completed';
            nextProgress = 100;
          } else {
            nextStatus = 'todo';
            nextProgress = 0;
          }

          return { ...t, status: nextStatus, progress: nextProgress };
        }
        return t;
      })
    );
  }, []);

  const resetToSampleData = useCallback(() => {
    setTasks(INITIAL_TASKS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    showToast('Sample data restored.', 'info');
  }, [showToast]);

  // Modal triggers
  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const openEditModal = useCallback((task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, []);

  const openDeleteModal = useCallback((task: Task) => {
    setTaskToDelete(task);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  // Carousel controls
  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % FOCUS_NOTE_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + FOCUS_NOTE_SLIDES.length) % FOCUS_NOTE_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < FOCUS_NOTE_SLIDES.length) {
      setActiveSlideIndex(index);
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        stats,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        cycleTaskStatus,
        resetToSampleData,
        isTaskModalOpen,
        editingTask,
        openCreateModal,
        openEditModal,
        closeTaskModal,
        taskToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        activeSlideIndex,
        slides: FOCUS_NOTE_SLIDES,
        nextSlide,
        prevSlide,
        goToSlide,
        toast,
        dismissToast,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
