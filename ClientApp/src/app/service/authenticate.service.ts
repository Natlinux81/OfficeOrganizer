import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient : HttpClient, private router : Router) { }

  authenticateUrl = environment.authenticateUrl

  signUp(userRequest : any){
    var response = this.httpClient.post<any>(this.authenticateUrl + 'register',userRequest);
    return response;
  }

  signIn(userRequest : any){
    var response = this.httpClient.post<any>(this.authenticateUrl + 'authenticate',userRequest);
    return response;
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue : string){
    return localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
}
