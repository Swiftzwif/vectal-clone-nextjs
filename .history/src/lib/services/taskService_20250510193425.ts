import { Task } from '@/lib/stores/use-task-store';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks');
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  const data = await response.json();
  return data.tasks;
}

export async function createTask(taskData: Omit<Task, 'id' | 'isDone'>): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  
  const data = await response.json();
  return data.task;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  
  const data = await response.json();
  return data.task;
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}