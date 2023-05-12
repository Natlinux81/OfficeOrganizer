import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  //{component: CalendarComponent, path: ''},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {component: TodoListComponent, path: 'todo'},
  {component: TodoListComponent, path: 'edit/title'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
