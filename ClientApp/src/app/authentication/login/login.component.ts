import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/shared/validateForm';
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type: string = "password";
  isText: boolean = true;
  eyeIcon: string = "bi-eye-slash"

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authenticateService : AuthenticateService) {}


    loginForm = this.formBuilder.group({
      username: ['' , Validators.required],
      password: ['' , Validators.required],
    });

    hideShowPassword(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }

    onSignIn(){
      if (this.loginForm.valid) {
        console.log(this.loginForm.value)
        // Send the obj to database
        this.authenticateService.signIn(this.loginForm.value).subscribe({
          next:(result) => {
            alert(result.message)
            this.loginForm.reset();
            this.authenticateService.storeToken(result.token);
            this.router.navigate(['todo'])
          },
          error:(err) =>{
            alert(err?.error.message)
          }
        })

      } else{
        // throw error
        ValidateForm.validateAllFormFields(this.loginForm)
      }
    }

}
