import { Component , OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users:any = [];
  public role! : string;

  constructor(private authenticateService : AuthenticateService, private userStore: UserStoreService){}

  ngOnInit(){
    this.authenticateService.getAllUsers().subscribe(res =>{
      this.users = res;
    });

    this.userStore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.authenticateService.getRoleFromToken();
      this.role = val || roleFromToken
    })
  }

}
