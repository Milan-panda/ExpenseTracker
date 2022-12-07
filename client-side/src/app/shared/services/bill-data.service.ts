import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillModel } from '../bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillDataService {
  apiURL: string = 'https://expense-tracker-api-ayk2.onrender.com/';

  constructor(private httpClient: HttpClient) { }

  public getBillData(email:string): Observable<any> {
    const url = this.apiURL + 'bill';
    let queryParam = new HttpParams();
    queryParam = queryParam.append("email",email);
    return this.httpClient.get<any>(url,{params:queryParam});
  }

  public addBillData(addBill: BillModel): Observable<any> {
    const url = this.apiURL + 'bill';
    console.log("in service",addBill);
    
    let body = {
      dueDate: addBill.dueDate,
      category: addBill.category,
      description: addBill.description,
      amount: addBill.amount,
      email: addBill.email,
    };
    return this.httpClient.post<any>(url, body);
  }

  public deleteBillData(id: string): Observable<any> {
    const url = this.apiURL + 'bill';
    let queryParam = new HttpParams();
    queryParam = queryParam.append("id",id);
    return this.httpClient.delete<any>(url,{params:queryParam});
  }

  // public updateBillData(event: any): Observable<any> {
  //   const url = this.apiURL + 'bill';
  //   let queryParam = new HttpParams();
  //   queryParam = queryParam.append("id",event._id);
  //   const body={
  //     paid:!event.paid
  //   }
  //   console.log("bodydyyy",body);
  //   return this.httpClient.put<any>(url,body,{params:queryParam});
  // }
}
