import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseAdvetisePageService } from '../house-page/house-advertise-page.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { StoreAdvetisePageService } from '../store-page/store-advertise-page.service';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-advertisement-details',
    templateUrl: './advertisement-details.component.html',
    styleUrls: ['./advertisement-details.component.css'],
    standalone: true,
    imports: [
        NgIf,
        HouseDetailsComponent,
        StoreDetailsComponent,
    ],
})
export class AdvertisementDetailsComponent implements OnInit {
  advertiseData!: any;
  // previuosUrl!: string;
  isHouse!: boolean;
  isStore!: boolean;
  constructor(
    private houseAdvertiseServ: HouseAdvetisePageService,
    private storeAdvertiseServ: StoreAdvetisePageService,
    private advertiseDataServ: AdvetiseDataService
  ) {
    this.advertiseDataServ.previousRouteURL.subscribe({
      next: (previousUrl_Data) => {
        console.log('previousUrl_Data', previousUrl_Data);
        // this.previuosUrl = previousUrl_Data;
        if (previousUrl_Data === 'house') {
          this.isHouse = true;
          this.isStore = false;
          // this.advertiseDataServ.previousRouteURL.next('');
        } else if (previousUrl_Data === 'store') {
          this.isStore = true;
          this.isHouse = false;
          // this.advertiseDataServ.previousRouteURL.next('');
        }
      },
    });
  }
  ngOnInit(): void {
    // this.activatedroute.data.subscribe((data) => {
    //   console.log('pass data', data);
    // });

    // console.log(
    //   'this.houseAdvertiseServ.advertiseItem',
    //   this.houseAdvertiseServ.advertiseItem
    // );
    // console.log('this.previuosUrl', this.previuosUrl);
    this.advertiseData = this.houseAdvertiseServ.advertiseItem;
    //put data array element index row in the below code:
    // this.houseAdvertiseServ.selectedAdvertiseRow.next(3);
  }
}
