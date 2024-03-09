import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { user } from 'src/app/models/user';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ExpensesComponent } from '../expenses/expenses.component';
import { Amount } from 'src/app/models/Amount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public role!: string;
  public username!: string;
  public page = 1
  public pageSize = 10;
  public usersList: user[] = [];
  public collectionSize = this.usersList.length;
  public filter : string = "";
  public filteredUsersList: Array<user> = this.usersList;
  public selectedDate = new Date();

  constructor(private authenticateService: AuthenticateService, private userStore: UserStoreService, private modalService: NgbModal) {
    this.authenticateService.getAllUsers().subscribe((res) => {
      this.usersList = res;
      this.collectionSize = this.usersList.length;
    });
  }

  ngOnInit(): void {
    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.authenticateService.getRoleFromToken();
      this.role = val || roleFromToken
    });

    this.userStore.getUsernameFromStore()
      .subscribe(val => {
        const usernameFromToken = this.authenticateService.getUsernameFromToken();
        this.username = val || usernameFromToken
      });
  }
  openPopup() {
    const modalRef = this.modalService.open(ExpensesComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.data = { title: "Add Amount" } as Amount;
  }
}
