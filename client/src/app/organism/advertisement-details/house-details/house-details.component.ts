import { Component, Input, OnInit } from '@angular/core';
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
export class HouseDetailsComponent implements OnInit {
  advertiseData!: any;
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
