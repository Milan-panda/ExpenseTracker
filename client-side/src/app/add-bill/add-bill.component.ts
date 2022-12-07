import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BillModel } from '../shared/bill.model';
import { BillDataService } from '../shared/services/bill-data.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  bill: BillModel;
  addBillForm: FormGroup;
  @Output() myOutput:EventEmitter<any[]>= new EventEmitter(); 

  constructor(private billDataService:BillDataService) { }

  ngOnInit() {
    this.addBillForm=new FormGroup({
      'date':new FormControl(null, [Validators.required]),
      'category': new FormControl("others", [Validators.required]),
      'desc': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(){
    this.bill = new BillModel();
    this.bill.dueDate = this.addBillForm.value.date;
    this.bill.category = this.addBillForm.value.category;
    this.bill.description = this.addBillForm.value.desc;
    this.bill.amount = this.addBillForm.value.amount;
    this.bill.email = JSON.parse(localStorage.getItem('userData')).email;
    this.billDataService.addBillData(this.bill).subscribe(res=>{
      this.myOutput.emit(res);
    })

    this.billDataService.getBillData(this.bill.email).subscribe((res) => {      
      if(res){
        for(let key in res){
          res[key].dueDate = new Date(res[key].dueDate).getDate().toString()+"/"+new Date(res[key].dueDate).getMonth().toString() +"/"+ new Date(res[key].dueDate).getFullYear().toString();          
        }
        res;

      }
      
    });
  }


  submitted(){
    if(this.addBillForm.invalid)
      return true;
    else
      return false;
  }

}
