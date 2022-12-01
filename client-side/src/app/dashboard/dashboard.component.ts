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

  constructor(private expenseDataService:ExpenseDataService, private userDataService:UsersService, private billDataService:BillDataService) { }

  ngOnInit(): void {
    this.userDataService.getUserData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
      console.log("user data",res);
      this.montlyIncome.push(res[0].income);
      this.montlyIncome.push("Income");
      
      if(!this.expenseDataService.showedNotification){
        setTimeout(() => {
          this.onExpenseAlert();
          this.expenseDataService.showedNotification=true;
        }, 10000);
      }
      this.billDataService.getBillData(JSON.parse(localStorage.getItem('userData')).email).subscribe(res=>{
        console.log("billi",res);

        res.forEach(element => {
          console.log(new Date(element.dueDate).getFullYear()-new Date().getFullYear());
          
          if(new Date(element.dueDate).getFullYear()-new Date().getFullYear()==0){
    
            
            if(new Date(element.dueDate).getMonth()-new Date().getMonth()>=0){
              
              if(new Date(element.dueDate).getDay()-new Date().getDay()==1){
                console.log("day passed");
                console.log("hi baby");
                this.notifications.push("Bill Due with category: "+element.category);
                console.log("notification",this.notifications);
                this.expenseDataService.notifications=this.notifications;

              }
            }
          }
        });
       
        
        console.log(  );
        
        console.log( );
        
        // console.log(new Date()-res[0].date);
        
      })
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
        console.log(result);
        if (!result.isConfirmed) {
          this.notifications.push("Reminder: Add Expense");
          this.expenseDataService.notifications=this.notifications;
          console.log("dash noti",this.notifications);
        }
      })
    }

}
