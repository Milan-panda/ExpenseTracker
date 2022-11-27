import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { UserInfoModel } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo:UserInfoModel;
  signupForm:FormGroup;

  constructor(private dataService:DataService){

  }
  ngOnInit(){
    this.signupForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required]),
    });
  }


  onSubmit(){
    this.userInfo = new UserInfoModel();
    this.userInfo.email=this.signupForm.value.email;
    this.userInfo.password=this.signupForm.value.password;
    this.dataService.authUserLogin(this.userInfo).subscribe(res=>{
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

