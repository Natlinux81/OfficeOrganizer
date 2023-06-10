import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';


const routes: Routes = [
  //{component: CalendarComponent, path: ''},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {component: TodoListComponent, path: 'todo'},
  {component: TodoListComponent, path: 'todo/edit/:id'},
  {component: RegisterComponent, path: 'register'},
  {component: LoginComponent, path: 'login'},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
