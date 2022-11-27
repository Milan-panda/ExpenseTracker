import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { UserInfoModel } from '../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfo: UserInfoModel;
  signupForm:FormGroup;

  constructor(private dataService:DataService){

  }

  ngOnInit(){
    this.signupForm=new FormGroup({
      'firstName': new FormControl(null,[Validators.required]),
      'lastName': new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'currency':new FormControl('rupee',[Validators.required]),
      'income':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
      
    });
  }

  onSubmit(){
    this.userInfo = new UserInfoModel();
    this.userInfo.firstName = this.signupForm.value.firstName;
    this.userInfo.lastName = this.signupForm.value.lastName;
    this.userInfo.email = this.signupForm.value.email;
    this.userInfo.currency = this.signupForm.value.currency;
    this.userInfo.income = this.signupForm.value.income;
    this.userInfo.password = this.signupForm.value.password;

    this.dataService.authUserRegister(this.userInfo).subscribe(res=>{
      console.log(res);
    });
    
  }
  
  submitted(){
    if(this.signupForm.invalid)
      return true;
    else
      return false;
  }

}
