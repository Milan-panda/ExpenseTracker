import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {
  apiURL: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(
    private httpClient: HttpClient,
    ) { 

  }

  public getTableData(): Observable<any> {
    const url = this.apiURL;
    return this.httpClient.get<any>(url);
}
}
