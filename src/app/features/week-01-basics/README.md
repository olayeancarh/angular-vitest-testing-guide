# Week 1: Getting Started - Task List Application

Hey there! Welcome to Week 1 where we're building a classic task list app and learning how to test it with Vitest. If you've ever used any todo app, you know the drill - but this time, we're going to make sure everything actually works by writing proper tests.

## What We Built

A fully functional task manager that lets you:

- Add new tasks
- Mark tasks as complete 
- Delete tasks 
- Filter between all, active, and completed tasks
- See how many tasks are still pending
- Clear all completed tasks at once

## The Cool Angular Stuff We're Using

This project is built with Angular 21's latest features, and honestly, signals make everything so much nicer:

- **Signals** for reactive state management (bye-bye RxJS for simple state!)
- **Computed signals** for derived values like filtered tasks and counters
- **New control flow syntax** with `@for` and `@if` (much cleaner than `*ngFor` and `*ngIf`)
- **Two-way data binding** for that sweet, sweet form input
- **Modern component architecture** with standalone components

## What We're Learning to Test

Testing isn't just about making sure your code doesn't break - it's about confidence. Here's what we're covering:

- Component initialization and default state
- User interactions (clicks, typing, form submissions)
- Dynamic list rendering with the new `@for` syntax
- Conditional rendering with `@if` blocks
- Computed signal values
- Form input bindings and updates
- Empty states

## Things I Learned the Hard Way

### Discovery 1: The --skip-tests

So here's a fun one - when generating components with Angular CLI:

- ❌ `ng generate component my-component --skip-test` (doesn't work)
- ✅ `ng generate component my-component --skip-tests` (works!)

Notice the **plural**? Yeah, that extra 's' matters. We're skipping the default test files because we want to write our own Vitest-style tests later.

### Discovery 2: Component File Naming

Angular's default behavior has changed over time with component file naming:

- By default, Angular CLI might omit the `.component` suffix in filenames
- If you want the traditional `something.component.ts` naming, use `--type=component` flag
- I ended up editing files manually to get the naming just right
- Consistency matters, so pick a pattern and stick with it!

### Discovery 3: Event Handling Best Practices

Initially, I was doing inline type casting in the template like this:
```typescript
(input)="newTaskText.set($any($event.target).value)"
```

But that's messy and hard to test. Much better to create a dedicated method:
```typescript
updateTaskText(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.newTaskText.set(input.value);
}
```

Cleaner, more testable, and easier to debug!

## Project Structure

Here's how everything is organized:

```
week-01-basics/
└── task-list/
    ├── task-list.component.ts      # Main component logic
    ├── task-list.component.html    # Template with @for and @if
    ├── task-list.component.scss    # Styling (because ugly apps are sad)
    ├── task-list.component.spec.ts # Our Vitest tests (coming soon!)
    └── models/
        └── task.model.ts           # TypeScript interfaces for tasks
```

## Component Features Breakdown

### State Management with Signals

```typescript
tasks = signal<Task[]>([]);           // All our tasks
newTaskText = signal<string>('');     // What the user is typing
filter = signal<TaskFilter>('all');   // Current filter selection
```

### Computed Values

```typescript
filteredTasks = computed(() => { ... });      // Smart filtering
activeTasksCount = computed(() => { ... });   // Count incomplete tasks
completedTasksCount = computed(() => { ... }); // Count finished tasks
```

### Core Methods

- `addTask()` - Creates new tasks with auto-incrementing IDs
- `toggleTask(id)` - Marks tasks as complete/incomplete
- `deleteTask(id)` - Removes tasks from the list
- `setFilter(filter)` - Changes which tasks we're viewing
- `clearCompleted()` - Removes all completed tasks at once
- `updateTaskText(event)` - Handles input changes properly

## Testing Checklist

As we build out the test suite, here's what we're covering:

- [ ] Component starts with empty task list
- [ ] Can add a new task
- [ ] Can't add empty tasks
- [ ] Can mark tasks as complete
- [ ] Can uncheck completed tasks
- [ ] Can delete individual tasks
- [ ] Filter shows correct tasks (all/active/completed)
- [ ] Empty state shows appropriate messages
- [ ] Task counter shows correct count
- [ ] Clear completed button removes only completed tasks
- [ ] Clear completed button only shows when there are completed tasks

## Content Creation Tasks

- [ ] Write blog post about testing Angular with Vitest
- [ ] Create video walkthrough of the component
- [ ] Film short-form content for social media
- [ ] Document common testing patterns

## Challenges & Solutions

### Challenge: Testing Angular's New Control Flow

The new `@for` and `@if` syntax is awesome, but testing it requires understanding how Angular's rendering works. We'll be diving deep into the testing harness to make sure our conditional rendering actually works.

### Challenge: Signal Testing

Signals are new, and testing reactive state requires a different mindset than testing observables. We'll figure out the best patterns together.

## Helpful Resources

- [Angular Official Docs](https://angular.dev) - The new docs site is actually really good!
- [Vitest Documentation](https://vitest.dev) - Fast, modern testing
- [Angular Signals Guide](https://angular.dev/guide/signals) - Deep dive into reactive primitives

---

**Next up**: Writing comprehensive tests for all this functionality! Let's make sure our app actually works the way we think it does.
