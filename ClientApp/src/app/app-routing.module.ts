import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FinancialOverviewComponent } from './components/financial-overview/financial-overview.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { EarningsComponent } from './components/earnings/earnings.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component:HomeComponent, pathMatch: 'full' },
  {component: DashboardComponent, path: 'dashboard', canActivate: [AuthenticationGuard]},
  {component: CalendarComponent, path: 'calendar' ,canActivate: [AuthenticationGuard]},
  {component: FinancialOverviewComponent, path: 'financial' ,canActivate: [AuthenticationGuard]},
  {component: EarningsComponent, path: 'earnings' ,canActivate: [AuthenticationGuard]},
  {component: ExpensesComponent, path: 'expenses' ,canActivate: [AuthenticationGuard]},
  {component: TodoListComponent, path: 'todo' , canActivate: [AuthenticationGuard]},
  {component: TodoListComponent, path: 'todo/edit/:id'},
  {component: RegisterComponent, path: 'register'},
  {component: LoginComponent, path: 'login'},
  {component: ResetPasswordComponent, path: 'reset'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
