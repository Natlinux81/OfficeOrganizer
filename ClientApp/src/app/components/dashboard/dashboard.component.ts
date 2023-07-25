import { Component , OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/models/user';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public usersList!: user[];
  public dataSource: any;
  public role! : string;
  public username : string = "";
  public displayedColumns : string[] =["No.", "Username" ,"E-Mail" , "Role", "Actions"]

  @ViewChild(MatSort ,{static :true}) sort !: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private authenticateService : AuthenticateService, private userStore: UserStoreService){}

  ngOnInit(): void{
    this.authenticateService.getAllUsers().subscribe((res) =>{
      this.usersList = res;
      this.dataSource = new MatTableDataSource<user>(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
