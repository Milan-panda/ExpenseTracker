import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../shared/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseDataService {
  apiURL: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  public getTableData(): Observable<any> {
    const url = this.apiURL + 'expense';
    return this.httpClient.get<any>(url);
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
}
