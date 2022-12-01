import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';  
import 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {
  apiURL: string = "https://jsonplaceholder.typicode.com/posts";
  monthlyData = [];
  yearlyData = []
  constructor(
    private httpClient: HttpClient,
    ) { 
      this.getYearlyData('2022', 'hi@gmail.com').subscribe({next: (data)=>{
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
      this.getMonthlyData('12', 'hi@gmail.com').subscribe({next: (data)=>{
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
