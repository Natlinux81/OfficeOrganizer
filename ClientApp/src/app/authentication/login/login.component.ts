import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helper/validateForm';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordPopupComponent } from '../forgot-password-popup/forgot-password-popup.component';
import { DialogService } from 'src/app/services/dialog.service';

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
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private userStore: UserStoreService,
    private modalService: NgbModal,
    private infoService: DialogService) { }


  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignIn() {
    if (this.loginForm.valid) {

      // Send the obj to database
      this.authenticateService.signIn(this.loginForm.value).subscribe({
        next: (result) => {
          this.loginForm.reset();
          this.authenticateService.storeToken(result.accessToken);
          this.authenticateService.storeRefreshToken(result.refreshToken)
          const tokenPayload = this.authenticateService.decodedToken();
          this.userStore.setUsernameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard'])

        },
        error: (err) => {
          this.infoService.error()
        }
      })

    } else {
      // throw error
      ValidateForm.validateAllFormFields(this.loginForm)
    }
  }

  openPopup() {
    this.modalService.open(ForgotPasswordPopupComponent, {centered: true ,backdrop: 'static' });
  }
}
