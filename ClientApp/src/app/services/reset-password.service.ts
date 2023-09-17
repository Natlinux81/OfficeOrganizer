import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResetPasswordModel } from '../models/reset-password-model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private authenticateUrl = environment.authenticateUrl

constructor(private httpClient : HttpClient) { }

sendResetPasswordLink(email : string){
  return this.httpClient.post<any>(`${this.authenticateUrl}send-reset-email/${email}`,{})
}

resetPassword(resetPasswordObj : ResetPasswordModel){
  return this.httpClient.post<any>(`${this.authenticateUrl}reset-password` ,resetPasswordObj);
}
}
