import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faBed, faCar } from '@fortawesome/free-solid-svg-icons';
import { fadeInOut } from 'src/app/services/animation';
import { HouseAdvetisePageService } from './house-advertise-page.service';
import { fromEvent, map, Subscription } from 'rxjs';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'jalali-moment';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
// import { Component } from '@angular/core';
type Position = 'start' | 'mid' | 'end';
@Component({
  selector: 'app-house-advertise-page',
  templateUrl: './house-advertise-page.component.html',
  styleUrls: ['./house-advertise-page.component.css'],
  animations: [fadeInOut],
})
export class HouseAdvertisePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  items!: any;
  startIndex!: number;
  lastIndex!: number;
  displayAdvertises!: any;
  // selectedIndex!: number;
  private resizeSubscription$!: Subscription;
  deviceWidth = window.innerWidth;
  cityData: any = JSON.parse(
    localStorage.getItem('cityData') ||
      '{city_id:0,city_latitude:"0",city_longitude:"0",city_name:"",city_name_en:"",province_id:0}'
  );
  isLoadingAdvertises!: boolean;
  houseAdvSubscribtion!: Subscription;
  showAdvertiseDetails: boolean = false;
  constructor(
    private houseAdvertiseServ: HouseAdvetisePageService,
    private cityModalServ: ModalServiceService,
    // private cdr: ChangeDetectorRef,
    private advertiseData: AdvetiseDataService,
    private route: Router
  ) {
    // console.log('this.deviceWidth', this.deviceWidth);
  }
  advertiseSubmitDate!: Date;
  todayDate!: Date;

  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
  scroll(position: Position) {
    let scrollIndex: number;
    switch (position) {
      case 'start':
        scrollIndex = 0;
        break;
      case 'mid':
        scrollIndex = this.items.length / 2;
        break;
      case 'end':
        scrollIndex = this.items.length;
        break;
    }
    this.viewPort.scrollToIndex(scrollIndex, 'smooth');
  }
  navigateTo(i: any, j: any, item: any) {
    console.log(item);
    // this.houseAdvertiseServ.advertiseItem.next(item);
    this.houseAdvertiseServ.advertiseItem = item;
    this.advertiseData.previousRouteURL.next('house');
    this.route.navigate(['/advertiseDetails', i.toString() + j.toString()]);
    this.showAdvertiseDetails = true;
    this.houseAdvertiseServ.selectedAdvertiseRow.next(i);
  }
  ngOnDestroy(): void {
    this.houseAdvSubscribtion.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.items ? console.log(this.items) : console.log('view init');
    this.houseAdvertiseServ.hasItems.subscribe({
      next: (isItems) => {
        if (isItems && !this.isLoadingAdvertises) {
          this.houseAdvertiseServ.selectedAdvertiseRow.subscribe(
            (data: number) => {
              setTimeout(() => {
                this.viewPort.scrollToIndex(+data, 'auto');
              }, 100);
            }
          );
        }
      },
    });
  }
  ngOnInit(): void {
    // this.ViewportWidth();
    this.cityModalServ.selectedCity.subscribe({
      next: (cityData) => {
        this.cityData = cityData;
      },
    });

    this.resizeSubscription$ = fromEvent(window, 'resize').subscribe(() => {
      this.deviceWidth = window.innerWidth;
      this.items = this.groupIntoChunks(
        this.flattenChunks(this.items),
        this.arrayElemrntPairCount(this.deviceWidth)
      );
      console.log('new width', this.deviceWidth);
      console.log('new structure after resize', this.items);
      // this.cdr.detectChanges();
    });

    this.getAllAdvertises(this.cityData.city_id);

    this.houseAdvSubscribtion = this.houseAdvertiseServ.houseAdvertises
      .pipe(
        map((data) =>
          this.groupIntoChunks(
            this.flattenChunks(data),
            this.arrayElemrntPairCount(this.deviceWidth)
          )
        )
      )
      .subscribe({
        next: (modifiedData) => {
          this.items = modifiedData;
          console.log('flaten ', this.items);
          this.houseAdvertiseServ.hasItems.next(true);
          // console.log('Items length:', this.items.length);
          // console.log('First item:', this.items[0]);
        },
        // complete: () => {
        //   console.log('complete', this.items);
        //   console.log('Items loaded successfully');
        //   // setTimeout(() => {
        //   console.log('Timeout triggered');

        //   // }, 100);
        // },
      });
  }

  private groupIntoChunks(data: any[], groupSize: number): any[][] {
    const chunkedArray: any[][] = [];
    for (let i = 0; i < data.length; i += groupSize) {
      chunkedArray.push(data.slice(i, i + groupSize));
    }
    return chunkedArray;
  }
  private flattenChunks(chunkedArray: any[][]): any[] {
    return chunkedArray.reduce((acc, val) => acc.concat(val), []);
  }
  arrayElemrntPairCount(deviceWidth: number) {
    let pairArrayCount = 1;
    // console.log('Viewport width:', window.innerWidth);
    if (deviceWidth < 576) {
      pairArrayCount = 1;
    } else if (deviceWidth >= 576 && deviceWidth < 768) {
      pairArrayCount = 2;
    } else if (deviceWidth >= 768) {
      pairArrayCount = 3;
    }
    //  else if (deviceWidth >= 1200) {
    //   pairArrayCount = 6;
    // }
    return pairArrayCount;
  }
  itemsSlices(itemIndex: number) {
    // return this.items.slice(itemIndex, itemIndex + 3);

    if (window.innerWidth < 576) {
      return this.items.slice(itemIndex, itemIndex + 1);
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      return this.items.slice(itemIndex, itemIndex + 2);
    } else if (window.innerWidth >= 768) {
      return this.items.slice(itemIndex, itemIndex + 3);
    }
    // else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
    //   return this.items.slice(itemIndex, itemIndex + 4);
    // }
    return this.items.slice(itemIndex, itemIndex + 1);
  }

  getAllAdvertises(city_id: string) {
    this.isLoadingAdvertises = true;
    this.houseAdvertiseServ
      .getHouseAdvertises(city_id)
      .pipe(
        // Calculate the difference in days between todayDate and advertiseSubmitDate
        map((data: any[]) => {
          return data.map((advertiseObj) => {
            console.log('all advertise s house ct', advertiseObj);
            const advertiseSubmitDate = moment(
              advertiseObj.advertise.advertiseSubmitDate
            );
            const todayDate = moment(advertiseObj.todayDate);

            // Calculate the difference in days
            const diffInDay = todayDate.diff(advertiseSubmitDate, 'days');
            const diffInHour = todayDate.diff(advertiseSubmitDate, 'hours');
            const diffInMonth = todayDate.diff(advertiseSubmitDate, 'months');

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
          console.log('advertises request', data);
          this.houseAdvertiseServ.houseAdvertises.next(data);

          // this.items = data;
        },
        error: (err) => {
          this.isLoadingAdvertises = false;
          console.error('Error fetching advertises', err);
        },
        complete: () => {
          this.isLoadingAdvertises = false;
          // this.houseAdvertiseServ.houseAdvertises.complete();
        },
      });
  }

  icons = { bed: faBed, parking: faCar };
  activeSlideIndex = 0;
}
