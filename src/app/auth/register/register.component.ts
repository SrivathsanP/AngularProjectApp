import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false
  registerForm!: FormGroup;
  passwordType = 'password'
  passwordcType = 'password'
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private core: CoreService, private snackBar: MatSnackBar, private auth: AuthService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: this.ConfirmPasswordValidator("password", "confirm_password")
    })


  }

  

  consoleIt() {
    console.log(this.registerForm)
  }
  setPasswordType() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
  }
  setcPasswordcType() {
    if (this.passwordcType == 'password') {
      this.passwordcType = 'text'
    } else {
      this.passwordcType = 'password'
    }
  }

  formsubmitHandler() {
    this.isLoading = true
    this.auth.checkUserRegistered(this.registerForm.value.user_name).subscribe((res) => {
      var returArr: any = res

      if (returArr.length > 0) {
        this.snackBar.open('Username already exist!', 'close');
        this.isLoading = false;
        console.log(returArr.length);
      } else {
        //send data
        var sendData = {
          user_name: this.registerForm.value.user_name,
          password: this.registerForm.value.password
        }

        //http request 
        this.core.postData('users', sendData).subscribe((res) => {
          this.snackBar.open('Registered Successfully!', 'close');
          this.router.navigate(['auth'])
          this.registerForm.reset();
          this.isLoading = false
        }, (error) => {
          this.snackBar.open('Something went wrong!', 'close');
          this.isLoading = false;
        })
      }
    }, ((error) => {
      console.log('Registration error:', error);
      this.snackBar.open('An error occurred while registering!', 'close');
      this.isLoading = false;
    }))



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


