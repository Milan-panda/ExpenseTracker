import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  addExpenseForm:FormGroup;

  constructor() { }

  ngOnInit() {
    const date = new Date();
    this.addExpenseForm=new FormGroup({
      'date':new FormControl(null, [Validators.required]),
      'expenseType': new FormControl("income", [Validators.required]),
      'category': new FormControl("select", [Validators.required]),
      'desc': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'paymentMode': new FormControl("select", [Validators.required])
    })
  }

  onSubmit(){
    console.log(this.addExpenseForm);
    
  }

  submitted(){
    if(this.addExpenseForm.invalid)
      return true;
    else
      return false;
  }

}
