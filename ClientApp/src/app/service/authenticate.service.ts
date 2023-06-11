import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient : HttpClient) { }

  authenticateUrl = environment.authenticateUrl

  signUp(userRequest : any){
    var response = this.httpClient.post<any>(this.authenticateUrl + 'register',userRequest);
    return response;
  }

  signIn(userRequest : any){
    var response = this.httpClient.post<any>(this.authenticateUrl + 'authenticate',userRequest);
    return response;
  }
}
