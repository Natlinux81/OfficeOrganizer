import { Component , OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users: any = [];
  public role! : string;
  public username : string = "";
  public displayedColumns : string[] =["No.", "Username" ,"E-Mail" , "Role"]


  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private authenticateService : AuthenticateService, private userStore: UserStoreService){}

  ngOnInit(): void{
    this.authenticateService.getAllUsers().subscribe((res) =>{
      this.users = new MatTableDataSource( res);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });

    this.userStore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.authenticateService.getRoleFromToken();
      this.role = val || roleFromToken
    });

    this.userStore.getUsernameFromStore()
    .subscribe(val =>{
      const usernameFromToken = this.authenticateService.getUsernameFromToken();
      this.username = val || usernameFromToken
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase()

    if(this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

}
