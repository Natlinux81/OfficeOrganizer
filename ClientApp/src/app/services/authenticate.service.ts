import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private authenticateUrl = environment.authenticateUrl

  private userPayload:any;

  constructor(private httpClient : HttpClient, private router : Router) {
    this.userPayload = this.decodedToken();
  }

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

  storeRefreshToken(tokenValue : string){
    return localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getUsernameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.httpClient.post<any>(`${this.authenticateUrl}refresh`, tokenApi)
  }
}
