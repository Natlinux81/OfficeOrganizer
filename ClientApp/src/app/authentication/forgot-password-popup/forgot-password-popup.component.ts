import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot-password-popup',
  templateUrl: './forgot-password-popup.component.html',
  styleUrls: ['./forgot-password-popup.component.scss']
})
export class ForgotPasswordPopupComponent {

  
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,                      
                      private ref : MatDialogRef<ForgotPasswordPopupComponent>,
                      private resetService : ResetPasswordService, )
  {
  ref.disableClose = true;
  }  

  checkValidEmail(event :string){
    const value = event;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = emailPattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail)
      
      // API call to be done
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          alert(res.message)
          this.resetPasswordEmail = "";
        },
        error:(err)=>{
          alert(err?.message)
        }
      })
    }
  }

}
