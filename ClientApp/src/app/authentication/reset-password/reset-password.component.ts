import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { ResetPasswordModel } from 'src/app/models/reset-password-model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ConfirmPasswordValidator } from 'src/app/helper/reset-password-validator';
import ValidateForm from 'src/app/helper/validateForm';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  type: string = "password";
  isText: boolean = true;
  eyeIcon: string = "bi-eye-slash" 

  resetForm!: FormGroup; 
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPasswordModel();

  constructor(private formBuilder : FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private resetService : ResetPasswordService,
              private router : Router) { }


  ngOnInit() : void {
    this.resetForm = this.formBuilder.group({
      password: ['' , Validators.required],
      confirmPassword: ['' , Validators.required],
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val ['email'];
      let uriToken = val ['code'];
      this.emailToken = uriToken.replace(/ /g,'+');
      console.log(this.emailToken)
      console.log(this.emailToReset)
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  reset() {
    if (this.resetForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          alert(res.message);
          this.router.navigate(['/'])
        },
        error:(err)=>{
          alert(err.message)
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.resetForm);
    }
  }

}
