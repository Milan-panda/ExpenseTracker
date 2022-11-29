import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, Subject, tap } from 'rxjs';
import { UserAuthModel } from '../model/user.model';
import { UserInfoModel } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = new BehaviorSubject<UserAuthModel>(null);

  apiURL: string = 'http://localhost:8080/';

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router:Router) {}

  public authUserLogin(userInfo: UserInfoModel): Observable<any> {
    const url = this.apiURL + 'auth';
    let body = {
      email: userInfo.email,
      password: userInfo.password,
    };
    return this.httpClient.post<any>(url, body).pipe(tap(resData =>{
      const expirationDate = new Date( new Date().getTime() + 3600*1000 );
      const user = new UserAuthModel(body.email, resData.data, expirationDate);
      localStorage.setItem('userData',JSON.stringify(user));
      
      this.user.next(user);
      this.autoLogout(3600*1000);
    }));
  }

  public authUserRegister(userInfo: UserInfoModel): Observable<any> {
    const url = this.apiURL + 'users';
    let body = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      currency: userInfo.currency,
      income: userInfo.income,
      password: userInfo.password,
    };
    return this.httpClient.post<any>(url, body).pipe(tap());
  }
  
  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){      
      return;
    }
    const loadedUser = new UserAuthModel(userData.email, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser){
      
      this.user.next(loadedUser);      
      const expirationDurationRemain = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDurationRemain);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if( this.tokenExpirationTimer ){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }
}
