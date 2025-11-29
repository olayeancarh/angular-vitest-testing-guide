import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header>
        <h1>Angular 21 + Vitest Testing Guide</h1>
        <nav>
          <a routerLink="/week-01-basics/task-list" routerLinkActive="active">Week 1: Task List</a>
        </nav>
      </header>

      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      header {
        margin-bottom: 2rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 1rem;
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        margin-top: 1rem;
        gap: 1rem;
      }

      nav a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
      }

      nav a.active {
        background: #333;
        color: white;
        border-color: #333;
      }
    `,
  ],
})
export class AppComponent {
  protected readonly title = signal('angular-vitest-testing-guide');
}
