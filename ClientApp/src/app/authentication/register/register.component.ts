import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import ValidateForm from 'src/app/shared/validateForm';
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authenticateService : AuthenticateService ){}


registerForm = this.formBuilder.group({
  username: ['' , Validators.required],
  email: ['' , Validators.required], //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  password: ['' , Validators.required],
  terms: ['', Validators.required]
});

onSignUp(){
  if (this.registerForm.valid) {
    console.log(this.registerForm.value)
    // Send the obj to database
    this.authenticateService.signUp(this.registerForm.value).subscribe({
      next:(result) => {
        alert(result.message)
        this.registerForm.reset();
        this.router.navigate(['/login'])
      },
      error:(err) =>{
        alert(err?.error.message)
      }
    })
  } else{
    // throw error
    ValidateForm.validateAllFormFields(this.registerForm)
  }
}

}
