import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthenticationModule } from './authentication/authentication.module';
import { TodoListModule } from './components/todo-list/todo-list.module';
import { CalendarModule } from './components/calendar/calendar.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AuthenticationModule,
    TodoListModule,
    CalendarModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation:false}),
    AppRoutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
