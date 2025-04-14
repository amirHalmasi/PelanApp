import { Component, ViewChild } from '@angular/core';
import { fromEvent, map, Subscription } from 'rxjs';
import { HouseAdvetisePageService } from '../../house-page/house-advertise-page.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import * as moment from 'jalali-moment';
import { HouseAdvetiseProfileService } from '../house-advertise-profile.service';
import { NumberSepratorPipe } from '../../house-page/number-seprator.pipe';
import { BedroomSvgComponent } from '../../house-page/bedroom-svg/bedroom-svg.component';
import { ParkingSvgComponent } from '../../house-page/parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from '../../house-page/elevator-svg/elevator-svg.component';
import { CarouselComponent } from '../../carousel/carousel.component';
import { LoadingAtmComponent } from '../../loading-atm/loading-atm.component';
import { NgIf, NgClass, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
type Position = 'start' | 'mid' | 'end';
@Component({
    selector: 'app-house-advertises-profile',
    templateUrl: './house-advertises-profile.component.html',
    styleUrls: ['./house-advertises-profile.component.css'],
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
        BedroomSvgComponent,
        NgSwitch,
        NgSwitchCase,
        NumberSepratorPipe,
    ],
})
export class HouseAdvertisesProfileComponent {
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
  houseAdvSubscribtion!: Subscription;
  showAdvertiseDetails: boolean = false;
  constructor(
    private houseAdvertiseServ: HouseAdvetiseProfileService,
    // private cityModalServ: ModalServiceService,
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
  navigateTo(item: any) {
    console.log(item);
    // this.houseAdvertiseServ.advertiseItem.next(item);
    this.houseAdvertiseServ.advertiseItem = item;
    this.advertiseData.previousRouteURL.next('edit/house');
    this.route.navigate(['/advertise', 'house']);
    // this.showAdvertiseDetails = true;
    // this.houseAdvertiseServ.selectedAdvertiseRow.next(i);
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

    this.getAllAdvertises(this.userData.username);

    this.houseAdvSubscribtion = this.houseAdvertiseServ.houseProfileAdvertises
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
    } else if (deviceWidth >= 768 && deviceWidth < 1200) {
      pairArrayCount = 3;
    } else if (deviceWidth >= 1200) {
      pairArrayCount = 4;
    }
    return pairArrayCount;
  }
  // itemsSlices(itemIndex: number) {
  //   // return this.items.slice(itemIndex, itemIndex + 3);

  //   if (window.innerWidth < 576) {
  //     return this.items.slice(itemIndex, itemIndex + 1);
  //   } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
  //     return this.items.slice(itemIndex, itemIndex + 2);
  //   } else if (window.innerWidth >= 768) {
  //     return this.items.slice(itemIndex, itemIndex + 3);
  //   }
  //   // else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
  //   //   return this.items.slice(itemIndex, itemIndex + 4);
  //   // }
  //   return this.items.slice(itemIndex, itemIndex + 1);
  // }

  getAllAdvertises(user_id: string) {
    this.isLoadingAdvertises = true;
    this.houseAdvertiseServ.getAllAdvertises(user_id).subscribe({
      next: (data) => {
        console.log('advertises request', data);
        this.houseAdvertiseServ.houseProfileAdvertises.next(data);

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
}
