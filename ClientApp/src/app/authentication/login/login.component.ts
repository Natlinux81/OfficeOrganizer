import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/shared/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router : Router,
    private formBuilder : FormBuilder) {}


    loginForm = this.formBuilder.group({
      username: ['' , Validators.required],
      password: ['' , Validators.required],
    });

    onSubmit(){
      if (this.loginForm.valid) {
        console.log(this.loginForm.value)
        // Send the obj to database
      } else{
        // throw error
        ValidateForm.validateAllFormFields(this.loginForm)
      }
    }
}
