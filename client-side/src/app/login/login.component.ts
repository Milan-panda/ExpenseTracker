import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm:FormGroup;
  user={
    email:'',
    password:'',
  };
  isSubmitted=false;
  ngOnInit(){
    this.signupForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required]),
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.isSubmitted=true;
  }
  
  submitted(){
    if(this.signupForm.invalid)
      return true;
    else
      return false;
  }

}

