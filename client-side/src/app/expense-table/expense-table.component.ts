import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseDataService } from '../shared/services/expense-data.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit,OnChanges {
  @Input() recentTransaction:boolean;
  p:number=1
  @ViewChild("table") table;

  isFormValid: boolean = true;
  constructor(private expenseDataService :ExpenseDataService, private modalService: NgbModal) {}
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
          console.log("data",res[key]);
          res[key].date = new Date(res[key].date).getDate().toString()+"/"+(new Date(res[key].date).getMonth()+1).toString() +"/"+ new Date(res[key].date).getFullYear().toString();
          console.log(new Date(res[key].date));
          
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
    data.date = new Date(data.date).getDate().toString()+"/"+(new Date(data.date).getMonth()+1).toString() +"/"+ new Date(data.date).getFullYear().toString();

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

  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  submitPdfForm(form: NgForm){
    const preference = form.value.preference;
    if(preference === ""){
      this.isFormValid = false;
    }else{
      this.expenseDataService.pdfDownload(preference);
      this.modalService.dismissAll()
    }   
  }
  onPdfDownloadModal(content){
    this.isFormValid = true;
    this.open(content)
  }
}
