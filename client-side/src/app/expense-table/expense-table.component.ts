import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../services/expense-data.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  constructor(private expenseDataService :ExpenseDataService) {}
  data = [];
  showData = [];
  count: number = 1;
  currentPage: number = 1;
  showPrevious: boolean = true;
  ngOnInit(): void {
    this.expenseDataService.getTableData().subscribe((res) => {      
      if(res){
        this.data = res;
        this.data.forEach((row) => {
          if (row.userId == 1) {
            this.showData.push(row);
          }
        });
      }
    });
  }

  onNext() {
    this.currentPage += 1;
    this.showData = [];

    this.data.forEach((row) => {
      
      if (parseInt(row.userId) == this.currentPage) {
        this.showData.push(row);
      }
    });
  }
  onPrevious() {
    this.currentPage -= 1;
    this.showData = [];
    // if(this.count==100){
    //   this.count=99;
    // }

    this.data.forEach(row=>{
      if(row.userId==this.currentPage){
        this.showData.push(row);
      }
    })
  }
}
