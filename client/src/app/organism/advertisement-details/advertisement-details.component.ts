import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseAdvetisePageService } from '../house-page/house-advertise-page.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { StoreAdvetisePageService } from '../store-page/store-advertise-page.service';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { NgIf } from '@angular/common';
import { map, Subscription } from 'rxjs';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.css'],
  standalone: true,
  imports: [NgIf, HouseDetailsComponent, StoreDetailsComponent],
})
export class AdvertisementDetailsComponent implements OnInit, OnDestroy {
  advertiseData!: any;
  // previuosUrl!: string;
  isHouse!: boolean;
  isStore!: boolean;
  previousRouteURL$!: Subscription;
  constructor(
    private houseAdvertiseServ: HouseAdvetisePageService,
    private storeAdvertiseServ: StoreAdvetisePageService,
    private advertiseDataServ: AdvetiseDataService,
    private route: ActivatedRoute
  ) {
    const advertiseType = this.route.snapshot.params['advertiseType'];
    const advertiseCode = +this.route.snapshot.params['advertiseCode'];
    console.log('advertiseCode', advertiseCode, 'advertiseType', advertiseType);
    // console.log(
    //   'this.houseAdvertiseServ.advertiseItem',
    //   this.houseAdvertiseServ.advertiseItem
    // );
    // console.log(
    //   'this.houseAdvertiseServ.advertiseItem',
    //   this.storeAdvertiseServ.advertiseItem
    // );

    this.previousRouteURL$ = this.advertiseDataServ.previousRouteURL.subscribe({
      next: (previousUrl_Data) => {
        console.log('previousUrl_Data', previousUrl_Data);

        if (
          previousUrl_Data === 'house' &&
          advertiseCode ==
            +this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode
        ) {
          //
          this.advertiseData = this.houseAdvertiseServ.advertiseItem;
          this.isHouse = true;
          this.isStore = false;
        } else if (
          previousUrl_Data === 'store' &&
          advertiseCode ==
            +this.storeAdvertiseServ.advertiseItem.commonData.advertiseCode
        ) {
          this.advertiseData = this.storeAdvertiseServ.advertiseItem;
          this.isStore = true;
          this.isHouse = false;
        } else {
          if (advertiseType == 'houserent' && advertiseCode) {
            this.houseAdvertiseServ
              .getSpecificHouseAdverise(advertiseCode)
              .pipe(
                // Calculate the difference in days between todayDate and advertiseSubmitDate
                map((data: any[]) => {
                  return data.map((advertiseObj) => {
                    console.log('all advertise s house ct', advertiseObj);
                    const advertiseSubmitDate = moment(
                      advertiseObj.advertise.advertiseSubmitDate
                    );
                    const todayDate = moment(advertiseObj.todayDate);
                    console.log('advertiseSubmitDate', advertiseSubmitDate);
                    console.log('todayDate', todayDate);

                    // Calculate the difference in days
                    const diffInDay = todayDate.diff(
                      advertiseSubmitDate,
                      'days'
                    );
                    const diffInHour = todayDate.diff(
                      advertiseSubmitDate,
                      'hours'
                    );
                    const diffInMonth = todayDate.diff(
                      advertiseSubmitDate,
                      'months'
                    );

                    // Add the difference to the object
                    return {
                      ...advertiseObj,
                      diffInDay,
                      diffInHour,
                      diffInMonth,
                    };
                  });
                })
              )
              .subscribe({
                next: (data) => {
                  [this.advertiseData] = data;
                  [this.houseAdvertiseServ.advertiseItem] = data;
                  console.log(data[0]);
                  this.isStore = false;
                  this.isHouse = true;
                },
              });
          }
        }
        //   // this.previuosUrl = previousUrl_Data;
        // if (previousUrl_Data === 'house') {
        //   this.isHouse = true;
        //   this.isStore = false;
        //   // this.advertiseDataServ.previousRouteURL.next('');
        // } else if (previousUrl_Data === 'store') {
        //   this.isStore = true;
        //   this.isHouse = false;
        //   // this.advertiseDataServ.previousRouteURL.next('');
        // }
      },
    });
  }
  ngOnDestroy(): void {
    this.previousRouteURL$.unsubscribe();
  }
  ngOnInit(): void {
    // this.advertiseData = this.houseAdvertiseServ.advertiseItem;
    ////////////////////////////////////////////////////// //
    // this.activatedroute.data.subscribe((data) => {
    //   console.log('pass data', data);
    // });
    // console.log(
    //   'this.houseAdvertiseServ.advertiseItem',
    //   this.houseAdvertiseServ.advertiseItem
    // );
    // console.log('this.previuosUrl', this.previuosUrl);
    //put data array element index row in the below code:
    // this.houseAdvertiseServ.selectedAdvertiseRow.next(3);
  }
}
