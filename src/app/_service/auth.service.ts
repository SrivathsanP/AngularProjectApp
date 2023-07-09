import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUsernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
  constructor(private core: CoreService) {}
  
  // Method to check if user is registered and set the logged-in username
  checkUserRegistered(userName: string): Observable<any> {
    return this.core.getData('users?user_name=' + userName).pipe(
      tap((userArr: any[]) => {
        if (userArr.length > 0) {
          // User is registered
          this.loggedInUsernameSubject.next(userName);
        }
      })
      );
    }
  }





  // import { Injectable } from '@angular/core';
  // import { CoreService } from './core.service';
  
  // @Injectable({
  //   providedIn: 'root'
  // })
  // export class AuthService {
  
  //   constructor(private core: CoreService) { }
  
  //   checkUserRegistered(userName: string) {
  
  //     return this.core.getData('users?user_name=' + userName)
  //   }
  // }
