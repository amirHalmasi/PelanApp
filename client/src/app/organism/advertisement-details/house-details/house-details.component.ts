import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetisePageService } from '../../house-page/house-advertise-page.service';
import { Router } from '@angular/router';
import { NumberSepratorPipe } from '../../house-page/number-seprator.pipe';
import { CarouselComponent } from '../../carousel/carousel.component';
import { NgIf, NgSwitch, NgSwitchCase, NgClass } from '@angular/common';
import { ThereisOrNotComponent } from '../../house-page/thereis-or-not/thereis-or-not.component';
import { DetailsComponent } from './details/details.component';
import { ConditionalContainerComponent } from './conditional-container/conditional-container.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['../advertisement-details.component.css'],
  standalone: true,
  imports: [
    ThereisOrNotComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    CarouselComponent,
    NumberSepratorPipe,
    DetailsComponent,
    ConditionalContainerComponent,
  ],
})
export class HouseDetailsComponent implements OnInit, OnDestroy {
  advertiseData!: any;
  private resizeListener!: () => void;
  // currentUserData: any = JSON.parse(
  //   localStorage.getItem('authUser') ||
  //     '{isJobOwner:"",token:"",userId:0,username:""}'
  // );
  constructor(
    private route: Router,
    private houseAdvertiseServ: HouseAdvetisePageService // private advertiseDataServ: AdvetiseDataService
  ) {}
  ngOnInit(): void {
    this.advertiseData = this.houseAdvertiseServ.advertiseItem;
  }
  ngAfterViewInit(): void {
    // ست کردن vh واقعی بعد از رندر اولیه
    this.setRealVh();

    // لیسنر تغییر سایز و زوم
    this.resizeListener = this.setRealVh.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }
  ngOnDestroy(): void {
    // پاک کردن لیسنر تا حافظه لیک نشه
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private setRealVh() {
    // Fix for vh issue: محاسبه ارتفاع واقعی viewport و ست کردن در CSS Variable (--vh)
    // برای اینکه محتوا پشت تسک‌بار یا نوار مرورگر قایم نشه (به‌جای 100vh)
    const vh = window.innerHeight * 0.01;
    console.log('vh', vh);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  navigateTo() {
    // if (
    //   this.advertiseData.advertise.advertiserUserId !==
    //   this.currentUserData.userId
    // ) {
    this.route.navigate(['/chat']);
    // }
  }
  get possibleValueMeter() {
    return {
      [this.advertiseData?.advertise.houseMeter.toString()]:
        this.advertiseData?.advertise.houseMeter + ' متر',
    };
  }
  get possibleValueRooms() {
    return {
      [this.advertiseData?.advertise.rooms.toString()]:
        this.advertiseData?.advertise.rooms,
    };
  }
  get possibleValueFlat() {
    return {
      [this.advertiseData?.advertise.floor.toString()]:
        this.advertiseData?.advertise.floor,
    };
  }
}
