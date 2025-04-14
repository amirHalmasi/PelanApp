import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, Subscription } from 'rxjs';
import { StoreAdvetisePageService } from './store-advertise-page.service';
import { HttpClient } from '@angular/common/http';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import * as moment from 'jalali-moment';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { NumberSepratorPipe } from '../house-page/number-seprator.pipe';
import { ParkingSvgComponent } from '../house-page/parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from '../house-page/elevator-svg/elevator-svg.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { LoadingAtmComponent } from '../loading-atm/loading-atm.component';
import { NgIf, NgFor, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
type Position = 'start' | 'mid' | 'end';
@Component({
    selector: 'app-advertise-sell-page',
    templateUrl: './store-advertise-page.component.html',
    styleUrls: ['./store-advertise-page.component.css'],
    standalone: true,
    imports: [
        NgIf,
        LoadingAtmComponent,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        NgFor,
        CarouselComponent,
        NgClass,
        ElevatorSvgComponent,
        ParkingSvgComponent,
        NgSwitch,
        NgSwitchCase,
        NumberSepratorPipe,
    ],
})
export class StoreAdvertisePageComponent implements OnInit, OnDestroy {
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
  storeAdvSubscribtion!: Subscription;
  showAdvertiseDetails: boolean = false;
  constructor(
    private http: HttpClient,
    private storeAdvertiseServ: StoreAdvetisePageService,
    private cityModalServ: ModalServiceService,
    // private cdr: ChangeDetectorRef,
    private route: Router,
    private advertiseData: AdvetiseDataService
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
    console.log('item', item);
    // this.houseAdvertiseServ.advertiseItem.next(item);
    this.storeAdvertiseServ.advertiseItem = item;
    this.advertiseData.previousRouteURL.next('store');
    this.route.navigate(['/advertiseDetails', i.toString() + j.toString()]);
    this.showAdvertiseDetails = true;
    this.storeAdvertiseServ.selectedAdvertiseRow.next(i);
  }
  ngOnDestroy(): void {
    this.storeAdvSubscribtion.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.items ? console.log(this.items) : console.log('view init');
    this.storeAdvertiseServ.hasItems.subscribe({
      next: (isItems) => {
        if (isItems && !this.isLoadingAdvertises) {
          this.storeAdvertiseServ.selectedAdvertiseRow.subscribe(
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

    this.storeAdvSubscribtion = this.storeAdvertiseServ.storeAdvertises
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
          console.log('modified', modifiedData);
          console.log('flaten ', this.items);
          this.storeAdvertiseServ.hasItems.next(true);
        },
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
    } else if (deviceWidth >= 768 && deviceWidth < 1200) {
      pairArrayCount = 3;
    } else if (deviceWidth >= 1200) {
      pairArrayCount = 4;
    }
    return pairArrayCount;
  }
  itemsSlices(itemIndex: number) {
    // return this.items.slice(itemIndex, itemIndex + 3);

    if (window.innerWidth < 576) {
      return this.items.slice(itemIndex, itemIndex + 1);
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      return this.items.slice(itemIndex, itemIndex + 2);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      return this.items.slice(itemIndex, itemIndex + 3);
    } else if (window.innerWidth <= 1200) {
      return this.items.slice(itemIndex, itemIndex + 4);
    }
    return this.items.slice(itemIndex, itemIndex + 1);
  }

  getAllAdvertises(city_id: string) {
    this.isLoadingAdvertises = true;
    this.storeAdvertiseServ
      .getStoreAdvertises(city_id)
      .pipe(
        // Calculate the difference in days between todayDate and advertiseSubmitDate
        map((data: any[]) => {
          return data.map((advertiseObj) => {
            const advertiseSubmitDate = moment(
              advertiseObj.commonData.advertiseSubmitDate
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
          this.storeAdvertiseServ.storeAdvertises.next(data);

          // this.items = data;
        },
        error: (err) => {
          this.isLoadingAdvertises = false;
          console.error('Error fetching advertises', err);
        },
        complete: () => {
          this.isLoadingAdvertises = false;
          // this.houseAdvertiseServ.storeAdvertises.complete();
        },
      });
  }

  // icons = { bed: faBed, parking: faCar };
  // activeSlideIndex = 0;
}
/*
export class StoreAdvertisePageComponent implements OnInit, OnDestroy {
  cityData: any = JSON.parse(
    localStorage.getItem('cityData') ||
      '{city_id:0,city_latitude:"0",city_longitude:"0",city_name:"",city_name_en:"",province_id:0}'
  );
  storeAdvSubscribtion!: Subscription;
  items: any;

  constructor(private storeAdvertiseServ: StoreAdvetisePageService) {}

  ngOnInit(): void {
    this.cityData = JSON.parse(
      localStorage.getItem('cityData') ||
        '{city_id:0,city_latitude:"0",city_longitude:"0",city_name:"",city_name_en:"",province_id:0}'
    );
    this.getAllAdvertises(this.cityData.city_id);
    this.storeAdvSubscribtion =
      this.storeAdvertiseServ.storeAdvertises.subscribe({
        next: (data) => {
          this.items = data;
          console.log('this.items house page', this.items);
        },
      });
  }

  getAllAdvertises(city_id: string) {
    this.storeAdvertiseServ.getStoreAdvertises(city_id).subscribe({
      next: (data) => {
        console.log('advertises', data);
        this.storeAdvertiseServ.storeAdvertises.next(data);
        this.items = data;
      },
      error: (err) => {
        console.error('Error fetching advertises', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.storeAdvSubscribtion.unsubscribe();
  }
}
*/
