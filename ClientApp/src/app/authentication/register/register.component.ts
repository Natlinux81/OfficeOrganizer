import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import ValidateForm from 'src/app/shared/validateForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router : Router,
    private formBuilder : FormBuilder ){}


registerForm = this.formBuilder.group({
  username: ['' , Validators.required],
  email: ['' , Validators.required],
  password: ['' , Validators.required],
  confirmPassword: ['' , Validators.required],
  terms: ['', Validators.required]
});

onSubmit(){
  if (this.registerForm.valid) {
    console.log(this.registerForm.value)
    // Send the obj to database
  } else{
    // throw error
    ValidateForm.validateAllFormFields(this.registerForm)
  }
}

}
