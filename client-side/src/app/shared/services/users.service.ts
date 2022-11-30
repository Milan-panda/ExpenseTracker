import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient,) { }

  public getUserData(): Observable<any> {
    const url = this.apiURL + "users?email=aditya@gmail.com";
    return this.httpClient.get<any>(url);
}
}
