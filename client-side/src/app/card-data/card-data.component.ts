import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit {

  constructor(private expenseDataService:ExpenseDataService) { }

  montlyIncome:number=0;
  expense:number=0;
  balance:number=0;
  transactions:number=0;

  ngOnInit(): void {


    this.expenseDataService.getMonthlyData((new Date().getMonth()+1).toString(), JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      console.log("card data",res);
      
    })
  }


}
