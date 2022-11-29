import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ExpenseDataService } from '../services/expense-data.service';
import { ExpenseModel } from '../shared/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  expense: ExpenseModel
  addExpenseForm:FormGroup;

  constructor(private expenseService:ExpenseDataService) { }

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
    console.log(this.addExpenseForm);
    
    this.expense.date = this.addExpenseForm.value.date;
    this.expense.expenseType = this.addExpenseForm.value.expenseType;
    this.expense.category = this.addExpenseForm.value.category;
    this.expense.description = this.addExpenseForm.value.desc;
    this.expense.amount = this.addExpenseForm.value.amount;
    this.expense.paymentMode = this.addExpenseForm.value.paymentMode;
    this.expense.email = "aditya@gmail.com";
    this.expenseService.addExpenseData(this.expense).subscribe(res=>{
      console.log("thisssss",res);
      
    })
  }

  submitted(){
    if(this.addExpenseForm.invalid)
      return true;
    else
      return false;
  }

}
