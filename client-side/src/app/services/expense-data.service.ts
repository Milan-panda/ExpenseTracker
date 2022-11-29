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
    public getMonthlyData(month: string, email: string): Observable<any> {
      const monthlyURL: string = `http://localhost:8080/monthlyData?month=${month}&email=${email}`;
      return this.httpClient.get<any>(monthlyURL);
    }
    public getYearlyData(year: string, email: string): Observable<any> {
  const yearlyURL : string = `http://localhost:8080/yearlyData?year=${year}&email=${email}`
  return this.httpClient.get<any>(yearlyURL);
}
  public getTableData(): Observable<any> {
    const url = this.apiURL;
    return this.httpClient.get<any>(url);
}
}
