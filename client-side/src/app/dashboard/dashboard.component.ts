import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../services/expense-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: ExpenseDataService) { 
  }
   myObserver = {
    next: (x) => console.log('Observer got a next value: ' + JSON.stringify(x)),
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  ngOnInit(): void {

    //  console.log(this.service.getMonthlyData("12").subscribe(this.myObserver))
  }

}
