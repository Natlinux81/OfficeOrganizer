import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/shared/validateForm';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
    private authenticateService : AuthenticateService,
    private userStore : UserStoreService) {}


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

        // Send the obj to database
        this.authenticateService.signIn(this.loginForm.value).subscribe({
          next:(result) => {
            this.loginForm.reset();
            this.authenticateService.storeToken(result.accessToken);
            this.authenticateService.storeRefreshToken(result.refreshToken)
            const tokenPayload = this.authenticateService.decodedToken();
            this.userStore.setUsernameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.router.navigate(['dashboard'])
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
