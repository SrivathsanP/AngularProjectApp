import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode: boolean = false;

  constructor() { }

  getDarkMode(): boolean {
    return this.isDarkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    // You can perform additional logic here when the mode is updated
  }
}
