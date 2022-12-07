import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2';
import { BillDataService } from '../shared/services/bill-data.service';

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
  tempExpense:number=0;
  tempIncome:number=0;

  constructor(private expenseDataService:ExpenseDataService, private userDataService:UsersService, private billDataService:BillDataService) { }

  ngOnInit(): void {
      if(!this.expenseDataService.showedNotification){
        setTimeout(() => {
          this.onExpenseAlert();
          this.expenseDataService.showedNotification=true;
        }, 10000);
      }
      this.billDataService.getBillData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
        res.forEach(element => {
          
          if(new Date(element.dueDate).getFullYear()-new Date().getFullYear()==0){
    
            
            if(new Date(element.dueDate).getMonth()-new Date().getMonth()>=0){
              
              if(new Date(element.dueDate).getDay()-new Date().getDay()==1){
                this.notifications.push("Bill Due with category: "+element.category);
                this.expenseDataService.notifications=this.notifications;

              }
            }
          }
        });
       
      })

    this.expenseDataService.getMonthlyData((new Date().getMonth()+1).toString(), JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      this.transactions[0]=res.length;
      this.transactions[1]="Transactions";
      for (const key in res) {
        if(res[key].expenseType=='expense'){
            this.tempExpense+=res[key].amount;          
        }
        if(res[key].expenseType=='income'){
          this.tempIncome+=res[key].amount;          
      }
      }
      this.montlyIncome.push(this.tempIncome);
      this.montlyIncome.push("Income");
      this.expense.push(this.tempExpense);
      this.expense.push("Expense");
      this.balance.push(this.montlyIncome[0]-this.expense[0]);
      this.balance.push("Balance");
      
    })
     }


     onBillsAlert(){
     
      Swal.fire({
        icon: 'warning',
         title: 'Reminder',
         text: "Please check today's expenses",
         confirmButtonText: 'Okay',
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
        if (!result.isConfirmed) {
          this.notifications.push("Reminder: Add Expense");
          this.expenseDataService.notifications=this.notifications;
        }
      })
    }

}
