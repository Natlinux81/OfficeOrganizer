import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Amount } from 'src/app/models/amount';

@Component({
  selector: 'app-add-edit-amount',
  templateUrl: './add-edit-amount.component.html',
  styleUrl: './add-edit-amount.component.scss'
})
export class AddEditAmountComponent {
  @Input() data!: Amount;

  constructor( public activeModal: NgbActiveModal, private formBuilder : FormBuilder) {}

  AddAmountForm = this.formBuilder.group({
    description: ['' , [Validators.required, Validators.minLength(3)]],
    amounts: ['' , Validators.required],
    earning: ['' , Validators.required],
    expense: ['' , Validators.required],
    monthly: ['' , Validators.required],
   
  });

  saveAmount() {
    console.log(this.AddAmountForm.value);
  }
}
