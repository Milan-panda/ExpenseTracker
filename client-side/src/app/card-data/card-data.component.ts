import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit,OnChanges {

  @Input() data:any[]=null;
  @Input() isBalance:boolean=false;
  @Input() isIncome:boolean=false;
  @Input() isExpense:boolean=false;
  @Input() isTransaction:boolean=false;

  constructor(private expenseDataService:ExpenseDataService, private userDataService:UsersService) { }


  ngOnInit(): void {
 
    console.log("onint",this.data);
    
    // console.log(this.data.split(" "));
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log("hieee",this.data);
      
  }


}
