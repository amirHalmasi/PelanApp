// import { Component } from '@angular/core';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

export class Country {
  constructor(public name: string, public code: string) {}
}

@Component({
  selector: 'app-signup-from',
  templateUrl: './signup-from.component.html',
  styleUrls: ['./signup-from.component.css'],
})
// https://stackblitz.com/edit/select-search?file=src%2Fapp%2Fapp.component.html
export class SignupFromComponent {
  signupBtnOption: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'ورود',
  };
}
