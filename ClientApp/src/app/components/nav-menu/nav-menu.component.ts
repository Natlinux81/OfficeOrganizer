import { Component, OnInit } from '@angular/core';
import { Dropdown} from 'bootstrap'
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public username : string = "";
  public loginStatus : boolean = false

  constructor(
    private authenticateService : AuthenticateService,
    private userStore : UserStoreService){}

  ngOnInit(){
    this.userStore.getUsernameFromStore()
    .subscribe(val =>{
      const usernameFromToken = this.authenticateService.getUsernameFromToken();
      this.username = val || usernameFromToken

      this.loginStatus = this.authenticateService.isLoggedIn();
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  dropdown(dropdown : any){
    const modal = new Dropdown(dropdown);
    modal.toggle();
    }

    logOut(){
      this.loginStatus = false;
      this.authenticateService.signOut();
    }
}
