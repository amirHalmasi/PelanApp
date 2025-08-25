import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import {
  fadeInOut,
  flipInOut,
  slideRightInOut,
} from 'src/app/services/animation';
import { numberValidator } from 'src/assets/validation/password.validator';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { NavBarService } from 'src/app/nav-bar/nav-bar.service';
import { ActionBtnAtomComponent } from '../city-province-modal/action-btn-atom/action-btn-atom.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// 👇 دیگه username و userId نیست
interface loginDto {
  isJobOwner: string;
  agentLinkId?: string;
  loginDate: string;
}

@Component({
  selector: 'app-login-from',
  templateUrl: './login-from.component.html',
  styleUrls: ['./login-from.component.css'],
  animations: [flipInOut],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    ActionBtnAtomComponent,
  ],
})
export class LoginFromComponent implements OnInit {
  hidden: boolean = true;
  show = faEye;
  hide = faEyeSlash;

  constructor(
    private navbarServ: NavBarService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sweetAlertService: SweetAlertService
  ) {}

  sendReq: boolean = false;
  loginBtnOption = {
    iconName: '',
    btnType: 'submit',
    btnText: 'ورود',
  };

  signupLinkBtnOption = {
    iconName: '',
    btnType: 'button',
    btnText: 'ثبت نام',
  };

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, numberValidator()]),
      password: new FormControl('', [Validators.required, numberValidator()]),
    });
  }

  routeTO(goto: string) {
    this.router.navigate(['/' + goto], {
      relativeTo: this.route,
    });
  }

  login() {
    this.sendReq = true;
    let loginUrl = 'https://localhost:5001/api/account/login';
    console.log(this.loginForm.value);
    this.http
      .post<loginDto>(loginUrl, this.loginForm.value, { withCredentials: true })
      .subscribe({
        next: (res: loginDto) => {
          console.log('login response:', res);
          localStorage.setItem('authUser', JSON.stringify(res));
          // ✅ اینجا می‌تونی res.isJobOwner یا res.agentLinkId رو نگه داری
          // برای مدیریت وضعیت Navbar
          this.navbarServ.isTokenExist.next(true);
        },
        error: (err) => {
          this.sendReq = false;
          console.error(err);

          this.sweetAlertService.floatAlert(
            'نام کاربری یا کلمه عبور اشتباه است',
            'error'
          );
        },
        complete: () => {
          this.sendReq = false;
          this.router.navigate(['/home']);
        },
      });
  }
}

// interface loginDto {
//   token: string;
//   username: string;
//   isJobOwner: string;
// }
// @Component({
//   selector: 'app-login-from',
//   templateUrl: './login-from.component.html',
//   styleUrls: ['./login-from.component.css'],
//   animations: [flipInOut],
//   standalone: true,
//   imports: [
//     FormsModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     NgIf,
//     MatButtonModule,
//     MatIconModule,
//     FontAwesomeModule,
//     ActionBtnAtomComponent,
//   ],
// })
// export class LoginFromComponent implements OnInit {
//   hidden: boolean = true;
//   show = faEye;
//   hide = faEyeSlash;
//   constructor(
//     private navbarServ: NavBarService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private sweetAlertService: SweetAlertService
//   ) {}
//   sendReq: boolean = false;
//   loginBtnOption: {
//     iconName: string;

//     btnType: string;
//     btnText?: string;
//   } = {
//     iconName: '',
//     btnType: 'submit',
//     btnText: 'ورود',
//   };
//   // linkBtnOption_owner: {
//   //   iconName: string;

//   //   btnType: string;
//   //   btnText?: string;
//   // } = {
//   //   iconName: '',
//   //   btnType: 'button',
//   //   btnText: 'ثبت نام مشاغل',
//   // };
//   signupLinkBtnOption: {
//     iconName: string;

//     btnType: string;
//     btnText?: string;
//   } = {
//     iconName: '',
//     btnType: 'button',
//     btnText: 'ثبت نام',
//   };

//   loginForm!: FormGroup;
//   ngOnInit(): void {
//     this.loginForm = new FormGroup({
//       username: new FormControl('', [Validators.required, numberValidator()]),
//       password: new FormControl('', [Validators.required, numberValidator()]),
//     });
//   }
//   // routeTO(goto: string, query: string) {
//   routeTO(goto: string) {
//     this.router.navigate(['/' + goto], {
//       relativeTo: this.route,
//       // queryParams: { signin: query },
//     });
//   }
//   // get passwordErrors() {
//   //   return this.loginForm.get('password')?.errors;
//   // }
//   login() {
//     this.sendReq = true;
//     // console.log(this.loginForm.value);
//     let loginUrl = 'https://localhost:5001/api/account/login';
//     // // return this.http.get<provinceDto[]>(provinceUrl);
//     this.http.post<loginDto>(loginUrl, this.loginForm.value).subscribe({
//       next: (res: loginDto) => {
//         console.log(res);
//         if (res && res.token) {
//           localStorage.setItem('authUser', JSON.stringify(res));
//         }
//       },
//       error: (err) => {
//         this.sendReq = false;
//         console.error(err);
//         // let errorMessage = '';

//         // return new Promise<boolean>(() => {
//         this.sweetAlertService.floatAlert(
//           'نام کاربری یا کلمه عبور اشتباه است',
//           'error'
//         );
//         // });
//       },
//       complete: () => {
//         this.sendReq = false;
//         this.router.navigate(['/home']);
//         this.navbarServ.isTokenExist.next(true);
//       },
//     });
//   }
// }
