import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ExpenseDataService } from '../shared/services/expense-data.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  private userSub: Subscription;
  isAuthenticated:boolean = false;
  notifications=[];
  name;
  constructor(private authService:AuthService,private expenseDataService:ExpenseDataService, private usersService: UsersService) {
   }

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(user=>{
   
      this.usersService.user.subscribe(user=>{
        if(user){
          this.name=user.firstName;
        }
      })
        this.isAuthenticated = !!user;
    });
      
    
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onNotification(){
    if(this.expenseDataService.notifications){
      this.notifications= this.expenseDataService.notifications;
    }
    
  }
}
