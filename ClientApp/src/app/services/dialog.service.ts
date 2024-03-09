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
    const modalRef = this.modalService.open(InfoDialogComponent, {centered: true, backdrop: 'static' });
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
      title: 'Action Succeed',
      message: '',
      icon: "bi bi-check-square-fill",
      color:'green',
      buttons: [{ text: 'OK', action: () => this.handleOK() }]
    });
  }

  error() {
    this.infoDialog({
      title: 'Something is wrong!',
      message: 'Username or Password wrong',
      icon: "bi bi-x-octagon-fill",
      color: 'red',
      buttons: [{ text: 'OK', action: () => this.handleOK() }]
    })
  }

  warning() {
    this.infoDialog({
      title: 'Are you sure?',
      message: 'Do you want to delete?',
      icon: "bi bi-exclamation-triangle-fill",
      color: 'red',
      buttons: [
        { text: 'Save', action: () => this.handleSave() },
        { text: 'OK', action: () => this.handleOK() }
      ]
    });
  }
  private handleSave() {
    throw new Error('Method not implemented.');
  }
  private handleOK() {
    this.modalService.dismissAll();
  }
}



