import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../expense.model';
import jsPDF from 'jspdf';  
import 'jspdf-autotable'

@Injectable({
  providedIn: 'root',
})
export class ExpenseDataService {
  apiURL: string = 'http://localhost:8080/';
  monthlyData = [];
  yearlyData = [];

  notifications;

  showedNotification=false;
  constructor(private httpClient: HttpClient) {
    
  }

  public getTableData(email: string): Observable<any> {
    const url = this.apiURL + 'expense';
    let queryParam = new HttpParams();
    queryParam = queryParam.append('email', email);
    this.getYearlyData(new Date().getFullYear().toString(), JSON.parse(localStorage.getItem('userData')).email).subscribe({next: (data)=>{
      data.forEach(item => {
        item.date = new Date(item.date);
      })

      this.yearlyData = data;
      this.yearlyData.sort((a, b) => a.date < b.date? 1: -1);
      this.yearlyData.forEach((item) =>{
        var options = {  day: 'numeric', month: 'numeric', year: 'numeric' };
        item.date = item.date.toLocaleDateString('in', options);
      })
    }})
    this.getMonthlyData((new Date().getMonth()+1).toString(), JSON.parse(localStorage.getItem('userData')).email).subscribe({next: (data)=>{
      data.forEach(item => {
        item.date = new Date(item.date);
      })
      this.monthlyData = data;
      this.monthlyData.sort((a, b) => a.date < b.date? 1: -1);
      this.monthlyData.forEach((item) =>{
        var options = {  day: 'numeric', month: 'numeric', year: 'numeric' };
        item.date = item.date.toLocaleDateString('in', options);
      })
    }})
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
  public pdfDownload(yearlyOrMonthly: string){
    const doc = new jsPDF();
   

    doc.autoTable({
      columns:[
        { header: 'Date', dataKey: 'date' },
        { header: 'Category', dataKey: 'category' },
        { header: 'Description', dataKey: 'description' },
        { header: 'Amount', dataKey: 'amount' },
        { header: 'Payment Mode', dataKey: 'paymentMode' },
      ],

      
      body: yearlyOrMonthly === 'Yearly'? this.yearlyData: this.monthlyData,
      margin:{top:20},
      didDrawPage:function(){
      doc.text("Transactions", 20, 15);
    }})
    doc.save("transactions.pdf");
  }
}
