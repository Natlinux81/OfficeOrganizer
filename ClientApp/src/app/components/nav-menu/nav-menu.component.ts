import { Component } from '@angular/core';
import { Dropdown} from 'bootstrap'
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authenticateService : AuthenticateService){}

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
    this.authenticateService.signOut();
    }
}
