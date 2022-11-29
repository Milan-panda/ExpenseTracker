import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  private userSub: Subscription;
  isAuthenticated:boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(user=>{      
      this.isAuthenticated = !!user;
    });
      
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
