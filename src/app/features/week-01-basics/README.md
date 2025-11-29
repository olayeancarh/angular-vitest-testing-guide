# Week 1: Getting Started - Task List Application with Vitest Testing

**Status**: Complete
**Tests Written**: 50 (all passing)
**Test Coverage**: Component logic, DOM rendering, signals, computed values, and edge cases

---

## Table of Contents

1. [What We Built](#what-we-built)
2. [Angular 21 Features Used](#angular-21-features-used)
3. [Testing Achievements](#testing-achievements)
4. [Key Discoveries](#key-discoveries)
5. [Challenges & Solutions](#challenges--solutions)
6. [Code Examples](#code-examples)
7. [Project Structure](#project-structure)
8. [Running the Tests](#running-the-tests)
9. [Helpful Resources](#helpful-resources)

---

## What We Built

A fully functional task manager application that demonstrates modern Angular 21 features and comprehensive Vitest testing patterns.

### Features Implemented

- **Add new tasks** with input validation (no empty or whitespace-only tasks)
- **Mark tasks as complete/incomplete** with visual feedback
- **Delete individual tasks** with proper state management
- **Filter tasks** between all, active, and completed views
- **See real-time task counts** (total, active, completed)
- **Clear all completed tasks** at once
- **Empty state messages** that change based on current filter
- **Responsive UI** with accessibility features
- **Unique task IDs** with auto-incrementing counter
- **Timestamps** for when tasks are created

---

## Angular 21 Features Used

This project showcases the latest Angular 21 capabilities:

### 1. Signals (Reactive Primitives)

```typescript
// State management without RxJS
tasks = signal<Task[]>([]);
newTaskText = signal<string>('');
filter = signal<TaskFilter>('all');
```

**Why it's awesome:**
- Simpler than Observables for basic state
- Better performance with fine-grained reactivity
- Easier to test (just call the signal!)
- More intuitive for developers new to Angular

### 2. Computed Signals (Derived State)

```typescript
filteredTasks = computed(() => {
  const filter = this.filter();
  const tasks = this.tasks();
  // Automatically recalculates when dependencies change
});

activeTasksCount = computed(() =>
  this.tasks().filter(t => !t.completed).length
);
```

**Why it's awesome:**
- Automatic dependency tracking
- Only recalculates when needed
- No manual subscription management
- Declarative and clean

### 3. New Control Flow Syntax

```html
<!-- Old way -->
<div *ngIf="tasks.length > 0">...</div>
<div *ngFor="let task of tasks">...</div>

<!-- New way (Angular 21) -->
@if (tasks().length > 0) {
  <div>...</div>
}

@for (task of filteredTasks(); track task.id) {
  <div>{{ task.text }}</div>
} @empty {
  <p>No tasks yet!</p>
}
```

**Why it's awesome:**
- More readable and less verbose
- Built-in `@empty` block for lists
- No need for structural directives
- Better TypeScript integration

### 4. Standalone Components

```typescript
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  // No need for NgModule!
})
```

**Why it's awesome:**
- Simpler component architecture
- No NgModule boilerplate
- Better tree-shaking
- Easier to test in isolation

### 5. Zoneless Change Detection (Default in Angular 21)

- No Zone.js overhead
- Better performance
- Simpler mental model
- Modern async/await patterns work seamlessly

---

## Testing Achievements

### Test Suite Statistics

**Total Tests**: 50+
**Pass Rate**: 100%
**Execution Time**: ~2 seconds
**Test File**: [task-list.component.spec.ts](task-list/task-list.component.spec.ts)

### Test Categories Covered

#### 1. Component Setup (5 tests)
- Component creation
- Initial state verification (empty arrays, default values)
- Signal initialization
- Empty state rendering

#### 2. Adding Tasks (8 tests)
- Adding task with valid text
- Input clearing after adding
- Preventing empty task creation
- Preventing whitespace-only tasks
- Text trimming
- Unique ID assignment
- Timestamp creation
- DOM updates after adding

#### 3. Toggling Tasks (6 tests)
- Marking task as completed
- Unmarking completed task
- Toggling correct task in list
- Completed count updates
- Active count updates
- CSS class application in DOM

#### 4. Deleting Tasks (3 tests)
- Deleting a task
- Deleting correct task from list
- Count updates after deletion

#### 5. Filtering Tasks (4 tests)
- Showing all tasks (default)
- Filtering to active only
- Filtering to completed only
- Filter button active state

#### 6. Clear Completed (2 tests)
- Removing all completed tasks
- Keeping active tasks intact

#### 7. Computed Signals (4 tests)
- Active count calculation
- Completed count calculation
- Recalculation on changes
- Filtered tasks updates

#### 8. Edge Cases (7 tests)
- Adding multiple tasks rapidly
- Toggling task multiple times
- Deleting all tasks
- Handling non-existent task IDs gracefully
- Filter persistence when adding tasks
- Filter persistence when deleting tasks

#### 9. DOM Rendering (8 tests)
- Task text rendering
- Footer conditional rendering
- Clear completed button visibility
- Singular/plural text for counts
- Count displays in filter buttons
- Empty state messages per filter
- Checkbox checked state
- Task removal from DOM

### Testing Patterns Established

```typescript
// Pattern 1: AAA (Arrange-Act-Assert)
it('should add a task with valid text', () => {
  // ARRANGE - Set up test data
  component.newTaskText.set('Buy groceries');

  // ACT - Perform the action
  component.addTask();

  // ASSERT - Verify the result
  expect(component.tasks()).toHaveLength(1);
  expect(component.tasks()[0].text).toBe('Buy groceries');
});

// Pattern 2: Testing Signals
it('should update signal value', () => {
  component.newTaskText.set('Test');
  expect(component.newTaskText()).toBe('Test');
});

// Pattern 3: Testing Computed Signals
it('should recalculate counts', () => {
  component.newTaskText.set('Task 1');
  component.addTask();

  expect(component.activeTasksCount()).toBe(1);

  component.toggleTask(component.tasks()[0].id);

  expect(component.activeTasksCount()).toBe(0);
  expect(component.completedTasksCount()).toBe(1);
});

// Pattern 4: Testing DOM Updates
it('should update DOM when state changes', () => {
  component.newTaskText.set('Buy groceries');
  component.addTask();
  fixture.detectChanges(); // ← CRITICAL!

  const taskItems = compiled.querySelectorAll('[data-testid^="task-item-"]');
  expect(taskItems).toHaveLength(1);
});
```

---

## Key Discoveries

### Discovery 1: Signal Testing is Simple

**What we learned:**
Signals are just functions that return values. Testing them is straightforward:

```typescript
// Read signal
const currentTasks = component.tasks();

// Set signal
component.newTaskText.set('New value');

// Update signal
component.tasks.update(tasks => [...tasks, newTask]);

// Test computed signal
expect(component.activeTasksCount()).toBe(2);
```

**Impact:** Makes testing reactive state much easier than Observables!

---

### Discovery 2: fixture.detectChanges() is CRITICAL

**The Problem:**
Tests were failing because DOM wasn't updating even though component state changed.

**The Solution:**
```typescript
component.addTask();
fixture.detectChanges(); // ← Without this, DOM doesn't update!

const taskItems = compiled.querySelectorAll('[data-testid^="task-item-"]');
expect(taskItems).toHaveLength(1); // Now it works!
```

**The Rule:**
> Call `fixture.detectChanges()` after ANY component state change when testing DOM updates.

**Impact:** This was a game-changer for understanding Angular's testing harness.

---

### Discovery 3: data-testid Attributes are Your Best Friend

**The Problem:**
Querying DOM elements by class names or tag names is brittle.

**The Solution:**
```html
<!-- Component Template -->
<input data-testid="task-input" />
<button data-testid="add-button">Add</button>
<li [attr.data-testid]="'task-item-' + task.id">
```

```typescript
// Tests
const input = compiled.querySelector('[data-testid="task-input"]');
const button = compiled.querySelector('[data-testid="add-button"]');
const task = compiled.querySelector('[data-testid="task-item-1"]');
```

**Benefits:**
- Decouples tests from styling
- More semantic and readable
- Industry best practice
- Easy to find test-specific elements

**Impact:** Made tests more maintainable and less fragile.

---

### Discovery 4: Testing Components with Router

**The Problem:**
```
ɵNotFound: NG0201: No provider found for `ActivatedRoute`
```

AppComponent uses `RouterLink`, `RouterOutlet`, and `RouterLinkActive` but test setup didn't provide routing dependencies.

**The Solution:**
```typescript
import { provideRouter } from '@angular/router';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [provideRouter([])] // ← Provides all routing dependencies
  }).compileComponents();
});
```

**Why it works:**
- `provideRouter([])` provides ActivatedRoute, Router, Location, etc.
- Empty routes array `[]` is fine for component testing
- This is the Angular 21 way (no more RouterTestingModule!)

**Impact:** Learned proper dependency injection in tests.

---

### Discovery 5: Angular CLI Flags

**The Mistake:**
```bash
ng g c my-component --skip-test  # ❌ Doesn't work!
```

**The Fix:**
```bash
ng g c my-component --skip-tests  # Works! (note the 's')
```

**Lesson:** Always verify CLI flags with current Angular version.

---

### Discovery 6: AAA Pattern Makes Tests Readable

**Before (unclear):**
```typescript
it('should work', () => {
  component.newTaskText.set('Test');
  component.addTask();
  expect(component.tasks().length).toBe(1);
  expect(component.newTaskText()).toBe('');
});
```

**After (crystal clear):**
```typescript
it('should add task and clear input', () => {
  // ARRANGE
  component.newTaskText.set('Test');

  // ACT
  component.addTask();

  // ASSERT
  expect(component.tasks()).toHaveLength(1);
  expect(component.newTaskText()).toBe('');
});
```

**Impact:** Tests become self-documenting and easier to maintain.

---

### Discovery 7: Type-Safe Event Handling

**Initially (messy):**
```typescript
// In template - ugly type casting
(input)="newTaskText.set($any($event.target).value)"
```

**Better approach:**
```typescript
// Component method
updateTaskText(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.newTaskText.set(input.value);
}

// Template - clean and clear
(input)="updateTaskText($event)"
```

**Benefits:**
- Type-safe
- Testable
- Reusable
- Clear intent

---

## Challenges & Solutions

### Challenge 1: Router Dependencies in Tests

**Problem:**
```
FAIL  AppComponent > should create the app
ɵNotFound: No provider found for `ActivatedRoute`
```

**Root Cause:**
AppComponent uses routing directives (`RouterLink`, `RouterOutlet`) but test didn't provide necessary services.

**Solution:**
```typescript
import { provideRouter } from '@angular/router';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [provideRouter([])]
  }).compileComponents();
});
```

**Lessons Learned:**
- Always provide dependencies for directives/services used in components
- Use modern Angular 21 providers (`provideRouter`) not old modules
- Empty routes array is sufficient for unit testing

**Status:** Resolved

---

### Challenge 2: Understanding fixture.detectChanges()

**Problem:**
DOM tests failing even though component state was correct.

**Root Cause:**
Angular's TestBed doesn't automatically trigger change detection in tests.

**Solution:**
```typescript
it('should show task in DOM', () => {
  component.newTaskText.set('Buy milk');
  component.addTask();
  fixture.detectChanges(); // ← This updates the DOM!

  const tasks = compiled.querySelectorAll('.task-item');
  expect(tasks).toHaveLength(1); // Passes!
});
```

**The Rule:**
> Call `fixture.detectChanges()` after any action that changes component state when testing DOM rendering.

**Lessons Learned:**
- Angular testing requires manual change detection trigger
- This is by design - gives you control over when to check DOM
- Always call it before querying DOM elements

**Status:** Resolved

---

## Code Examples

### Component State Management

```typescript
export class TaskListComponent {
  // Signals for state
  tasks = signal<Task[]>([]);
  newTaskText = signal<string>('');
  filter = signal<TaskFilter>('all');

  // Computed signals for derived state
  filteredTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  });

  activeTasksCount = computed(() =>
    this.tasks().filter(t => !t.completed).length
  );

  completedTasksCount = computed(() =>
    this.tasks().filter(t => t.completed).length
  );
}
```

### Test Setup Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  // Tests go here...
});
```

### Complete Test Example

```typescript
it('should add task and update all related state', () => {
  // ARRANGE
  const taskText = 'Buy groceries';
  component.newTaskText.set(taskText);

  // ACT
  component.addTask();
  fixture.detectChanges();

  // ASSERT - Component state
  expect(component.tasks()).toHaveLength(1);
  expect(component.tasks()[0].text).toBe(taskText);
  expect(component.tasks()[0].completed).toBe(false);
  expect(component.newTaskText()).toBe(''); // Input cleared

  // ASSERT - Computed signals
  expect(component.activeTasksCount()).toBe(1);
  expect(component.completedTasksCount()).toBe(0);
  expect(component.filteredTasks()).toHaveLength(1);

  // ASSERT - DOM
  const taskItem = compiled.querySelector('[data-testid="task-item-1"]');
  expect(taskItem).toBeTruthy();
  expect(taskItem?.textContent).toContain(taskText);
});
```

---

## Project Structure

```
week-01-basics/
└── task-list/
    ├── task-list.component.ts        # Component logic (178 lines)
    ├── task-list.component.html      # Template with @for/@if
    ├── task-list.component.scss      # Styling
    ├── task-list.component.spec.ts   # 50 Vitest tests
    └── models/
        └── task.model.ts             # TypeScript interfaces
```

### File Responsibilities

**task-list.component.ts**
- Signal-based state management
- Business logic for CRUD operations
- Computed signal calculations
- Event handling

**task-list.component.html**
- Template with new @for and @if syntax
- Two-way data binding
- Event bindings
- data-testid attributes for testing

**task-list.component.scss**
- Component styling
- Responsive design
- Accessibility focus states

**task-list.component.spec.ts**
- 50 comprehensive tests
- All testing patterns documented
- 100% pass rate
- Organized into logical describe blocks

**task.model.ts**
- Task interface definition
- TaskFilter type definition
- Clear type contracts

---

## Running the Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode (default)
```bash
ng test
```

### Run Tests Once (CI mode)
```bash
npm test -- --run
```

### Run Specific Test File
```bash
npm test task-list.component.spec.ts
```

### Expected Output
```
✓ app.spec.ts (3 tests)
✓ task-list.component.spec.ts (50 tests)

Test Files  2 passed (2)
     Tests  53 passed (53)
  Duration  ~2s
```

---

## Helpful Resources

**Angular Resources:**
- [Angular Official Testing Guide](https://angular.dev/guide/testing)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular Control Flow](https://angular.dev/guide/templates/control-flow)

**Vitest Resources:**
- [Vitest Documentation](https://vitest.dev)
- [Vitest API Reference](https://vitest.dev/api/)

**Community:**
- Angular Discord community
- Stack Overflow [angular] + [vitest] tags

---

## Key Takeaways

### Technical Lessons

1. **Signals are easier to test than Observables**
   - Just call the signal: `component.tasks()`
   - Set with: `component.signal.set(value)`
   - Update with: `component.signal.update(fn)`

2. **fixture.detectChanges() is non-negotiable**
   - Always call after state changes
   - Required for DOM updates
   - Can batch multiple changes

3. **data-testid > CSS selectors**
   - More maintainable
   - Decoupled from styling
   - Industry best practice

4. **AAA pattern improves readability**
   - Arrange, Act, Assert
   - Self-documenting tests
   - Easier to maintain

5. **provideRouter([]) for routing tests**
   - Modern Angular 21 approach
   - Replaces RouterTestingModule
   - Provides all routing dependencies

### Process Lessons

1. **Test-driven learning works**
   - Writing tests teaches the framework
   - Forces deep understanding
   - Builds confidence

2. **Document as you go**
   - Easier than documenting later
   - Captures authentic struggles
   - Creates better content

---
