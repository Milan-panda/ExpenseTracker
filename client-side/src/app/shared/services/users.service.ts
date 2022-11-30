import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient,) { }

  public getUserData(email:string): Observable<any> {
    const url = this.apiURL + "users";
    let queryParam = new HttpParams();
    queryParam = queryParam.append('email', email);
    return this.httpClient.get<any>(url,{params:queryParam});
}
}
