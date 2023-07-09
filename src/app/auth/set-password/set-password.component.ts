import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/_service/core.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {
  isLoading = false
  registerForm!: FormGroup;
  passwordType = 'password'
  passwordcType = 'password'
  constructor(private router: Router, private fb: FormBuilder, private coreService: CoreService, private snackbar: MatSnackBar, private auth: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({

      user_name: ['',Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    },{
      validator: this.ConfirmPasswordValidator("new_password", "confirm_password")
    });


  }
  formSubmitHandler() {
    this.isLoading = true;
    this.auth.checkUserRegistered(this.registerForm.value.user_name).subscribe((res) => {
      var returnArr: any = res;
  
      if (returnArr.length > 0) {
        // Send data
        var sendData = {
          user_name: this.registerForm.value.user_name, // Include the username
          password: this.registerForm.value.new_password,
        };
  
        // HTTP request 
        this.coreService.postData('users', sendData).subscribe((res) => {
          this.snackbar.open('password Changed Successfully', 'close');
          this.router.navigate(['auth/login'])
          this.registerForm.reset();
          this.isLoading = false
        })
      } else {
        this.snackbar.open("error")
      }
    });
  }
  
  
  

  setPasswordType() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
  }
  setPasswordcType() {
    if (this.passwordcType == 'password') {
      this.passwordcType = 'text'
    } else {
      this.passwordcType = 'password'
    }
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


}