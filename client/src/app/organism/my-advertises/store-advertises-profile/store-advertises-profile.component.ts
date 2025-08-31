import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HouseAdvetiseProfileService } from '../my-advertises-profile.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { fromEvent, map, Subscription } from 'rxjs';
import {
  CdkVirtualScrollViewport,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
} from '@angular/cdk/scrolling';
import { NumberSepratorPipe } from '../../house-page/number-seprator.pipe';
import { ParkingSvgComponent } from '../../house-page/parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from '../../house-page/elevator-svg/elevator-svg.component';
import { CarouselComponent } from '../../carousel/carousel.component';
import { LoadingAtmComponent } from '../../loading-atm/loading-atm.component';
import { NgIf, NgClass, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { NavBarService } from 'src/app/nav-bar/nav-bar.service';
type Position = 'start' | 'mid' | 'end';
@Component({
  selector: 'app-store-advertises-profile',
  templateUrl: './store-advertises-profile.component.html',
  styleUrls: ['./store-advertises-profile.component.css'],
  standalone: true,
  imports: [
    NgIf,
    LoadingAtmComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NgClass,
    NgFor,
    CarouselComponent,
    ElevatorSvgComponent,
    ParkingSvgComponent,
    NgSwitch,
    NgSwitchCase,
    NumberSepratorPipe,
  ],
})
export class StoreAdvertisesProfileComponent implements OnInit {
  items!: any;
  startIndex!: number;
  lastIndex!: number;
  displayAdvertises!: any;
  // selectedIndex!: number;
  private resizeSubscription$!: Subscription;
  deviceWidth = window.innerWidth;
  userData: any = JSON.parse(
    localStorage.getItem('authUser') ||
      '{"username":"","isJobOwner":"","token":"","loginDate":""}'
  );
  isLoadingAdvertises!: boolean;
  storeAdvSubscribtion$!: Subscription;
  showAdvertiseDetails: boolean = false;
  constructor(
    private houseAdvertiseServ: HouseAdvetiseProfileService,
    private navbarServ: NavBarService,
    // private cityModalServ: ModalServiceService,
    // private cdr: ChangeDetectorRef,
    private advertiseData: AdvetiseDataService,
    private route: Router
  ) {}
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
  private transformItemValue(item: any): any {
    let transformedValue = {
      ...item,
      advertise: {
        ...item.commonData,
        ...item?.rentData,
        ...item?.sellData,
      },
    };
    delete transformedValue.commonData;
    delete transformedValue.rentData;
    delete transformedValue.sellData;

    return transformedValue;
  }
  navigateTo(item: any) {
    // console.log(item);
    // this.houseAdvertiseServ.advertiseItem.next(item);
    console.log(this.transformItemValue(item));
    this.houseAdvertiseServ.advertiseItem = this.transformItemValue(item);
    this.advertiseData.previousRouteURL.next('edit/store');
    this.route.navigate(['/advertise', 'store']);
    // this.showAdvertiseDetails = true;
    // this.houseAdvertiseServ.selectedAdvertiseRow.next(i);
  }
  ngOnDestroy(): void {
    this.storeAdvSubscribtion$.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.resizeSubscription$ = fromEvent(window, 'resize').subscribe(() => {
      this.deviceWidth = window.innerWidth;
      this.items = this.groupIntoChunks(
        this.flattenChunks(this.items),
        this.arrayElemrntPairCount(this.deviceWidth)
      );
      // console.log('new width', this.deviceWidth);
      console.log('new structure after resize', this.items);
      // this.cdr.detectChanges();
    });
    this.getAllAdvertises(this.userData.username);
    this.storeAdvSubscribtion$ = this.houseAdvertiseServ.storeProfileAdvertises
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
          // console.log('flaten ', this.items);
          this.houseAdvertiseServ.hasItems.next(true);
        },
      });
  }
  getAllAdvertises(user_id: string) {
    this.isLoadingAdvertises = true;
    this.houseAdvertiseServ.getStoreAdvertises(user_id).subscribe({
      next: (data) => {
        console.log(
          ':::::::::::::::::::::  store advertises request   ::::::::::::::::::',
          data
        );
        this.houseAdvertiseServ.storeProfileAdvertises.next(data);
      },
      error: (err) => {
        this.isLoadingAdvertises = false;
        console.log('error', err);
        if (err.status === 401) {
          localStorage.removeItem('authUser');
          this.navbarServ.isTokenExist.next(false);
          // هدایت به صفحه لاگین
          this.route.navigate(['/login']);
        }
      },
      complete: () => {
        this.isLoadingAdvertises = false;
        // this.houseAdvertiseServ.houseAdvertises.complete();
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
    } else if (deviceWidth >= 768 && deviceWidth < 992) {
      pairArrayCount = 3;
    } else if (deviceWidth >= 992 && deviceWidth < 1400) {
      pairArrayCount = 4;
    } else if (deviceWidth >= 1400) {
      pairArrayCount = 6;
    }
    return pairArrayCount;
  }
}
