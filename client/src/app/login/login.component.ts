import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { identityCodeValidator } from '../shared/validators/identityCode.validator';
import { mobileNumberValidator } from '../shared/validators/mobileNumber.validation';
import { SweetAlertService } from '../shared/sweet-alert.service';
import { CanDeactivateType } from '../shared/checkout.guard';
import { AccountManagerService } from '../shared/account-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  isPasswordHidden: boolean = true;
  isSignIn: boolean = false;
  isGoingToSignupPage: boolean = false;
  errorMessage!: { title: string; desc: string };
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private accountManagerServ: AccountManagerService
  ) {}
  ngOnInit(): void {
    this.signInForm = this.formCreater();
  }
  private formCreater() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        identityCodeValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        // mobileNumberValidator(),
      ]),
    });
  }
  onSubmit() {
    // console.log(this.signInForm.value);
    let formData = this.signInForm.value;
    // console.log(this.signInForm.get('username'));
    this.http
      .post('https://localhost:5001/api/account/login', formData)
      .subscribe({
        next: (data: {
          username: string;
          token: string;
          expire: any;
          usertype: string;
        }) => {
          // console.log('signIn data', data);
          // localStorage.clear();
          localStorage.removeItem('userData');
          localStorage.setItem('userData', JSON.stringify(data));

          ////////////////////////////////////////////////////////////////////////////
          // const storedUserData = JSON.parse(localStorage.getItem('userData'));   //
          // const expireDate = new Date(storedUserData.expires);                   //
          // const formattedExpireDate = expireDate.toLocaleDateString('en-CA', {   //
          //   year: 'numeric',                                                     //
          //   month: '2-digit',                                                    //
          //   day: '2-digit',                                                      //
          // });                                                                    //
          // console.log('formated Date', formattedExpireDate);                     //
          ////////////////////////////////////////////////////////////////////////////
        },
        error: (error) => {
          // console.log(error.error);
          switch (String(error.error).toLowerCase()) {
            case 'invalid password.':
            case 'invalid username.':
              this.errorMessage = {
                title: 'نام کاربری یا کلمه عبور',
                desc: ' نام کاربری یا کدملی یکیش یا هردوش اشتباهه',
              };
              this.showAlert(this.errorMessage);
              break;

            default:
              this.errorMessage = {
                title: 'خطا',
                desc: ' نمیدونم چی شده!',
              };
              this.showAlert(this.errorMessage);
              break;
          }
        },
        complete: () => {
          this.accountManagerServ.isUserLoggedIn.emit(true);
          this.isSignIn = true;
          JSON.parse(localStorage.getItem('userData')).usertype === 'special'
            ? this.accountManagerServ.isSpecialUserLogedIn.emit(true)
            : this.accountManagerServ.isSpecialUserLogedIn.emit(false);
          this.router.navigate(['/'], { relativeTo: this.route });
        },
      });
  }
  isNumber() {}
  navigateTo(userType: string) {
    this.isGoingToSignupPage = true;
    this.router.navigate(['../registeruser'], {
      relativeTo: this.route,
      queryParams: { 'user-type': userType },
    });
  }
  canDeactivateFn(): CanDeactivateType {
    console.log('url is', this.route.url);
    if (this.isSignIn || this.isGoingToSignupPage) {
      return true;
    }

    if (!this.isSignIn) {
      return new Promise<boolean>((resolve) => {
        this.sweetAlert
          .confirm(
            'مطمئنی بدون وارد شدن میخوای بری؟',
            'خروج بدون ورود',
            'question',
            'custome-font'
          )
          .then((result) => {
            resolve(result.isConfirmed); // Resolve with the user's choice
          })
          .catch(() => {
            resolve(false); // In case of an error, consider it as not confirmed
          });
      });
    } else {
      return true;
    }
  }
  showAlert(errorMessage: { title: string; desc: string }) {
    return new Promise<boolean>((resolve) => {
      this.sweetAlert
        .alert(errorMessage.title, errorMessage.desc, 'warning')
        .then((result) => {
          resolve(result.isConfirmed); // Resolve with the user's choice
        });
    });
  }
}
