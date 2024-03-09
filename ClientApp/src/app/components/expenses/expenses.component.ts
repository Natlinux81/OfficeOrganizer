import { Component, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Amount } from 'src/app/models/Amount';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  @Input() data!: Amount;

  constructor( public activeModal: NgbActiveModal, private formBuilder : FormBuilder) {}

  AddAmountForm = this.formBuilder.group({
    description: ['' , [Validators.required, Validators.minLength(3)]],
    amount: ['' , Validators.required],
    monthly: ['' , Validators.required],
   
  });

  saveAmount() {
    console.log(this.AddAmountForm.value);
  }

}
