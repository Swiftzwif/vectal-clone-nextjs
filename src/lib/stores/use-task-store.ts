import { create } from 'zustand';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/services/taskService';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isDone: boolean;
  dueDate?: Date;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'isDone'>) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await fetchTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },
  
  addTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await createTask(taskData);
      set((state) => ({ 
        tasks: [...state.tasks, newTask],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add task', isLoading: false });
    }
  },
  
  toggleTaskStatus: async (id) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;
    
    try {
      const updatedTask = await updateTask(id, { isDone: !task.isDone });
      set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? updatedTask : t)
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
    }
  },
  
  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete task' });
    }
  }
}));