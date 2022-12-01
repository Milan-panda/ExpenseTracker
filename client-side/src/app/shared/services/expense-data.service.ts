import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseDataService {
  apiURL: string = 'http://localhost:8080/';
  notifications;

  showedNotification=false;
  constructor(private httpClient: HttpClient) {}

  public getTableData(email: string): Observable<any> {
    const url = this.apiURL + 'expense';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('email', email);
    return this.httpClient.get<any>(url, { params: queryParam });
  }

  public addExpenseData(addExpense: ExpenseModel): Observable<any> {
    const url = this.apiURL + 'expense';
    let body = {
      date: addExpense.date,
      expenseType: addExpense.expenseType,
      category: addExpense.category,
      description: addExpense.description,
      amount: addExpense.amount,
      paymentMode: addExpense.paymentMode,
      email: addExpense.email,
    };
    return this.httpClient.post<any>(url, body);
  }

  public deleteExpenseData(id: string): Observable<any> {
    const url = this.apiURL + 'expense';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('id', id);
    return this.httpClient.delete<any>(url, { params: queryParam });
  }
  public getMonthlyData(month: string, email: string): Observable<any> {
    const monthlyURL: string = `http://localhost:8080/monthlyData?month=${month}&email=${email}`;
    return this.httpClient.get<any>(monthlyURL);
  }
  public getYearlyData(year: string, email: string): Observable<any> {
    const yearlyURL: string = `http://localhost:8080/yearlyData?year=${year}&email=${email}`;
    return this.httpClient.get<any>(yearlyURL);
  }
}
