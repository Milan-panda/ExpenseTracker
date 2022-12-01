import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BillDataService } from '../shared/services/bill-data.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit, OnChanges {

  constructor(private billDataService:BillDataService) { }
  @Input() recentBill:boolean;
  data=[];
  showData=[];
  firstTime:boolean=true;

  email=JSON.parse(localStorage.getItem('userData')).email;
  p:number=1;

  ngOnInit(): void {
    this.billDataService.getBillData(this.email).subscribe((res)=>{
      if(res){
        for(let key in res){
          console.log("data", res[key]);
          res[key].dueDate = new Date(res[key].dueDate).getDate().toString()+"/"+(new Date(res[key].dueDate).getMonth()+1).toString() +"/"+ new Date(res[key].dueDate).getFullYear().toString();
          
        }
        this.data=res;
        this.firstTime=false;       
      }
    })
  }
  ngOnChanges() {
      
  }
  getUpdatedData(data){
    console.log("compo",data);
    data.dueDate = new Date(data.dueDate).getDate().toString()+"/"+(new Date(data.dueDate).getMonth()+1).toString() +"/"+ new Date(data.dueDate).getFullYear().toString();

   if(!this.firstTime){
    this.data.push(data);
   }   
  }

  // onPaid(event){
  //   console.log("clicked",event);
  //   this.billDataService.updateBillData(event).subscribe(res=>{
  //     console.log("after paid",res);
  //     this.isPaid=true;
  //   });
  // }

  onDelete(event){
    
    this.billDataService.deleteBillData(event._id).subscribe(res=>{
      console.log(res);
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
