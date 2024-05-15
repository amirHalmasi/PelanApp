import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { numberValidator } from 'src/assets/validation/password.validator';

@Component({
  selector: 'app-login-from',
  templateUrl: './login-from.component.html',
  styleUrls: ['./login-from.component.css'],
})
export class LoginFromComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  loginBtnOption: {
    iconName: string;
   
    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'ورود',
  };
  linkBtnOption_owner: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'button',
    btnText: 'ثبت نام مشاغل',
  };
  linkBtnOption_user: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'button',
    btnText: 'ثبت نام کاربران',
  };
  textInputOption = {
    labelText: 'نام کاربری',
    placeholderText: 'نام کاربری را وارد کنید ',
    FormControlName: 'username',
  };
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, numberValidator()]),
      password: new FormControl('', [
        Validators.required,
        // passwordValidator(),
        numberValidator(),
      ]),
    });
  }
  routeTO(goto: string, query: string) {
    this.router.navigate(['/' + goto]);
  }
  // get passwordErrors() {
  //   return this.loginForm.get('password')?.errors;
  // }
  login() {
    console.log(this.loginForm.value);
    // let provinceUrl = 'https://localhost:5001/api/account/login';
    // // return this.http.get<provinceDto[]>(provinceUrl);
    // this.http.post(provinceUrl, this.loginForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
  }
}
