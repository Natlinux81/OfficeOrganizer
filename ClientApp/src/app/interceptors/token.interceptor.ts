import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticateService : AuthenticateService, private route : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authenticateService.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}  // "Bearer "+myToken
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // alert('Token is expired, login again!')
            // this.route.navigate(['login'])
            return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(()=> new Error("some other error "))
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.authenticateService.getToken()!;
    tokeApiModel.refreshToken = this.authenticateService.getRefreshToken()!;
    return this.authenticateService.renewToken(tokeApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.authenticateService.storeRefreshToken(data.refreshToken);
        this.authenticateService.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          alert('Token is expired, login again!')
            this.route.navigate(['login'])
        })
      })
    )
  }
}
