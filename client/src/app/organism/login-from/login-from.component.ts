import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
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
interface loginDto {
  token: string;
  username: string;
  isJobOwner: string;
}
@Component({
  selector: 'app-login-from',
  templateUrl: './login-from.component.html',
  styleUrls: ['./login-from.component.css'],
  animations: [flipInOut],
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
  loginBtnOption: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'ورود',
  };
  // linkBtnOption_owner: {
  //   iconName: string;

  //   btnType: string;
  //   btnText?: string;
  // } = {
  //   iconName: '',
  //   btnType: 'button',
  //   btnText: 'ثبت نام مشاغل',
  // };
  signupLinkBtnOption: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
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
  // routeTO(goto: string, query: string) {
  routeTO(goto: string) {
    this.router.navigate(['/' + goto], {
      relativeTo: this.route,
      // queryParams: { signin: query },
    });
  }
  // get passwordErrors() {
  //   return this.loginForm.get('password')?.errors;
  // }
  login() {
    console.log(this.loginForm.value);
    let loginUrl = 'https://localhost:5001/api/account/login';
    // // return this.http.get<provinceDto[]>(provinceUrl);
    this.http.post<loginDto>(loginUrl, this.loginForm.value).subscribe({
      next: (res: loginDto) => {
        console.log(res);
        if (res && res.token) {
          localStorage.setItem('authUser', JSON.stringify(res));
        }
      },
      error: (err) => {
        console.error(err);
        // let errorMessage = '';

        // return new Promise<boolean>(() => {
        this.sweetAlertService.floatAlert(
          'نام کاربری یا کلمه عبور اشتباه است',
          'error'
        );
        // });
      },
      complete: () => {
        this.router.navigate(['/']);
        this.navbarServ.isTokenExist.next(true);
      },
    });
  }
}
