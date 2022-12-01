import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseDataService } from '../services/expense-data.service';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  @ViewChild("table") table;

  isFormValid: boolean = true;
  constructor(private expenseDataService :ExpenseDataService, private modalService: NgbModal) {}
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
