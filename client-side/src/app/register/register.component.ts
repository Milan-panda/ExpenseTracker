import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm:FormGroup;
  user={
    firstName:'',
    lastName:'',
    email:'',
    currency:'',
    password:''
  };
  isSubmitted=false;
  ngOnInit(){
    this.signupForm=new FormGroup({
      'firstName': new FormControl(null,[Validators.required]),
      'lastName': new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'currency':new FormControl('rupee',[Validators.required]),
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
