export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';
