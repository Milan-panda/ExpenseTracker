import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserInfoModel } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userInfo: UserInfoModel;
  signupForm: FormGroup;
  isLoading = false;
  errorMsg: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      currency: new FormControl('rupee', [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.errorMsg = null;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.userInfo = new UserInfoModel();
    this.userInfo.firstName = this.signupForm.value.firstName;
    this.userInfo.lastName = this.signupForm.value.lastName;
    this.userInfo.email = this.signupForm.value.email;
    this.userInfo.currency = this.signupForm.value.currency;
    this.userInfo.password = this.signupForm.value.password;

    this.authService.authUserRegister(this.userInfo).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          this.isLoading = false;
          this.errorMsg = error.error.message;
        }, 1000);
      }
    );
  }

  submitted() {
    if (this.signupForm.invalid) return true;
    else return false;
  }
}
