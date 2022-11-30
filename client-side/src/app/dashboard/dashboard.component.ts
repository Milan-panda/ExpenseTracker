import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  montlyIncome=[];
  expense=[];
  balance=[];
  transactions=[];
  tempBalance:number=0;

  constructor(private expenseDataService:ExpenseDataService, private userDataService:UsersService) { }

  ngOnInit(): void {
    this.userDataService.getUserData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      console.log("user data",res);
      this.montlyIncome.push(res[0].income);
      this.montlyIncome.push("Income");
      
    })

    this.expenseDataService.getMonthlyData((new Date().getMonth()+1).toString(), JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      console.log("card data",res);
      this.transactions[0]=res.length;
      this.transactions[1]="Transactions";
      for (const key in res) {
        if(res[key].expenseType=='expense'){
            this.tempBalance+=res[key].amount;          
        }
      }
      this.expense[0]=this.tempBalance;
      this.expense[1]="Expense";
      this.balance[0]= this.montlyIncome[0]-this.expense[0];
      this.balance[1]="Balance";
      
    })
     }

}
