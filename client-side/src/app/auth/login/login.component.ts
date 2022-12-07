import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserInfoModel } from '../../shared/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo:UserInfoModel;
  signupForm:FormGroup;
  isLoading=false;
  errorMsg=null;

  constructor(private authService:AuthService, private router:Router){

  }
  ngOnInit(){
    this.signupForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required]),
    });
  }


  onSubmit(){
    this.errorMsg=null;
    this.isLoading=true;
    setTimeout(() => {
      this.isLoading=false;
    }, 2000);
    this.userInfo = new UserInfoModel();
    this.userInfo.email=this.signupForm.value.email;
    this.userInfo.password=this.signupForm.value.password;
    this.authService.authUserLogin(this.userInfo).subscribe(res=>{
      console.log(res);
        this.isLoading=false;
        this.router.navigate(['/dashboard']);
    },
    error =>{
      console.log(error);
      setTimeout(() => {
        this.errorMsg=error.error.message;
        this.isLoading=false;
      }, 1000);
      }
    );
  }
  
  submitted(){
    if(this.signupForm.invalid)
      return true;
    else
      return false;
  }

}

