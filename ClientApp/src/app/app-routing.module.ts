import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  //{component: CalendarComponent, path: ''},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {component: TodoListComponent, path: 'todo'},
  {component: TodoListComponent, path: 'todo/check/:id'},
  {component: TodoListComponent, path: 'todo/edit/:id'},
  {component: RegisterComponent, path: 'register'},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
