# Quick Reference - Your Testing Cheat Sheet

Bookmark this page. You'll need it when you're in the middle of writing tests and can't remember the syntax.

Copy, paste, modify, ship. That's how we roll.

---

## Essential Commands

### Project Setup
```bash
# Create new Angular 21 project
ng new my-project

# Add Vitest support (Angular 21 should prompt automatically)
ng test

# Install Vitest manually if needed (Angular 21 comes with Vitest automatically)
npm install -D vitest @vitest/ui @angular/build
```

### Running Tests
```bash
# Run tests in watch mode (default)
ng test

# Run tests once (CI mode)
ng test --no-watch

# Run tests with coverage
ng test --coverage

# Run specific test file
ng test --include src/app/my-component.spec.ts

# Run tests with UI
npx vitest --ui
```

### Test Generation
```bash
# Generate component with test file
ng generate component my-component

# Generate service with test file
ng generate service my-service

# Generate pipe with test file
ng generate pipe my-pipe
```

---

## Test File Structure

### Basic Component Test Template
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Basic Service Test Template
```typescript
import { TestBed } from '@angular/core/testing';
import { MyService } from './my-service.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

---

## Common Test Patterns

### Testing Component Inputs
```typescript
it('should accept input value', () => {
  component.inputValue = 'test';
  fixture.detectChanges();
  
  expect(component.inputValue).toBe('test');
});
```

### Testing Component Outputs
```typescript
it('should emit event', () => {
  let emittedValue: string | undefined;
  component.outputEvent.subscribe((value: string) => {
    emittedValue = value;
  });

  component.triggerOutput('test');
  
  expect(emittedValue).toBe('test');
});
```

### Testing User Interactions
```typescript
it('should handle button click', () => {
  const button = fixture.debugElement.nativeElement.querySelector('button');
  const spy = vi.spyOn(component, 'handleClick');
  
  button.click();
  
  expect(spy).toHaveBeenCalled();
});
```

### Testing Async Operations
```typescript
it('should load data', async () => {
  const data = await component.loadData();
  
  expect(data).toBeDefined();
  expect(data.length).toBeGreaterThan(0);
});
```

---

## Mocking Patterns

### Mock Service
```typescript
const mockService = {
  getData: vi.fn().mockReturnValue(['data1', 'data2']),
  saveData: vi.fn().mockResolvedValue(true)
};

TestBed.configureTestingModule({
  imports: [MyComponent],
  providers: [
    { provide: MyService, useValue: mockService }
  ]
});
```

### Mock HttpClient
```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      MyService,
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  });
  
  httpMock = TestBed.inject(HttpTestingController);
});

it('should fetch data', () => {
  service.getData().subscribe(data => {
    expect(data).toEqual(mockData);
  });

  const req = httpMock.expectOne('/api/data');
  expect(req.request.method).toBe('GET');
  req.flush(mockData);
});

afterEach(() => {
  httpMock.verify();
});
```

### Spy on Methods
```typescript
const spy = vi.spyOn(service, 'methodName');

// Call the method
component.callServiceMethod();

// Verify
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(expectedArg);
expect(spy).toHaveBeenCalledTimes(1);
```

---

## Vitest Matchers

### Basic Matchers
```typescript
expect(value).toBe(expected)           // Strict equality (===)
expect(value).toEqual(expected)        // Deep equality
expect(value).toBeTruthy()             // Truthy value
expect(value).toBeFalsy()              // Falsy value
expect(value).toBeNull()               // Null
expect(value).toBeUndefined()          // Undefined
expect(value).toBeDefined()            // Defined
```

### Number Matchers
```typescript
expect(value).toBeGreaterThan(3)
expect(value).toBeGreaterThanOrEqual(3)
expect(value).toBeLessThan(5)
expect(value).toBeLessThanOrEqual(5)
expect(value).toBeCloseTo(0.3)         // Floating point
```

### String Matchers
```typescript
expect(string).toContain('substring')
expect(string).toMatch(/pattern/)
expect(string).toHaveLength(10)
```

### Array/Object Matchers
```typescript
expect(array).toContain(item)
expect(array).toHaveLength(3)
expect(object).toHaveProperty('key')
expect(object).toHaveProperty('key', value)
expect(object).toMatchObject({ key: value })
```

### Function Matchers
```typescript
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledTimes(2)
expect(fn).toHaveBeenCalledWith(arg1, arg2)
expect(fn).toHaveBeenLastCalledWith(arg)
expect(fn).toThrow()
expect(fn).toThrow('error message')
```

---

## Testing Angular Features

### Testing Signals
```typescript
import { signal } from '@angular/core';

it('should update signal', () => {
  const count = signal(0);
  
  count.set(5);
  expect(count()).toBe(5);
  
  count.update(val => val + 1);
  expect(count()).toBe(6);
});
```

### Testing with Router
```typescript
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [MyComponent],
    providers: [
      provideRouter([
        { path: 'home', component: HomeComponent }
      ])
    ]
  });
});

it('should navigate', async () => {
  const router = TestBed.inject(Router);
  await router.navigate(['/home']);
  
  expect(router.url).toBe('/home');
});
```

### Testing Forms
```typescript
import { ReactiveFormsModule } from '@angular/forms';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent, ReactiveFormsModule]
  }).compileComponents();
});

it('should validate form', () => {
  component.form.patchValue({ email: 'invalid' });
  
  expect(component.form.valid).toBe(false);
  
  component.form.patchValue({ email: 'valid@email.com' });
  
  expect(component.form.valid).toBe(true);
});
```

### Testing Pipes
```typescript
import { MyPipe } from './my-pipe.pipe';

describe('MyPipe', () => {
  let pipe: MyPipe;

  beforeEach(() => {
    pipe = new MyPipe();
  });

  it('should transform value', () => {
    expect(pipe.transform('input')).toBe('expected output');
  });
});
```

### Testing Directives
```typescript
import { Component } from '@angular/core';
import { MyDirective } from './my-directive.directive';

@Component({
  standalone: true,
  imports: [MyDirective],
  template: '<div myDirective>Test</div>'
})
class TestComponent {}

describe('MyDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should apply directive', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    
    const div = fixture.nativeElement.querySelector('div');
    // Test directive effects
  });
});
```

---

## Debugging Tips

### View Component HTML
```typescript
const compiled = fixture.nativeElement;
console.log(compiled.innerHTML);
```

### Debug Element Queries
```typescript
import { By } from '@angular/platform-browser';

// Query by CSS selector
const element = fixture.debugElement.query(By.css('.my-class'));

// Query all matching elements
const elements = fixture.debugElement.queryAll(By.css('.my-class'));

// Query by directive
const directive = fixture.debugElement.query(By.directive(MyDirective));
```

### Console Logging in Tests
```typescript
it('should debug', () => {
  console.log('Component:', component);
  console.log('Fixture:', fixture);
  console.log('Native Element:', fixture.nativeElement);
});
```

### VSCode Debugging
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test", "--", "--inspect-brk"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

---

## When Things Break (Common Issues)

### Tests Keep Timing Out
**Fix it like this**:
```typescript
// Give slow tests more time
it('this one takes a while', async () => {
  // test code
}, { timeout: 10000 }); // 10 seconds instead of default
```

### "Can't Resolve Component" Error
**You probably forgot this**:
```typescript
// Standalone components go in imports, not declarations
await TestBed.configureTestingModule({
  imports: [MyComponent] // <-- imports, not declarations!
}).compileComponents();
```

### Async Stuff Not Finishing
**Try this**:
```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('async test', fakeAsync(() => {
  component.doAsyncThing();
  tick(1000); // Fast-forward time
  expect(component.done).toBe(true);
}));
```

### HTTP Tests Failing Mysteriously
**Did you forget to verify?**:
```typescript
// This is easy to forget but super important
afterEach(() => {
  httpMock.verify(); // Make sure no requests are pending
});
```

---

## Performance Tips

### Run Tests in Parallel
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 1
      }
    }
  }
});
```

### Skip Slow Tests in Watch Mode
```typescript
it.skip('slow test', () => {
  // This test will be skipped
});

it.only('focus on this test', () => {
  // Only this test will run
});
```

### Use beforeAll for Expensive Setup
```typescript
beforeAll(async () => {
  // Expensive setup that can be shared
  await setupDatabase();
});

afterAll(async () => {
  // Cleanup
  await teardownDatabase();
});
```

---

## Vitest Configuration

### Basic vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
      ]
    }
  }
});
```

### Test Setup File
```typescript
// src/test-setup.ts
import { beforeAll } from 'vitest';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

beforeAll(() => {
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
});
```

---

## Coverage Commands

```bash
# Generate coverage report
ng test --coverage

# View coverage in browser
# Open coverage/index.html after running coverage

# Set coverage thresholds
# Add to vitest.config.ts:
coverage: {
  lines: 80,
  functions: 80,
  branches: 80,
  statements: 80
}
```

---

## Useful Resources

### Documentation
- Angular Testing: https://angular.dev/guide/testing
- Vitest Docs: https://vitest.dev
- Angular API: https://angular.dev/api

### Community
- Angular Discord: https://discord.gg/angular
- Stack Overflow: [angular] [vitest] tags
- GitHub Issues: angular/angular

---

## Keyboard Shortcuts (Vitest UI)

```
When running vitest --ui:

r - Re-run all tests
f - Re-run only failed tests
u - Update snapshots
q - Quit
w - Show menu
```

---

**Pro Tip**: Keep this file open in a second monitor or split pane. When you can't remember the syntax, just grab it from here. No shame in copy-pasting - that's what it's for!

**Last Updated**: November 24, 2025

---

**Remember**: Nobody memorizes all this syntax. We all look stuff up. This is your lookup sheet.
