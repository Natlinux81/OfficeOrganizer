import { Injectable } from '@angular/core';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';
import { Observable, Subject } from 'rxjs';
import { InfoDialogData } from '../models/info-dialog-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) { }

  infoDialog(data: InfoDialogData): Observable<boolean> {
    const modalRef = this.modalService.open(InfoDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.data = data;

    const resultSubject = new Subject<boolean>();

    modalRef.result.then(
      (result) => {
        resultSubject.next(true);
        resultSubject.complete();
      },
      (reason) => {
        resultSubject.next(false);
        resultSubject.complete();
      }
    );

    return resultSubject.asObservable();
  }


  succeed() {
    this.infoDialog({
      title: 'all good',
      message: 'perfect',
      icon: 'check_circle_outline',
      color:'green'
    });
  }

  error() {
    this.infoDialog({
      title: 'Something is wrong!',
      message: 'Username or Password wrong',
      icon: "bi bi-x-octagon-fill",
      color: 'red'
    })
  }
  warning() {
    this.infoDialog({
      title: 'Delete',
      message: 'do you really want to delete',
      icon: "bi bi-exclamation-triangle-fill",
      color: 'orange'
    })
  }
}
