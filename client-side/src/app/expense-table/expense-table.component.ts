import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseDataService } from '../shared/services/expense-data.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit,OnChanges {
  constructor(private expenseDataService :ExpenseDataService) {}
  @Input() recentTransaction:boolean;
  p:number=1
  data = [];
  showData = [];
  firstTime:boolean=true;
  count: number = 1;
  currentPage: number = 1;
  showPrevious: boolean = true;
  email = JSON.parse(localStorage.getItem('userData')).email;
  ngOnInit(): void {
    this.expenseDataService.getTableData(this.email).subscribe((res) => {      
      if(res){
        for(let key in res){
          res[key].date = new Date(res[key].date).getDate().toString()+"/"+new Date(res[key].date).getMonth().toString() +"/"+ new Date(res[key].date).getFullYear().toString();
          
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

  onDelete(event){
    
    this.expenseDataService.deleteExpenseData(event._id).subscribe(res=>{
      this.data.forEach((row,index) => {
     
        
        if(row._id==event._id){
          console.log("found");
          
          this.data.splice(index,1);
        }
        
      });
      console.log("data",this.data);
      
      
    })
  }
}
