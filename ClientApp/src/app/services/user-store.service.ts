import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  public loginStatus$ = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public checkLoginStatus(): boolean{
    return false;
  }

  public isLoggedIn(){
    return this.loginStatus$.asObservable();
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string){
    this.role$.next(role);
  }

  public getUsernameFromStore(){
    return this.username$.asObservable();
  }

  public setUsernameForStore(username: string){
    this.username$.next(username);
  }
}
