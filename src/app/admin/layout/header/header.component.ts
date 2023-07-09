import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/_service/core.service';
import { ThemeService } from '../../../_service/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private coreService: CoreService,
    private themeService: ThemeService
  ) { 
    this.isDarkMode = this.themeService.getDarkMode();
  }
  
  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  
  logout() {
    this.setLoginActivity();
    localStorage.clear();
    this.snackbar.open('Logged out successfully!', 'close');
    this.router.navigate(['auth']);
  }

  setLoginActivity() {
    var sendData = {
      name: localStorage.getItem('user_name'),
      date: new Date(),
      type: 'Logout'
    }
    this.coreService.postData('loginActivity', sendData).subscribe(res => {
    });
  }
}
