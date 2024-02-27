import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SortDirective } from './directive/sort.directive';
import { FilterPipe } from './helper/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ForgotPasswordPopupComponent } from './authentication/forgot-password-popup/forgot-password-popup.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    TodoListComponent,
    CalendarComponent,
    ForgotPasswordPopupComponent,
    ResetPasswordComponent,
    InfoDialogComponent, 
    SpinnerComponent,
    SortDirective,
    FilterPipe

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    NgbModule,
    NgbPaginationModule,
  ],
  
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
       useClass:LoadingInterceptor, 
       multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor, 
      multi:true
    } ],
  bootstrap: [AppComponent]
})
export class AppModule {}
