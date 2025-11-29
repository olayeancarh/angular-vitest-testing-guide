import { Component, computed, signal } from '@angular/core';
import { Task, TaskFilter } from './models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks = signal<Task[]>([]); // Signal for the task lists
  newTaskText = signal<string>(''); // Signal for task input field
  filter = signal<TaskFilter>('all'); // Task filter
  private nextId = 1; // AutoIncrementing ID

  // Computed signals
  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const currentFilter = this.filter();

    switch (currentFilter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  // Active/Un-completed tasks count
  activeTasksCount = computed(() => this.tasks().filter((t) => !t.completed).length);

  // Completed tasks count
  completedTasksCount = computed(() => this.tasks().filter((t) => t.completed).length);

  // Add new task
  addTask() {
    const text = this.newTaskText().trim();
    if (!text) return;

    const newTask: Task = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
    this.newTaskText.set('');
  }

  // Toggle task
  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  // Update task text
  updateTaskText(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newTaskText.set(input.value);
  }

  // Delete task
  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  // Set filter
  setFilter(filter: TaskFilter) {
    this.filter.set(filter);
  }

  // Clear completed
  clearCompleted() {
    this.tasks.update((tasks) => tasks.filter((task) => !task.completed));
  }
}
