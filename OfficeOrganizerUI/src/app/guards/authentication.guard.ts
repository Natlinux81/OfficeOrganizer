import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  {
  constructor(private authenticateService : AuthenticateService,
    private router : Router) {}

  canActivate() : boolean {
    if(this.authenticateService.isLoggedIn()){
      return true;
    }else{
      alert('please login')

      this.router.navigate(['/login'])
      return false;
    }
  }

}
