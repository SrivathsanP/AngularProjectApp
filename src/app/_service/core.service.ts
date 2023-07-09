import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getData(endPoint: string): Observable<any> {
    return this.http.get(this.url + '/' + endPoint);
  }

  postData(endPoint: string, sendData: any): Observable<any> {
    return this.http.post(this.url + '/' + endPoint, sendData);
  }

  patchData(endPoint: string, sendData: any): Observable<any> {
    return this.http.patch(this.url + '/' + endPoint, sendData);
  }

  deleteData(endPoint: string): Observable<any> {
    return this.http.delete(this.url + '/' + endPoint);
  }

  updateData(endPoint: string, username: string, updateData: any): Observable<any> {
    return this.http.patch('${this.url}/${endPoint}/${username}', updateData);
  }
}





// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CoreService {
//   url = 'http://localhost:3000';

//   constructor(private http: HttpClient) { }

//   getData(endPoint: string) {
//     return this.http.get(this.url + '/' + endPoint);
//   }
//   postData(endPoint: string, sendData: any) {
//     return this.http.post(this.url + '/' + endPoint, sendData);
//   }
//   patchData(endPoint: string, sendData: any) {
//     return this.http.patch(this.url + '/' + endPoint, sendData);
//   }
//   deleteData(endPoint: string) {
//     return this.http.delete(this.url + '/' + endPoint);
//   }
// }