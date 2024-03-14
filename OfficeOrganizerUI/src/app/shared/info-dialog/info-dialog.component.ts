import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoDialogData } from 'src/app/models/info-dialog-data';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  @Input()
  data!: InfoDialogData;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
