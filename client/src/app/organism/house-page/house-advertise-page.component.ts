import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faBed, faCar, faEraser } from '@fortawesome/free-solid-svg-icons';
import { AcordionSlideDown, fadeInOut } from 'src/app/services/animation';
import { HouseAdvetisePageService } from './house-advertise-page.service';
import { fromEvent, map, Subscription } from 'rxjs';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Router } from '@angular/router';
import {
  CdkVirtualScrollViewport,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
} from '@angular/cdk/scrolling';
import * as moment from 'jalali-moment';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { NumberSepratorPipe } from './number-seprator.pipe';
import { ParkingSvgComponent } from './parking-svg/parking-svg.component';
import { BedroomSvgComponent } from './bedroom-svg/bedroom-svg.component';
import { ElevatorSvgComponent } from './elevator-svg/elevator-svg.component';
import { BookmarkSvgComponent } from './bookmark-svg/bookmark-svg.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { LoadingAtmComponent } from '../loading-atm/loading-atm.component';
import {
  NgIf,
  NgFor,
  NgClass,
  NgSwitch,
  NgSwitchCase,
  CommonModule,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { Component } from '@angular/core';
type Position = 'start' | 'mid' | 'end';
@Component({
  selector: 'app-house-advertise-page',
  templateUrl: './house-advertise-page.component.html',
  styleUrls: ['./house-advertise-page.component.css'],
  animations: [fadeInOut, AcordionSlideDown],
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    NgIf,
    LoadingAtmComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NgFor,
    CarouselComponent,
    NgClass,
    // BookmarkSvgComponent,
    ElevatorSvgComponent,
    BedroomSvgComponent,
    ParkingSvgComponent,
    NgSwitch,
    NgSwitchCase,
    NumberSepratorPipe,
  ],
})
export class HouseAdvertisePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  icon = {
    eraser: faEraser,
  };
  selectedType: 'all' | 'sell' | 'rent' = 'all'; // حالت اولیه: نمایش همه آگهی‌ها
  priceFilter = {
    sell: {
      min: undefined as string | undefined,
      max: undefined as string | undefined,
    },
    rent: {
      maxRent: undefined as string | undefined,
      maxDeposit: undefined as string | undefined,
    },
  };
  sortOrder: 'asc' | 'desc' | '' = '';
  dateSortOrder: 'newest' | 'oldest' | '' = 'newest';
  showDateSortDropdown = false;
  showAdvertiseDetails: boolean = false;
  showSortDropdown = false;
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
  showPriceFilter: boolean = false;
  constructor(
    private houseAdvertiseServ: HouseAdvetisePageService,
    private cityModalServ: ModalServiceService,
    // private cdr: ChangeDetectorRef,
    private advertiseData: AdvetiseDataService,
    private router: Router
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
  navigateTo(
    i: any,
    j: any,
    item: {
      advertise: {
        advertiseCode: string;
        advertiseSubmitDate: string;
        advertiseType: string;
        advertiseViews: number;
        advertiserUserId: number;
        branchStatus: string;
        buildingName: string;
        cityId: string;
        depositePrice: string;
        description: string;
        entryType: string;
        flatStatusType: string;
        floor: string;
        hasElevator: string;
        hasParking: string;
        hasWareHouse: string;
        houseEmptyDate: string;
        houseMeter: string;
        houseType: string;
        id: number;
        neighborhood: string;
        orientation: string;
        parkingType: string;
        provinceId: string;
        rentFlatType: string;
        rentPrice: string;
        rooms: string;
        username: string;
        wareHouseMeter: string;
      };
      files: { highQuality: string; lowQuality: string }[];
      todayDate: string;
    }
  ) {
    console.log('advertise item data', item);
    // this.houseAdvertiseServ.advertiseItem.next(item);
    this.houseAdvertiseServ.advertiseItem = item;
    this.advertiseData.previousRouteURL.next('house');
    // this.route.navigate(['/advertiseDetails', i.toString() + j.toString()]);
    this.router.navigate([
      '/advertiseDetails',
      'house' + item.advertise.advertiseType,
      item.advertise.advertiseCode,
    ]);
    this.showAdvertiseDetails = true;
    this.houseAdvertiseServ.selectedAdvertiseRow.next(i);
  }
  ngOnDestroy(): void {
    this.houseAdvSubscribtion.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.items ? console.log(this.items) : console.log('view init');
    // this.houseAdvertiseServ.hasItems.subscribe({
    //   next: (isItems) => {
    //     if (isItems && !this.isLoadingAdvertises) {
    //       this.houseAdvertiseServ.selectedAdvertiseRow.subscribe(
    //         (data: number) => {
    //           setTimeout(() => {
    //             this.viewPort.scrollToIndex(+data, 'auto');
    //           }, 100);
    //         }
    //       );
    //     }
    //   },
    // });
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
      // console.log('new width', this.deviceWidth);
      // console.log('new structure after resize', this.items);
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
      // .pipe(
      //   map((data) => {
      //     this.deviceWidth = window.innerWidth;//added 20/5/404
      //     this.groupIntoChunks(
      //       this.flattenChunks(data),
      //       this.arrayElemrntPairCount(this.deviceWidth)
      //     );
      //   })
      // )
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
    console.log('flaten', chunkedArray);
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
      pairArrayCount = 2;
    } else if (deviceWidth >= 1200) {
      pairArrayCount = 3;
    }
    // return pairArrayCount;
    return pairArrayCount;
  }

  getAllAdvertises(city_id: string) {
    this.isLoadingAdvertises = true;
    this.houseAdvertiseServ
      .getHouseAdvertises(city_id)
      .pipe(
        map((data: any[]) => {
          // افزودن اختلاف زمانی به هر آگهی
          const enrichedData = data.map((advertiseObj) => {
            const advertiseSubmitDate = moment(
              advertiseObj.advertise.advertiseSubmitDate
            );
            const todayDate = moment(advertiseObj.todayDate);

            const diffInDay = todayDate.diff(advertiseSubmitDate, 'days');
            const diffInHour = todayDate.diff(advertiseSubmitDate, 'hours');
            const diffInMonth = todayDate.diff(advertiseSubmitDate, 'months');

            return {
              ...advertiseObj,
              diffInDay,
              diffInHour,
              diffInMonth,
            };
          });

          // مرتب‌سازی بر اساس تاریخ آگهی به صورت نزولی (جدیدترین بالا)
          enrichedData.sort((a, b) => {
            const dateA = moment(a.advertise.advertiseSubmitDate).valueOf();
            const dateB = moment(b.advertise.advertiseSubmitDate).valueOf();
            return dateB - dateA; // جدیدترین در بالا
          });

          return enrichedData;
        })
      )
      .subscribe({
        next: (data) => {
          console.log('advertise my dsate data is:::::::::', data);
          this.houseAdvertiseServ.houseAdvertises.next(data);
        },
        error: (err) => {
          this.isLoadingAdvertises = false;
          console.error('Error fetching advertises', err);
        },
        complete: () => {
          this.isLoadingAdvertises = false;
        },
      });
  }

  icons = { bed: faBed, parking: faCar };
  activeSlideIndex = 0;

  togglePriceDropdown() {
    this.showPriceFilter = !this.showPriceFilter;
  }
  onFilterChange(type: 'sell' | 'rent' | 'all') {
    this.selectedType = type;

    // فقط در صورتی که از sell به حالت دیگه میریم یا بالعکس، فیلتر قیمت رو ریست کن
    if (type !== 'sell') {
      this.priceFilter.sell.min = undefined;
      this.priceFilter.sell.max = undefined;
    }
    if (type !== 'rent') {
      this.priceFilter.rent.maxDeposit = undefined;
      this.priceFilter.rent.maxRent = undefined;
    }

    this.applyFilters();
  }

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  onSortSelect(value: '' | 'asc' | 'desc') {
    this.sortOrder = value;
    this.showSortDropdown = false;
    this.applyFilters();
  }

  applyPriceFilter() {
    this.applyFilters();
  }
  // typeFilter(selectedType:string) {
  //   if (selectedType !== 'all') {
  //     filterd = filterd.filter(
  //       (item) => item.advertise.advertiseType === this.selectedType
  //     );
  //   }
  // }
  applyFilters() {
    const flattened = this.flattenChunks(
      this.houseAdvertiseServ.houseAdvertises.getValue()
    );
    let filterd = flattened;

    // ====== فیلتر نوع آگهی ======
    if (this.selectedType !== 'all') {
      filterd = filterd.filter(
        (item) => item.advertise.advertiseType === this.selectedType
      );
    }

    // ====== فیلتر قیمت فروش ======
    if (this.selectedType === 'sell') {
      const { min, max } = this.priceFilter.sell;
      if (max !== '' || min !== '') {
        filterd = filterd.filter((item) => {
          const price = +item.advertise.price; // به ریال
          const minCheck = min ? price >= +min : true;
          const maxCheck = max ? price <= +max : true;
          return minCheck && maxCheck;
        });
      } else {
        filterd = flattened;
        filterd = filterd.filter(
          (item) => item.advertise.advertiseType === this.selectedType
        );
      }
    }

    // ====== فیلتر قیمت اجاره ======
    if (this.selectedType === 'rent') {
      const { maxRent, maxDeposit } = this.priceFilter.rent;
      if (maxDeposit !== '' || maxDeposit !== '') {
        filterd = filterd.filter((item) => {
          const deposit = +item.advertise.depositPrice;
          const rent = +item.advertise.rentPrice;

          const depositCheck = maxDeposit ? deposit <= +maxDeposit : true;
          const rentCheck = maxRent ? rent <= +maxRent : true;

          // اگر هر دو مقدار وارد شدن → هر دو باید درست باشن
          // اگر یکی وارد شد → همون رو چک کن
          return depositCheck && rentCheck;
        });
      } else {
        filterd = flattened;
        filterd = filterd.filter(
          (item) => item.advertise.advertiseType === this.selectedType
        );
      }
    }

    // ====== مرتب‌سازی قیمت ======
    if (this.sortOrder) {
      filterd = filterd.sort((a, b) => {
        // مرتب‌سازی فروش
        if (
          a.advertise.advertiseType === 'sell' &&
          b.advertise.advertiseType === 'sell'
        ) {
          const aPrice = +a.advertise.price;
          const bPrice = +b.advertise.price;
          return this.sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
        }

        // مرتب‌سازی اجاره
        if (
          a.advertise.advertiseType === 'rent' &&
          b.advertise.advertiseType === 'rent'
        ) {
          const aDeposit = +a.advertise.depositPrice;
          const bDeposit = +b.advertise.depositPrice;

          if (aDeposit !== bDeposit) {
            return this.sortOrder === 'asc'
              ? aDeposit - bDeposit
              : bDeposit - aDeposit;
          } else {
            const aRent = +a.advertise.rentPrice;
            const bRent = +b.advertise.rentPrice;
            return this.sortOrder === 'asc' ? aRent - bRent : bRent - aRent;
          }
        }

        // وقتی همه آگهی‌ها انتخاب شده
        if (this.selectedType === 'all') {
          if (
            a.advertise.advertiseType === 'sell' &&
            b.advertise.advertiseType === 'rent'
          )
            return -1;
          if (
            a.advertise.advertiseType === 'rent' &&
            b.advertise.advertiseType === 'sell'
          )
            return 1;
        }

        return 0;
      });
    }

    // ====== مرتب‌سازی تاریخ وقتی قیمت فعال نیست ======
    if (!this.sortOrder) {
      if (this.dateSortOrder === 'newest') {
        filterd = filterd.sort(
          (a, b) =>
            new Date(b.advertise.advertiseSubmitDate).getTime() -
            new Date(a.advertise.advertiseSubmitDate).getTime()
        );
      } else if (this.dateSortOrder === 'oldest') {
        filterd = filterd.sort(
          (a, b) =>
            new Date(a.advertise.advertiseSubmitDate).getTime() -
            new Date(b.advertise.advertiseSubmitDate).getTime()
        );
      }
    }

    // ====== خروجی نهایی ======
    this.items = this.groupIntoChunks(
      filterd,
      this.arrayElemrntPairCount(this.deviceWidth)
    );
  }

  // مقداردهی به فیلتر فروش
  setSellMinPrice(val: string) {
    this.priceFilter.sell.min = val;
  }

  setSellMaxPrice(val: string) {
    this.priceFilter.sell.max = val;
  }

  // مقداردهی به فیلتر اجاره
  setRentMaxDeposit(val: string) {
    this.priceFilter.rent.maxDeposit = val.toString();
  }

  setRentMaxRent(val: string) {
    this.priceFilter.rent.maxRent = val.toString();
  }
  closePriceDialog() {
    this.showPriceFilter = false;
  }
  closeSortDialog() {
    this.showSortDropdown = false;
  }
  closeDateSortDialog() {
    this.showDateSortDropdown = false;
  }

  toggleDateSortDropdown() {
    this.showDateSortDropdown = !this.showDateSortDropdown;
  }

  onDateSortSelect(value: '' | 'newest' | 'oldest') {
    this.dateSortOrder = value;
    this.sortOrder = '';
    this.showDateSortDropdown = false;
    this.applyFilters();
  }
  sidebarOpen = false;
  accordion = {
    price: false,
    date: false,
  };

  openSidebar() {
    this.sidebarOpen = true;
    if (this.dateSortOrder) {
      this.accordion['date'] = true;
    } else if (this.sortOrder) {
      this.accordion['price'] = true;
    }
  }

  closeSidebar() {
    this.sidebarOpen = false;
    if (this.sortOrder == '') {
      this.accordion['price'] = false;
    } else if (this.dateSortOrder == '') {
      this.accordion['date'] = false;
    }
  }

  toggleAccordion(key: 'price' | 'date') {
    this.accordion[key] = !this.accordion[key];
  }
}
