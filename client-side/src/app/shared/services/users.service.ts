import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoModel } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURL: string = 'http://localhost:8080/';

  user = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  public getUserData(email: string): Observable<any> {
    const url = this.apiURL + 'users';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('email', email);
    return this.httpClient.get<any>(url, { params: queryParam });
  }
  public updateUserData(userData:any): Observable<any> {
    const url = this.apiURL + 'users';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('id', userData._id);

    const body={
      firstName:userData.firstName,
      lastName:userData.lastName,
      income:userData.income
    }
    return this.httpClient.put<any>(url,body,{ params: queryParam });
  }
  public deleteUsersData(id: string): Observable<any> {
    const url = this.apiURL + 'users';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('id', id);
    return this.httpClient.delete<any>(url, { params: queryParam });
  }
}
