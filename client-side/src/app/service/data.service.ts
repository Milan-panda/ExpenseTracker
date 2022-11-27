import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoModel } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiURL: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  public authUserLogin(userInfo: UserInfoModel): Observable<any> {
    console.log('dataaa', userInfo.email);
    console.log('dataaa', userInfo.password);

    const url = this.apiURL + 'auth';
    let body = {
      email: userInfo.email,
      password: userInfo.password,
    };
    return this.httpClient.post<any>(url, body);
  }
}
