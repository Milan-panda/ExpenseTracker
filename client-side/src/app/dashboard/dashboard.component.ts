import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2';

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
  showAlert:boolean=false;
  notifications=[];

  constructor(private expenseDataService:ExpenseDataService, private userDataService:UsersService) { }

  ngOnInit(): void {
    this.userDataService.getUserData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      console.log("user data",res);
      this.montlyIncome.push(res[0].income);
      this.montlyIncome.push("Income");

      setTimeout(() => {
        this.onExpenseAlert();
      }, 10000);
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


     onBillsAlert(){
      Swal.fire({
        icon: 'warning',
         title: 'Reminder',
         text: "Please enter today's expenses",
         timer:10000,
       })
    }

    onExpenseAlert() {

      Swal.fire({
        title: 'Reminder',
        text: "Please enter today's expenses",
        icon: 'warning',
        confirmButtonText: 'Okay',
        timer:5000
      }).then((result) => {
        console.log(result);
        if (!result.isConfirmed) {
          this.notifications.push("Reminder: Add Expense");
          this.expenseDataService.notifications=this.notifications;
          console.log("dash noti",this.notifications);
        }
      })
    }

}
