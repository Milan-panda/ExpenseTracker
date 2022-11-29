import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit,OnChanges {
  constructor(private expenseDataService :ExpenseDataService) {}
  data = [];
  showData = [];
  firstTime:boolean=true;
  count: number = 1;
  currentPage: number = 1;
  showPrevious: boolean = true;
  ngOnInit(): void {
    const email = JSON.parse(localStorage.getItem('userData')).email;
    this.expenseDataService.getTableData(email).subscribe((res) => {      
      if(res){
        for(let key in res){
          console.log("data",res[key]);
          res[key].date = new Date(res[key].date).getDate().toString()+"/"+new Date(res[key].date).getMonth().toString() +"/"+ new Date(res[key].date).getFullYear().toString();
          console.log(new Date(res[key].date));;
          
        }
        this.data=res;
        this.firstTime=false;       
      }
      
    });

  
  }

  ngOnChanges() {

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

  getUpdatedData(data){
    console.log("compo",data);
    data.date = new Date(data.date).getDate().toString()+"/"+new Date(data.date).getMonth().toString() +"/"+ new Date(data.date).getFullYear().toString();

   if(!this.firstTime){
    this.data.push(data);
   }   
  }
}
