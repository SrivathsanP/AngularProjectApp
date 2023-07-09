import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  loginForm!: FormGroup;
  passwordType = 'password';
  constructor(private fb: FormBuilder, private coreService: CoreService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    localStorage.clear()
    this.initForm()
  }
  initForm() {
    this.loginForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  setPasswordType() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
  }

  formSubmitHandler() {
    this.isLoading = true;
    this.coreService.getData('users?user_name=' + this.loginForm.value.user_name + '&password=' + this.loginForm.value.password).subscribe(res => {
      var returArr: any = res
      this.isLoading = false
      if (returArr.length > 0) {

        this.snackBar.open("Logged in Successfully!", 'Success');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_name', this.loginForm.value.user_name);
        this.setLoginActivity();
        this.router.navigate(['admin'])

      } else {
        this.snackBar.open("username or password is wrong!", 'Error');
        this.loginForm.reset()

      }
    })

  }

  setLoginActivity() {
    var sendData = {
      name: this.loginForm.value.user_name,
      date: new Date(),
      type: 'Login'
    }
    this.coreService.postData('loginActivity', sendData).subscribe(res => {

    })
  }
}
