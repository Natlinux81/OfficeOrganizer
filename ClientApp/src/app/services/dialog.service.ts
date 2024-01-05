import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';
import { Observable } from 'rxjs';
import { InfoDialogData } from '../models/info-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(private dialog : MatDialog) { }

infoDialog(data : InfoDialogData) : Observable<boolean> {
  return this.dialog.open(InfoDialogComponent, {
    data,
    width: '300px',
    disableClose: true
  }).afterClosed();
}

succeed(){
  this.infoDialog({
    title: 'all good',
    message: 'perfect',
    icon: 'check_circle_outline',
    color: "green"

  });
}

error() {
  this.infoDialog({
    title: 'something is wrong',
    message: 'not good',
    icon: 'highlight_off',
    color: "red"
  })
};

}
