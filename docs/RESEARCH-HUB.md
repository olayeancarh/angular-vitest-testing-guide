# My Research Notes - Vitest & Angular 21 Testing

This is where I dump everything I find - docs, discoveries, best practices, and those random Stack Overflow answers that actually worked.

Think of this as my digital notebook. Messy, but useful.

---

## Official Documentation

### Angular 21
- **Main Documentation**: https://angular.dev
- **Testing Guide**: https://angular.dev/guide/testing
- **Release Notes**: https://blog.angular.dev/announcing-angular-v21-57946c34f14b
- **Update Guide**: https://angular.dev/update-guide
- **GitHub Releases**: https://github.com/angular/angular/releases

### Vitest
- **Main Documentation**: https://vitest.dev
- **Getting Started**: https://vitest.dev/guide/
- **API Reference**: https://vitest.dev/api/
- **Configuration**: https://vitest.dev/config/
- **GitHub Repository**: https://github.com/vitest-dev/vitest

### Angular + Vitest Integration
- **Angular CLI Vitest Support**: https://angular.dev/tools/cli
- **Testing Builder Configuration**: [To be researched]
- **Migration Guide**: [To be researched]

---

## Key Concepts to Master

### Vitest Fundamentals

**Test Structure**:
- `describe()` - Test suites
- `test()` / `it()` - Individual test cases
- `beforeEach()` / `afterEach()` - Setup and teardown
- `beforeAll()` / `afterAll()` - Suite-level setup
- `expect()` - Assertions

**Matchers**:
```typescript
// Common matchers to document
expect(value).toBe()
expect(value).toEqual()
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(array).toContain()
expect(fn).toThrow()
expect(value).toMatchSnapshot()
```

**Async Testing**:
```typescript
// Patterns to explore and document
test('async test', async () => {
  const result = await someAsyncFunction();
  expect(result).toBe(expected);
});
```

**Mocking**:
```typescript
// Vitest mocking patterns
vi.fn()           // Create mock function
vi.spyOn()        // Spy on existing function
vi.mock()         // Mock module
vi.clearAllMocks() // Clear mock history
```

---

### Angular Testing Fundamentals

**TestBed API**:
```typescript
TestBed.configureTestingModule({
  imports: [ComponentToTest],
  providers: [ServiceToInject]
})
```

**Component Testing**:
```typescript
// Key patterns to document
ComponentFixture
fixture.componentInstance
fixture.debugElement
fixture.detectChanges()
```

**Service Testing**:
```typescript
// Injection patterns
TestBed.inject(ServiceName)
```

**HTTP Testing**:
```typescript
// HttpClient testing patterns
provideHttpClient()
provideHttpClientTesting()
HttpTestingController
```

---

## Questions I Need to Answer

### Setup & Configuration
- [ ] What command actually adds Vitest to Angular 21? (is it automatic now?)
- [ ] What does a working vitest.config.ts look like?
- [ ] How does Vitest play with Angular CLI?
- [ ] What packages get installed when I add Vitest?
- [ ] How do I get code coverage working?
- [ ] Is watch mode on by default or do I need to configure it?

### Testing Patterns
- [ ] How to test standalone components?
- [ ] How to test components with signals?
- [ ] How to test Signal Forms?
- [ ] How to test with Angular Aria components?
- [ ] How to test zoneless components?
- [ ] How to test with new control flow (@if, @for, @switch)?

### Mocking Strategies
- [ ] How to mock HttpClient in Vitest?
- [ ] How to mock Angular services?
- [ ] How to mock third-party dependencies?
- [ ] How to mock component inputs?
- [ ] How to mock router navigation?
- [ ] How to mock activated route params?

### Migration Topics
- [ ] What breaks when migrating from Karma?
- [ ] How to migrate existing test files?
- [ ] Can Karma and Vitest coexist temporarily?
- [ ] What assertion library changes are needed?
- [ ] How to handle custom matchers?
- [ ] Performance differences between Karma and Vitest?

### Advanced Topics
- [ ] How to setup snapshot testing?
- [ ] How to test accessibility with Vitest?
- [ ] How to integrate with CI/CD pipelines?
- [ ] How to parallelize tests?
- [ ] How to measure and optimize test performance?
- [ ] How to debug tests in Vitest?

---

## Community Resources

### Forums & Discussion
- **Angular Discord**: https://discord.gg/angular
- **Vitest Discord**: https://chat.vitest.dev
- **Reddit r/Angular2**: https://reddit.com/r/Angular2
- **Stack Overflow**: [angular] + [vitest] tags

### GitHub Repositories to Study
- [ ] Angular official repo test examples
- [ ] Community Angular + Vitest starter projects
- [ ] Migration examples from Karma to Vitest
- [ ] Real-world projects using Vitest

### Blogs & Articles to Follow
- Angular Blog: https://blog.angular.dev
- [Add other influential Angular bloggers as you discover them]

---

## Cool Stuff I've Discovered

This is where I document the "aha!" moments.

### Discovery #1: [Topic]
**Date**: [When this clicked for me]

**What I Found**:
[What actually works, in plain English]

**Code Example**:
```typescript
// The code that actually worked
```

**Why You Should Care**:
[How this helps in real projects]

**Where I Found This**:
[Link or source - give credit where it's due]

---

### Discovery #2: [Topic]
**Date**: [Date discovered]

**What I Found**:
[Detailed explanation]

**Code Example**:
```typescript
// Working example
```

**Why This Matters**:
[Practical implications]

**Source**:
[Where you learned this]

---

## Common Issues & Solutions

### Issue #1: [Problem Description]

**Symptoms**:
- [What error/behavior you see]

**Cause**:
- [Why this happens]

**Solution**:
```typescript
// Code fix or configuration change
```

**Prevention**:
- [Best practice to avoid this]

**Related Resources**:
- [Links to documentation or discussions]

---

## Best Practices Collection

As you learn, document best practices here:

### Component Testing
1. **[Best Practice Name]**
   - Why: [Explanation]
   - Example: [Code snippet]

2. **[Best Practice Name]**
   - Why: [Explanation]
   - Example: [Code snippet]

### Service Testing
1. **[Best Practice Name]**
   - Why: [Explanation]
   - Example: [Code snippet]

### Test Organization
1. **[Best Practice Name]**
   - Why: [Explanation]
   - Example: [Code snippet]

### Performance
1. **[Best Practice Name]**
   - Why: [Explanation]
   - Example: [Code snippet]

---

## Comparison: Karma vs Vitest

### Setup & Configuration
**Karma**:
- [How it worked]
- [Pros]
- [Cons]

**Vitest**:
- [How it works]
- [Pros]
- [Cons]

**Winner**: [Your assessment]

### Speed & Performance
**Karma**:
- [Performance characteristics]

**Vitest**:
- [Performance characteristics]

**Winner**: [Your assessment with metrics]

### Developer Experience
**Karma**:
- [DX aspects]

**Vitest**:
- [DX aspects]

**Winner**: [Your assessment]

### Mocking & Utilities
**Karma**:
- [Available tools]

**Vitest**:
- [Available tools]

**Winner**: [Your assessment]

---

## Code Snippets Library

### Useful Test Utilities

```typescript
// Create a reusable test setup function
export function setupComponentTest<T>(component: Type<T>) {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [component]
    }).compileComponents();
  });
  
  // Return commonly needed test objects
  // Add pattern here as you develop it
}
```

### Mock Factory Functions

```typescript
// Factory for creating mock services
export function createMockService<T>(service: Type<T>): Partial<T> {
  // Add pattern here
}
```

### Common Test Patterns

```typescript
// Pattern 1: Testing component with inputs
describe('Component with inputs', () => {
  // Add pattern here
});

// Pattern 2: Testing async operations
describe('Async operations', () => {
  // Add pattern here
});

// Pattern 3: Testing form interactions
describe('Form interactions', () => {
  // Add pattern here
});
```

---

## Learning Path Tracker

Track your progression through testing concepts:

### Beginner Level ✅
- [ ] Understand test structure (describe, it, expect)
- [ ] Write basic component tests
- [ ] Test component methods
- [ ] Use basic matchers
- [ ] Setup TestBed

### Intermediate Level 🔄
- [ ] Mock services and dependencies
- [ ] Test async operations
- [ ] Test HTTP requests
- [ ] Test routing
- [ ] Test forms (Template-driven and Reactive)
- [ ] Use spies effectively

### Advanced Level ⏳
- [ ] Integration testing strategies
- [ ] Performance testing
- [ ] Snapshot testing
- [ ] Custom test utilities
- [ ] CI/CD integration
- [ ] Test architecture patterns
- [ ] Accessibility testing

### Expert Level 🎯
- [ ] Testing library creation
- [ ] Framework-level testing patterns
- [ ] Test performance optimization
- [ ] Complex mocking scenarios
- [ ] Teaching others effectively

---

## Tools & Extensions

### VSCode Extensions
- [ ] Vitest extension
- [ ] Angular Language Service
- [ ] Code coverage visualizer
- [ ] [Others to discover]

### CLI Tools
```bash
# Vitest CLI commands to master
vitest              # Run tests in watch mode
vitest run          # Run tests once
vitest --coverage   # Run with coverage
vitest --ui         # Open UI mode
```

### Debugging Setup
- [ ] How to debug tests in VSCode
- [ ] How to use Vitest UI for debugging
- [ ] Chrome DevTools for test debugging

---

## Performance Benchmarks

Document performance comparisons as you discover them:

### Test Execution Speed
**Project**: [Name/Size]
**Karma**: [Time]
**Vitest**: [Time]
**Improvement**: [Percentage]

### Initial Setup Time
**Karma**: [Time]
**Vitest**: [Time]

### Watch Mode Responsiveness
**Karma**: [Description]
**Vitest**: [Description]

---

## Questions for Further Research

Maintain a running list of questions:

1. [Question 1]
   - Status: [Unanswered/Researching/Answered]
   - Notes: [Your findings]

2. [Question 2]
   - Status: [Unanswered/Researching/Answered]
   - Notes: [Your findings]

---

## Content Ideas Generated from Research

As you learn, note content ideas:

### Blog Post Ideas
- [ ] [Idea based on a discovery]
- [ ] [Idea based on a problem solved]
- [ ] [Comparison article idea]

### Video Tutorial Ideas
- [ ] [Concept that needs visual explanation]
- [ ] [Common problem walkthrough]
- [ ] [Advanced technique demonstration]

### Short-form Content Ideas
- [ ] [Quick tip learned]
- [ ] [Mistake to avoid]
- [ ] [Performance hack]

---

**Last Updated**: [Date]
**Research Status**: [Starting/In Progress/Advanced]
**Next Research Focus**: [Topic]
