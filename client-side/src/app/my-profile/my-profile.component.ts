import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { UserInfoModel } from '../shared/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  userInfo: UserInfoModel;
  signupForm:FormGroup;
  data;
  isDataAvailable = false;

  constructor(private usersService: UsersService, private router:Router) {}

  ngOnInit() {
    // initiate execution
    
      // Executer fn...
      this.fetchData();

  
  }

  fetchData() {
    return new Promise((resolve)=>{
      resolve(this.usersService.getUserData(JSON.parse(localStorage.getItem('userData')).email).subscribe((res) => {
        console.log('ressss', res);
        this.data = res[0];
        console.log("data",this.data);
        
        this.isDataAvailable=true;
      }));
    });
  }
  onSubmit() {
    console.log("form data",this.data);
    
    this.usersService.updateUserData(this.data).subscribe(res=>{
      console.log("response after submit",res);
      
    })

    console.log();
  }
  onDelete(){
    if(confirm("Are you sure to delete your profile")) {
      this.usersService.deleteUsersData(this.data._id).subscribe(res=>{
        console.log(res);
        localStorage.removeItem('userData');
        this.router.navigate(["/login"]);
      })
    }
  }

  submitted() {}
}
