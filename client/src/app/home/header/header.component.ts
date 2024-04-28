import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProvinceAndCitiesService } from '../province-and-cities-service.service';
import { Province } from 'src/app/shared/province.model';
import { City } from 'src/app/shared/citiy.model';
import { AccountManagerService } from 'src/app/shared/account-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from 'src/app/landing/animation-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentInit, OnChanges {
  headerBrand!: string;

  @Input('brandTitle') brand: string;
  isExpanded = false;
  selectedCity!: City;
  isShowRentAndBuyLinks: boolean = false;
  isLoading: boolean = false;
  isUserLogedIn!: boolean;
  isSpecialUserLogedIn!: boolean;
  constructor(
    private provinceAndCityServ: ProvinceAndCitiesService,
    private accountServ: AccountManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private animationServ: AnimationService
  ) {
    // console.log('hello');
  }
  ngOnChanges(changes: SimpleChanges) {}

  ngAfterContentInit(): void {
    this.provinceAndCityServ.selectedCity.subscribe({
      next: (city: City) => {
        console.log(city);

        this.selectedCity = city;
        this.isShowRentAndBuyLinks = true;
        // this.cdr.detectChanges;
      },
    });
  }

  ngOnInit() {
    this.isUserLogedIn = this.accountServ.checkUserIsLogin();
    this.isSpecialUserLogedIn = this.accountServ.checkSpecialUser();
    this.accountServ.isUserLoggedIn.subscribe((res) => {
      this.isUserLogedIn = res === true ? true : false;
    });

    this.accountServ.isSpecialUserLogedIn.subscribe((res) => {
      console.log('isSpecial user', res);
      this.isSpecialUserLogedIn = res === true ? true : false;
    });

    // this.accountServ.isUserSignIn.subscribe((res: boolean) => {
    //   this.isUserLogedIn = res;
    // });
    this.isLoading = true;
    this.selectedCity = this.provinceAndCityServ.city;
    this.provinceAndCityServ.getProvinces().subscribe({
      next: (response: Province[]) => {
        this.provinceAndCityServ.provinceNames = response;
        // console.log(this.provinceAndCityServ.provinceNames);
      },
      error: (error: any) => console.error(error),
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  @Output() onOpenCityModal = new EventEmitter<boolean>();
  openCities() {
    this.onOpenCityModal.emit(true);
  }
  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }
  signOut() {
    this.accountServ.signOut();
  }
  // navigateTo(path: string) {
  //   this.animationServ.isAnimationCompleted.subscribe({
  //     next: (isAnimationCompleted: boolean) => {
  //       console.log('hellowwwwww', isAnimationCompleted);
  //       if (isAnimationCompleted) {
  //         this.router.navigate([path], { relativeTo: this.activatedRoute });
  //       }

  //       // this.cdr.detectChanges;
  //     },
  //   });
  // }
}
