import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { identityCodeValidator } from '../shared/validators/identityCode.validator';
import { mobileNumberValidator } from '../shared/validators/mobileNumber.validation';
import { SweetAlertService } from '../shared/sweet-alert.service';
import { CanDeactivateType } from '../register/checkout.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  isPasswordHidden: boolean = true;
  isSignIn: boolean = false;
  errorMessage!: { title: string; desc: string };
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sweetAlert: SweetAlertService
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
        next: (data: { username: string; token: string }) => {
          console.log('signIn data', data.token);
          // const token = data.token;

          // // Decode the token payload
          // const decodedToken: any = jwtDecode.jwtDecode(token);

          // console.log('Decoded Token:', decodedToken);

          localStorage.setItem('userData', JSON.stringify(data));
          this.isSignIn = true;
          //add to local storage
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(error.error);
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
      });
  }
  isNumber() {}
  navigateTo(userType: string) {
    this.router.navigate(['../registeruser'], {
      relativeTo: this.route,
      queryParams: { 'user-type': userType },
    });
  }
  canDeactivateFn(): CanDeactivateType {
    if (this.isSignIn) {
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
