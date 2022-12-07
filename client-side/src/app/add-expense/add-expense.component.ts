import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseModel } from '../shared/expense.model';
import { ExpenseDataService } from '../shared/services/expense-data.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  expense: ExpenseModel
  addExpenseForm:FormGroup;
  @Output() myOutput:EventEmitter<any[]>= new EventEmitter();  
  showExpense:string;
  constructor(private expenseDataService:ExpenseDataService, private router: Router) { }

  ngOnInit() {
    const date = new Date();
    this.addExpenseForm=new FormGroup({
      'date':new FormControl(null, [Validators.required]),
      'expenseType': new FormControl("expense", [Validators.required]),
      'category': new FormControl("others", [Validators.required]),
      'desc': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'paymentMode': new FormControl("cash", [Validators.required])

    })

    
  }

  onSubmit(){
    this.expense = new ExpenseModel();
    this.expense.date = this.addExpenseForm.value.date;
    this.expense.expenseType = this.addExpenseForm.value.expenseType;
    this.expense.category = this.addExpenseForm.value.category;
    this.expense.description = this.addExpenseForm.value.desc;
    this.expense.amount = this.addExpenseForm.value.amount;
    this.expense.paymentMode = this.addExpenseForm.value.paymentMode;
    this.expense.email = JSON.parse(localStorage.getItem('userData')).email;
    this.expenseDataService.addExpenseData(this.expense).subscribe(res=>{
      this.myOutput.emit(res);
    })

    this.expenseDataService.getTableData(this.expense.email).subscribe((res) => {      
      if(res){
        for(let key in res){
          res[key].date = new Date(res[key].date).getDate().toString()+"/"+new Date(res[key].date).getMonth().toString() +"/"+ new Date(res[key].date).getFullYear().toString();          
        }

      }
      
    });
  }

  submitted(){
    if(this.addExpenseForm.invalid)
      return true;
    else
      return false;
  }

}
