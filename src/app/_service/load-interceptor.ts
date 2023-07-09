export interface LoadInterceptor {
}
import { Injectable } from '@angular/core';

import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';


import { delay, finalize } from "rxjs/operators";
import { LoaderService } from './loader-service.service';
@Injectable({
  providedIn: 'root'
})
export class LoadInterceptor implements HttpInterceptor  {

  constructor(private loader: LoaderService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('loading');
    
    this.loader.show()
    return next.handle(req).pipe(
      delay(300),
      finalize(() =>{ ;
       this.loader.hide()})
    );

  }
}