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

  private baseUrl = environment.baseUrl

  private userPayload:any;

  constructor(private httpClient : HttpClient, private router : Router) {
    this.userPayload = this.decodedToken();
  }

  getAllUsers(){
    return this.httpClient.get<any>(this.baseUrl + 'user');
  }

  signUp(userRequest : any){
    var response = this.httpClient.post<any>(this.baseUrl + 'user/register',userRequest);
    return response;
  }

  signIn(userRequest : any){
    var response = this.httpClient.post<any>(this.baseUrl + 'user/authenticate',userRequest);
    return response;
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue : string){
    return localStorage.setItem('user/token', tokenValue)
  }

  storeRefreshToken(tokenValue : string){
    return localStorage.setItem('user/refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('user/token')
  }

  getRefreshToken(){
    return localStorage.getItem('user/refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('user/token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
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
    return this.httpClient.post<any>(`${this.baseUrl}user/refresh`, tokenApi)
  }
}
