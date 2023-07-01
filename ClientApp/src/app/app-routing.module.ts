import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [
  { path: '', component:HomeComponent, pathMatch: 'full' },
  {component: DashboardComponent, path: 'dashboard', canActivate: [AuthenticationGuard]},
  {component: CalendarComponent, path: 'calendar' ,canActivate: [AuthenticationGuard]},
  {component: TodoListComponent, path: 'todo' , canActivate: [AuthenticationGuard]},
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
