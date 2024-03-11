import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResetPasswordModel } from '../models/reset-password-model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = environment.baseUrl

constructor(private httpClient : HttpClient) { }

sendResetPasswordLink(email : string){
  return this.httpClient.post<any>(`${this.baseUrl}send-reset-email/${email}`,{})
}

resetPassword(resetPasswordObj : ResetPasswordModel){
  return this.httpClient.post<any>(`${this.baseUrl}reset-password` ,resetPasswordObj);
}
}
