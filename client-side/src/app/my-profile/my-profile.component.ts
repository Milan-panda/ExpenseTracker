import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import { UserInfoModel } from '../shared/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userInfo: UserInfoModel;
  @ViewChild('f') signupForm:NgForm;
  data:any;

  constructor(private usersService:UsersService){
  }

   ngOnInit(){
  
    this.usersService.getUserData().subscribe( res=>{
      console.log(res);
       this.data=res[0];
    });
    
    
  }

  onSubmit(){

    // this.userInfo = new UserInfoModel();
    // this.userInfo.firstName = this.signupForm.value.firstName;
    // this.userInfo.lastName = this.signupForm.value.lastName;
    // this.userInfo.email = this.signupForm.value.email;
    // this.userInfo.currency = this.signupForm.value.currency;
    // this.userInfo.income = this.signupForm.value.income;
    // this.userInfo.password = this.signupForm.value.password;

    console.log();
    
    
  }
  
  submitted(){

}
}
