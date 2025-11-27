import { Routes } from "@angular/router";
import { TaskListComponent } from "./features/week-01-basics/task-list/task-list.component";

export const routes: Routes = [
  { path: '', redirectTo: 'week-01-basics/task-list', pathMatch: 'full' },
  { path: 'week-01-basics/task-list', component: TaskListComponent}
]
