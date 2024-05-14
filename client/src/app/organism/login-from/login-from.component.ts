import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-from',
  templateUrl: './login-from.component.html',
  styleUrls: ['./login-from.component.css'],
})
export class LoginFromComponent {
  constructor(private router: Router) {}
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

  routeTO(goto: string, query: string) {
    this.router.navigate(['/' + goto]);
  }
}
