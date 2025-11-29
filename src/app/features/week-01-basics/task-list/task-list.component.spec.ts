import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Component Setup', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty tasks array initially', () => {
      expect(component.tasks()).toEqual([]);
    });

    it('should have empty newTaskText initially', () => {
      expect(component.newTaskText()).toBe('');
    });

    it('should have "all" filter set by default', () => {
      expect(component.filter()).toEqual('all');
    });

    it('should display empty state message initially', () => {
      const emptyState = compiled.querySelector('[data-testid="empty-state"]');
      expect(emptyState).toBeTruthy();
      expect(emptyState?.textContent).toContain('No tasks yet. Add one to get started...');
    });
  });

  describe('Adding Tasks', () => {
    it('should add a task with valid text', () => {
      // Arrange
      component.newTaskText.set('Go to the market');
      // Act
      component.addTask();
      // Assert
      expect(component.tasks().length).toBe(1);
      expect(component.tasks()[0].text).toBe('Go to the market');
      expect(component.tasks()[0].completed).toBeFalsy();
    });

    it('should clear the input field after adding a task', () => {
      // Arrange
      component.newTaskText.set('Go to the market');
      // Act
      component.addTask();
      // Assert
      expect(component.newTaskText()).toBe('');
    });

    it('should not add a task with empty text', () => {
      // Arrange
      component.newTaskText.set('');

      // Act
      component.addTask();

      // Assert
      expect(component.tasks().length).toBe(0);
    });

    it('should not add a task with whitespace text', () => {
      // Arrange
      component.newTaskText.set('   ');

      // Act
      component.addTask();

      // Assert
      expect(component.tasks().length).toBe(0);
    });

    it('should trim whitespace from task text', () => {
      // Arrange
      component.newTaskText.set('   Go to the market   ');
      // Act
      component.addTask();
      // Assert
      expect(component.tasks().length).toBe(1);
      expect(component.tasks()[0].text).toBe('Go to the market');
    });

    it('should add unique IDs to tasks', () => {
      // Arrange & Act
      component.newTaskText.set('Task 1');
      component.addTask();

      component.newTaskText.set('Task 2');
      component.addTask();

      component.newTaskText.set('Task 3');
      component.addTask();

      // Assert
      const ids = component.tasks().map((task) => task.id);
      expect(ids).toEqual([1, 2, 3]);
      expect(new Set(ids).size).toBe(3); // Ensure all IDs are unique
    });

    it('should add createAt timestamp', () => {
      // Arrange
      const before = new Date();
      component.newTaskText.set('Task 1');

      // Act
      component.addTask();
      const after = new Date();

      // Assert
      const task = component.tasks()[0];
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.createdAt!.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(task.createdAt!.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should update the DOM when a task is added', () => {
      // Arrange
      component.newTaskText.set('Go to the market');

      // Act
      component.addTask();
      fixture.detectChanges();

      // Assert
      const taskItems = compiled.querySelectorAll('[data-testid^="task-item-"]');
      expect(taskItems.length).toBe(1);
      expect(taskItems[0].textContent).toContain('Go to the market');
    });
  });

  describe('Toggling Tasks', () => {
    beforeEach(() => {
      // Add a test task before each toggle test
      component.newTaskText.set('Task 1');
      component.addTask();
    });

    it('should mark active task as completed', () => {
      // Arrange
      const taskId = component.tasks()[0].id;
      expect(component.tasks()[0].completed).toBe(false);

      // Act
      component.toggleTask(taskId);

      // Assert
      expect(component.tasks()[0].completed).toBe(true);
    });

    it('should mark completed task as active', () => {
      // Arrange
      const taskId = component.tasks()[0].id;
      component.toggleTask(taskId); // First toggle to complete
      expect(component.tasks()[0].completed).toBe(true);

      // Act
      component.toggleTask(taskId); // Toggle back to active

      // Assert
      expect(component.tasks()[0].completed).toBe(false);
    });

    it('should toggle only the correct task', () => {
      // Arrange - Add two more tasks
      component.newTaskText.set('Task 2');
      component.addTask();
      component.newTaskText.set('Task 3');
      component.addTask();

      const middleTaskId = component.tasks()[1].id;

      // Act
      component.toggleTask(middleTaskId);

      // Assert
      expect(component.tasks()[0].completed).toBe(false); // First unchanged
      expect(component.tasks()[1].completed).toBe(true); // Middle toggled
      expect(component.tasks()[2].completed).toBe(false); // Last unchanged
    });

    it('should update completed count when toggling', () => {
      // Arrange
      expect(component.completedTasksCount()).toBe(0);
      const taskId = component.tasks()[0].id;

      // Act
      component.toggleTask(taskId);

      // Assert
      expect(component.completedTasksCount()).toBe(1);
    });

    it('should update active count when toggling', () => {
      // Arrange
      expect(component.activeTasksCount()).toBe(1);
      const taskId = component.tasks()[0].id;

      // Act
      component.toggleTask(taskId);

      // Assert
      expect(component.activeTasksCount()).toBe(0);
    });

    it('should apply completed CSS class in DOM', () => {
      // Arrange
      const taskId = component.tasks()[0].id;

      // Act
      component.toggleTask(taskId);
      fixture.detectChanges();

      // Assert
      const taskElement = compiled.querySelector(`[data-testid="task-item-${taskId}"]`);
      expect(taskElement?.classList.contains('completed')).toBe(true);
    });
  });

  describe('Deleting Tasks', () => {
    beforeEach(() => {
      // Add a test task before each delete
      component.newTaskText.set('Task 1');
      component.addTask();
    });

    it('should delete an existing task', () => {
      // Arrange
      const taskId = component.tasks()[0].id;
      // Act
      component.deleteTask(taskId);
      // Assert
      expect(component.tasks().length).toBe(0);
    });

    it('should delete the correct task when multiple tasks exist', () => {
      // Arrange: Add more tasks.
      component.newTaskText.set('Task 2');
      component.addTask();

      component.newTaskText.set('Task 3');
      component.addTask();

      const taskId = component.tasks()[1].id;

      // Act: Delete a specific task (e.g., the middle one).
      component.deleteTask(taskId);

      // Assert: Check that the correct task is removed and others remain.
      expect(component.tasks().length).toBe(2);
      expect(component.tasks().map((t) => t.id)).not.toContain(taskId);
      expect(component.tasks().map((t) => t.id)).toEqual([1, 3]);
    });

    it('should update active task count when an active task is deleted', () => {
      // Arrange
      component.newTaskText.set('Task 2');
      component.addTask();
      const taskId = component.tasks()[0].id;
      // Act
      component.deleteTask(taskId);
      // Assert: The active task count should be zero.
      expect(component.activeTasksCount()).toBe(1);
    });

    it('should update completed task count when a completed task is deleted', () => {
      // Arrange: Add a task and mark it as completed.
      component.newTaskText.set('Task 2');
      component.addTask();
      component.toggleTask(component.tasks()[0].id);
      // Act: Delete the completed task.
      component.deleteTask(component.tasks()[0].id);
      // Assert: The completed task count should be zero.
      expect(component.completedTasksCount()).toBe(0);
    });

    it('should update the DOM after deleting a task', () => {
      // Arrange
      const taskId = component.tasks()[0].id;
      // Act
      component.deleteTask(taskId);
      fixture.detectChanges();
      // Assert: The task element should no longer be in the DOM.
      const taskElement = compiled.querySelector(`[data-testid="task-item-${taskId}"]`);
      expect(taskElement).toBeNull();
    });

    it('should display the empty state message when the last task is deleted', () => {
      // Arrange
      const taskId = component.tasks()[0].id;
      // Act
      component.deleteTask(taskId);
      fixture.detectChanges();
      // Assert
      expect(compiled.querySelector('[data-testid="empty-state"]')).toBeTruthy();
    });
  });

  describe('Filtering Tasks', () => {
    beforeEach(() => {
      // Arrange
      component.newTaskText.set('Active Task');
      component.addTask();
      component.newTaskText.set('Completed Task');
      component.addTask();
      component.toggleTask(component.tasks()[1].id); // Mark second task as completed
      fixture.detectChanges();
    });

    it('should show only active tasks when filter is "active"', () => {
      // Act
      component.setFilter('active');
      // Assert
      expect(component.filteredTasks().length).toBe(1);
      expect(component.filteredTasks()[0].text).toBe('Active Task');
    });

    it('should show only completed tasks when filter is "completed"', () => {
      // Act
      component.setFilter('completed');
      // Assert
      expect(component.filteredTasks().length).toBe(1);
      expect(component.filteredTasks()[0].text).toBe('Completed Task');
    });

    it('should show all tasks when filter is "all"', () => {
      // Act:
      component.setFilter('active');
      component.setFilter('all');
      // Assert
      expect(component.filteredTasks().length).toBe(2);
    });

    it('should update the DOM correctly when the filter changes', () => {
      // Act: Change the filter and detect changes
      component.setFilter('completed');
      fixture.detectChanges();
      // Assert: The number of task items in the DOM should match the filtered list
      expect(compiled.querySelectorAll('[data-testid^="task-item-"]').length).toBe(1);
    });
  });

  describe('Clear Completed', () => {
    beforeEach(() => {
      // Add mix of tasks
      component.newTaskText.set('Task 1');
      component.addTask();
      component.newTaskText.set('Task 2');
      component.addTask();
      component.newTaskText.set('Task 3');
      component.addTask();

      // Mark some as completed
      component.toggleTask(component.tasks()[0].id);
      component.toggleTask(component.tasks()[2].id);
    });

    it('should remove all completed tasks', () => {
      // Arrange
      expect(component.completedTasksCount()).toBe(2);

      // Act
      component.clearCompleted();

      // Assert
      expect(component.tasks()).toHaveLength(1);
      expect(component.completedTasksCount()).toBe(0);
    });

    it('should keep active tasks', () => {
      // Arrange
      const activeTaskText = component.tasks()[1].text;

      // Act
      component.clearCompleted();

      // Assert
      expect(component.tasks()).toHaveLength(1);
      expect(component.tasks()[0].text).toBe(activeTaskText);
    });
  });

  describe('Computed Signals', () => {
    it('should calculate active count correctly', () => {
      // Arrange
      component.newTaskText.set('Task 1');
      component.addTask();
      component.newTaskText.set('Task 2');
      component.addTask();
      component.newTaskText.set('Task 3');
      component.addTask();

      // Assert - all active initially
      expect(component.activeTasksCount()).toBe(3);

      // Act - complete one task
      component.toggleTask(component.tasks()[0].id);

      // Assert - one less active
      expect(component.activeTasksCount()).toBe(2);
    });

    it('should calculate completed count correctly', () => {
      // Arrange
      component.newTaskText.set('Task 1');
      component.addTask();
      component.newTaskText.set('Task 2');
      component.addTask();

      // Assert - none completed initially
      expect(component.completedTasksCount()).toBe(0);

      // Act - complete both tasks
      component.toggleTask(component.tasks()[0].id);
      component.toggleTask(component.tasks()[1].id);

      // Assert - both completed
      expect(component.completedTasksCount()).toBe(2);
    });

    it('should recalculate counts when tasks change', () => {
      // Arrange
      component.newTaskText.set('Task 1');
      component.addTask();
      component.toggleTask(component.tasks()[0].id);

      expect(component.activeTasksCount()).toBe(0);
      expect(component.completedTasksCount()).toBe(1);

      // Act - add new task
      component.newTaskText.set('Task 2');
      component.addTask();

      // Assert - counts updated
      expect(component.activeTasksCount()).toBe(1);
      expect(component.completedTasksCount()).toBe(1);
    });

    it('should update filteredTasks when filter changes', () => {
      // Arrange
      component.newTaskText.set('Active task');
      component.addTask();
      component.newTaskText.set('Completed task');
      component.addTask();
      component.toggleTask(component.tasks()[1].id);

      // Act & Assert - all filter
      component.setFilter('all');
      expect(component.filteredTasks()).toHaveLength(2);

      // Act & Assert - active filter
      component.setFilter('active');
      expect(component.filteredTasks()).toHaveLength(1);
      expect(component.filteredTasks()[0].text).toBe('Active task');

      // Act & Assert - completed filter
      component.setFilter('completed');
      expect(component.filteredTasks()).toHaveLength(1);
      expect(component.filteredTasks()[0].text).toBe('Completed task');
    });
  });

  describe('Edge Cases', () => {
    it('should handle adding multiple tasks quickly', () => {
      // Act - add 10 tasks rapidly
      for (let i = 1; i <= 10; i++) {
        component.newTaskText.set(`Task ${i}`);
        component.addTask();
      }

      // Assert
      expect(component.tasks()).toHaveLength(10);
      expect(component.activeTasksCount()).toBe(10);
    });

    it('should handle toggling task multiple times', () => {
      // Arrange
      component.newTaskText.set('Toggle test');
      component.addTask();
      const taskId = component.tasks()[0].id;

      // Act - toggle 4 times
      component.toggleTask(taskId);
      component.toggleTask(taskId);
      component.toggleTask(taskId);
      component.toggleTask(taskId);

      // Assert - should be back to initial state (not completed)
      expect(component.tasks()[0].completed).toBe(false);
    });

    it('should handle deleting all tasks', () => {
      // Arrange - add 3 tasks
      component.newTaskText.set('Task 1');
      component.addTask();
      component.newTaskText.set('Task 2');
      component.addTask();
      component.newTaskText.set('Task 3');
      component.addTask();

      // Act - delete all tasks
      const taskIds = component.tasks().map((t) => t.id);
      taskIds.forEach((id) => component.deleteTask(id));

      // Assert
      expect(component.tasks()).toHaveLength(0);
      expect(component.activeTasksCount()).toBe(0);
      expect(component.completedTasksCount()).toBe(0);
    });

    it('should handle deleting non-existent task gracefully', () => {
      // Arrange
      component.newTaskText.set('Task 1');
      component.addTask();
      const nonExistentId = 9999;

      // Act
      component.deleteTask(nonExistentId);

      // Assert - task still exists
      expect(component.tasks()).toHaveLength(1);
    });

    it('should handle toggling non-existent task gracefully', () => {
      // Arrange
      component.newTaskText.set('Task 1');
      component.addTask();
      const nonExistentId = 9999;

      // Act
      component.toggleTask(nonExistentId);

      // Assert - task unchanged
      expect(component.tasks()[0].completed).toBe(false);
    });

    it('should maintain filter when adding tasks', () => {
      // Arrange
      component.newTaskText.set('Completed task');
      component.addTask();
      component.toggleTask(component.tasks()[0].id);
      component.setFilter('active');

      // Act - add new active task
      component.newTaskText.set('New active task');
      component.addTask();

      // Assert - filter still active, shows new task
      expect(component.filter()).toBe('active');
      expect(component.filteredTasks()).toHaveLength(1);
    });

    it('should maintain filter when deleting tasks', () => {
      // Arrange
      component.newTaskText.set('Active 1');
      component.addTask();
      component.newTaskText.set('Active 2');
      component.addTask();
      component.setFilter('active');

      // Act - delete one active task
      component.deleteTask(component.tasks()[0].id);

      // Assert - filter still active
      expect(component.filter()).toBe('active');
      expect(component.filteredTasks()).toHaveLength(1);
    });
  });

  describe('DOM Rendering', () => {
    it('should render task text correctly in DOM', () => {
      // Arrange
      component.newTaskText.set('Buy groceries');

      // Act
      component.addTask();
      fixture.detectChanges();

      // Assert
      const taskText = compiled.querySelector('.task-text');
      expect(taskText?.textContent).toBe('Buy groceries');
    });

    it('should show footer only when tasks exist', () => {
      // Assert - no footer initially
      let footer = compiled.querySelector('[data-testid="task-footer"]');
      expect(footer).toBeNull();

      // Act - add task
      component.newTaskText.set('Task 1');
      component.addTask();
      fixture.detectChanges();

      // Assert - footer now visible
      footer = compiled.querySelector('[data-testid="task-footer"]');
      expect(footer).toBeTruthy();
    });

    it('should show clear completed button only when completed tasks exist', () => {
      // Arrange - add task
      component.newTaskText.set('Task 1');
      component.addTask();
      fixture.detectChanges();

      // Assert - no clear button
      let clearButton = compiled.querySelector('[data-testid="clear-completed"]');
      expect(clearButton).toBeNull();

      // Act - complete task
      component.toggleTask(component.tasks()[0].id);
      fixture.detectChanges();

      // Assert - clear button now visible
      clearButton = compiled.querySelector('[data-testid="clear-completed"]');
      expect(clearButton).toBeTruthy();
    });

    it('should display correct singular/plural text for tasks', () => {
      // Act - add one task
      component.newTaskText.set('Task 1');
      component.addTask();
      fixture.detectChanges();

      // Assert - singular
      let taskCount = compiled.querySelector('.task-count');
      expect(taskCount?.textContent).toContain('1 task left');

      // Act - add second task
      component.newTaskText.set('Task 2');
      component.addTask();
      fixture.detectChanges();

      // Assert - plural
      taskCount = compiled.querySelector('.task-count');
      expect(taskCount?.textContent).toContain('2 tasks left');
    });

    it('should update counts in filter buttons', () => {
      // Arrange - add tasks
      component.newTaskText.set('Active 1');
      component.addTask();
      component.newTaskText.set('Completed 1');
      component.addTask();
      component.toggleTask(component.tasks()[1].id);
      fixture.detectChanges();

      // Assert
      const allButton = compiled.querySelector('[data-testid="filter-all"]');
      const activeButton = compiled.querySelector('[data-testid="filter-active"]');
      const completedButton = compiled.querySelector('[data-testid="filter-completed"]');

      expect(allButton?.textContent).toContain('(2)');
      expect(activeButton?.textContent).toContain('(1)');
      expect(completedButton?.textContent).toContain('(1)');
    });

    it('should display correct empty state message based on filter', () => {
      // Assert - all filter empty state
      component.setFilter('all');
      fixture.detectChanges();
      let emptyState = compiled.querySelector('[data-testid="empty-state"]');
      expect(emptyState?.textContent).toContain('No tasks yet');

      // Add and complete a task
      component.newTaskText.set('Task 1');
      component.addTask();
      component.toggleTask(component.tasks()[0].id);

      // Assert - active filter empty state
      component.setFilter('active');
      fixture.detectChanges();
      emptyState = compiled.querySelector('[data-testid="empty-state"]');
      expect(emptyState?.textContent).toContain('No active tasks');

      // Delete the completed task
      component.deleteTask(component.tasks()[0].id);

      // Assert - completed filter empty state
      component.setFilter('completed');
      fixture.detectChanges();
      emptyState = compiled.querySelector('[data-testid="empty-state"]');
      expect(emptyState?.textContent).toContain('No completed tasks yet');
    });

    it('should render checkbox with correct checked state', () => {
      // Arrange - add task
      component.newTaskText.set('Task 1');
      component.addTask();
      fixture.detectChanges();

      const taskId = component.tasks()[0].id;
      let checkbox = compiled.querySelector(
        `[data-testid="task-checkbox-${taskId}"]`
      ) as HTMLInputElement;

      // Assert - not checked initially
      expect(checkbox.checked).toBe(false);

      // Act - toggle task
      component.toggleTask(taskId);
      fixture.detectChanges();

      // Assert - now checked
      checkbox = compiled.querySelector(
        `[data-testid="task-checkbox-${taskId}"]`
      ) as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should remove task from DOM when deleted', () => {
      // Arrange - add task
      component.newTaskText.set('Task to delete');
      component.addTask();
      fixture.detectChanges();

      const taskId = component.tasks()[0].id;
      let taskElement = compiled.querySelector(`[data-testid="task-item-${taskId}"]`);
      expect(taskElement).toBeTruthy();

      // Act - delete task
      component.deleteTask(taskId);
      fixture.detectChanges();

      // Assert - task removed from DOM
      taskElement = compiled.querySelector(`[data-testid="task-item-${taskId}"]`);
      expect(taskElement).toBeNull();
    });
  });
});
