// import { HttpClient } from '@angular/common/http';
// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Component,
//   OnDestroy,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { faBed, faCar } from '@fortawesome/free-solid-svg-icons';
// import { fadeInOut } from 'src/app/services/animation';
// import { HouseAdvetisePageService } from './house-advertise-page.service';
// import { fromEvent, map, Subscription } from 'rxjs';
// import { ModalServiceService } from 'src/app/services/modal-service.service';
// import { Router } from '@angular/router';
// import {
//   CdkVirtualScrollViewport,
//   CdkFixedSizeVirtualScroll,
//   CdkVirtualForOf,
// } from '@angular/cdk/scrolling';
// import * as moment from 'jalali-moment';
// import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
// import { NumberSepratorPipe } from './number-seprator.pipe';
// import { ParkingSvgComponent } from './parking-svg/parking-svg.component';
// import { BedroomSvgComponent } from './bedroom-svg/bedroom-svg.component';
// import { ElevatorSvgComponent } from './elevator-svg/elevator-svg.component';
// import { BookmarkSvgComponent } from './bookmark-svg/bookmark-svg.component';
// import { CarouselComponent } from '../carousel/carousel.component';
// import { LoadingAtmComponent } from '../loading-atm/loading-atm.component';
// import {
//   NgIf,
//   NgFor,
//   NgClass,
//   NgSwitch,
//   NgSwitchCase,
//   CommonModule,
// } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// // import { Component } from '@angular/core';
// type Position = 'start' | 'mid' | 'end';
// @Component({
//   selector: 'app-house-advertise-page',
//   templateUrl: './house-advertise-page.component.html',
//   styleUrls: ['./house-advertise-page.component.css'],
//   animations: [fadeInOut],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     NgIf,
//     LoadingAtmComponent,
//     CdkVirtualScrollViewport,
//     CdkFixedSizeVirtualScroll,
//     CdkVirtualForOf,
//     NgFor,
//     CarouselComponent,
//     NgClass,
//     BookmarkSvgComponent,
//     ElevatorSvgComponent,
//     BedroomSvgComponent,
//     ParkingSvgComponent,
//     NgSwitch,
//     NgSwitchCase,
//     NumberSepratorPipe,
//   ],
// })
// export class HouseAdvertisePageComponent
//   implements OnInit, OnDestroy, AfterViewInit
// {
//   selectedType: 'all' | 'sell' | 'rent' = 'all'; // حالت اولیه: نمایش همه آگهی‌ها
//   priceFilter = {
//     sell: {
//       min: undefined as number | undefined,
//       max: undefined as number | undefined,
//     },
//     rent: {
//       maxRent: undefined as number | undefined,
//       maxDeposit: undefined as number | undefined,
//     },
//   };
//   sortOrder: 'asc' | 'desc' | '' = '';
//   dateSortOrder: '' | 'newest' | 'oldest' = '';
//   showDateSortDropdown = false;
//   showAdvertiseDetails: boolean = false;
//   showSortDropdown = false;
//   items!: any;
//   startIndex!: number;
//   lastIndex!: number;
//   displayAdvertises!: any;
//   // selectedIndex!: number;
//   private resizeSubscription$!: Subscription;
//   deviceWidth = window.innerWidth;
//   cityData: any = JSON.parse(
//     localStorage.getItem('cityData') ||
//       '{city_id:0,city_latitude:"0",city_longitude:"0",city_name:"",city_name_en:"",province_id:0}'
//   );
//   isLoadingAdvertises!: boolean;
//   houseAdvSubscribtion!: Subscription;
//   showPriceFilter: boolean = false;
//   constructor(
//     private houseAdvertiseServ: HouseAdvetisePageService,
//     private cityModalServ: ModalServiceService,
//     // private cdr: ChangeDetectorRef,
//     private advertiseData: AdvetiseDataService,
//     private router: Router
//   ) {
//     // console.log('this.deviceWidth', this.deviceWidth);
//   }
//   advertiseSubmitDate!: Date;
//   todayDate!: Date;

//   @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
//   scroll(position: Position) {
//     let scrollIndex: number;
//     switch (position) {
//       case 'start':
//         scrollIndex = 0;
//         break;
//       case 'mid':
//         scrollIndex = this.items.length / 2;
//         break;
//       case 'end':
//         scrollIndex = this.items.length;
//         break;
//     }
//     this.viewPort.scrollToIndex(scrollIndex, 'smooth');
//   }
//   navigateTo(
//     i: any,
//     j: any,
//     item: {
//       advertise: {
//         advertiseCode: string;
//         advertiseSubmitDate: string;
//         advertiseType: string;
//         advertiseViews: number;
//         advertiserUserId: number;
//         branchStatus: string;
//         buildingName: string;
//         cityId: string;
//         depositePrice: string;
//         description: string;
//         entryType: string;
//         flatStatusType: string;
//         floor: string;
//         hasElevator: string;
//         hasParking: string;
//         hasWareHouse: string;
//         houseEmptyDate: string;
//         houseMeter: string;
//         houseType: string;
//         id: number;
//         neighborhood: string;
//         orientation: string;
//         parkingType: string;
//         provinceId: string;
//         rentFlatType: string;
//         rentPrice: string;
//         rooms: string;
//         username: string;
//         wareHouseMeter: string;
//       };
//       files: { highQuality: string; lowQuality: string }[];
//       todayDate: string;
//     }
//   ) {
//     console.log('advertise item data', item);
//     // this.houseAdvertiseServ.advertiseItem.next(item);
//     this.houseAdvertiseServ.advertiseItem = item;
//     this.advertiseData.previousRouteURL.next('house');
//     // this.route.navigate(['/advertiseDetails', i.toString() + j.toString()]);
//     this.router.navigate([
//       '/advertiseDetails',
//       'house' + item.advertise.advertiseType,
//       item.advertise.advertiseCode,
//     ]);
//     this.showAdvertiseDetails = true;
//     this.houseAdvertiseServ.selectedAdvertiseRow.next(i);
//   }
//   ngOnDestroy(): void {
//     this.houseAdvSubscribtion.unsubscribe();
//     this.resizeSubscription$.unsubscribe();
//   }
//   ngAfterViewInit(): void {
//     this.items ? console.log(this.items) : console.log('view init');
//     this.houseAdvertiseServ.hasItems.subscribe({
//       next: (isItems) => {
//         if (isItems && !this.isLoadingAdvertises) {
//           this.houseAdvertiseServ.selectedAdvertiseRow.subscribe(
//             (data: number) => {
//               setTimeout(() => {
//                 this.viewPort.scrollToIndex(+data, 'auto');
//               }, 100);
//             }
//           );
//         }
//       },
//     });
//   }
//   ngOnInit(): void {
//     // this.ViewportWidth();
//     this.cityModalServ.selectedCity.subscribe({
//       next: (cityData) => {
//         this.cityData = cityData;
//       },
//     });

//     this.resizeSubscription$ = fromEvent(window, 'resize').subscribe(() => {
//       this.deviceWidth = window.innerWidth;
//       this.items = this.groupIntoChunks(
//         this.flattenChunks(this.items),
//         this.arrayElemrntPairCount(this.deviceWidth)
//       );
//       console.log('new width', this.deviceWidth);
//       console.log('new structure after resize', this.items);
//       // this.cdr.detectChanges();
//     });

//     this.getAllAdvertises(this.cityData.city_id);

//     this.houseAdvSubscribtion = this.houseAdvertiseServ.houseAdvertises
//       .pipe(
//         map((data) =>
//           this.groupIntoChunks(
//             this.flattenChunks(data),
//             this.arrayElemrntPairCount(this.deviceWidth)
//           )
//         )
//       )
//       .subscribe({
//         next: (modifiedData) => {
//           this.items = modifiedData;
//           console.log('flaten ', this.items);
//           this.houseAdvertiseServ.hasItems.next(true);
//           // console.log('Items length:', this.items.length);
//           // console.log('First item:', this.items[0]);
//         },
//         // complete: () => {
//         //   console.log('complete', this.items);
//         //   console.log('Items loaded successfully');
//         //   // setTimeout(() => {
//         //   console.log('Timeout triggered');

//         //   // }, 100);
//         // },
//       });
//   }

//   private groupIntoChunks(data: any[], groupSize: number): any[][] {
//     const chunkedArray: any[][] = [];
//     for (let i = 0; i < data.length; i += groupSize) {
//       chunkedArray.push(data.slice(i, i + groupSize));
//     }
//     return chunkedArray;
//   }
//   private flattenChunks(chunkedArray: any[][]): any[] {
//     console.log('flaten', chunkedArray);
//     return chunkedArray.reduce((acc, val) => acc.concat(val), []);
//   }
//   arrayElemrntPairCount(deviceWidth: number) {
//     let pairArrayCount = 1;
//     // console.log('Viewport width:', window.innerWidth);
//     if (deviceWidth < 576) {
//       pairArrayCount = 1;
//     } else if (deviceWidth >= 576 && deviceWidth < 768) {
//       pairArrayCount = 2;
//     } else if (deviceWidth >= 768 && deviceWidth < 1200) {
//       pairArrayCount = 2;
//     } else if (deviceWidth >= 1200) {
//       pairArrayCount = 3;
//     }
//     // return pairArrayCount;
//     return pairArrayCount;
//   }

//   getAllAdvertises(city_id: string) {
//     this.isLoadingAdvertises = true;
//     this.houseAdvertiseServ
//       .getHouseAdvertises(city_id)
//       .pipe(
//         map((data: any[]) => {
//           // افزودن اختلاف زمانی به هر آگهی
//           const enrichedData = data.map((advertiseObj) => {
//             const advertiseSubmitDate = moment(
//               advertiseObj.advertise.advertiseSubmitDate
//             );
//             const todayDate = moment(advertiseObj.todayDate);

//             const diffInDay = todayDate.diff(advertiseSubmitDate, 'days');
//             const diffInHour = todayDate.diff(advertiseSubmitDate, 'hours');
//             const diffInMonth = todayDate.diff(advertiseSubmitDate, 'months');

//             return {
//               ...advertiseObj,
//               diffInDay,
//               diffInHour,
//               diffInMonth,
//             };
//           });

//           // مرتب‌سازی بر اساس تاریخ آگهی به صورت نزولی (جدیدترین بالا)
//           enrichedData.sort((a, b) => {
//             const dateA = moment(a.advertise.advertiseSubmitDate).valueOf();
//             const dateB = moment(b.advertise.advertiseSubmitDate).valueOf();
//             return dateB - dateA; // جدیدترین در بالا
//           });

//           return enrichedData;
//         })
//       )
//       .subscribe({
//         next: (data) => {
//           this.houseAdvertiseServ.houseAdvertises.next(data);
//         },
//         error: (err) => {
//           this.isLoadingAdvertises = false;
//           console.error('Error fetching advertises', err);
//         },
//         complete: () => {
//           this.isLoadingAdvertises = false;
//         },
//       });
//   }

//   icons = { bed: faBed, parking: faCar };
//   activeSlideIndex = 0;

//   togglePriceDropdown() {
//     this.showPriceFilter = !this.showPriceFilter;
//   }
//   onFilterChange(type: 'sell' | 'rent' | 'all') {
//     this.selectedType = type;

//     // فقط در صورتی که از sell به حالت دیگه میریم یا بالعکس، فیلتر قیمت رو ریست کن
//     if (type !== 'sell') {
//       this.priceFilter.sell.min = undefined;
//       this.priceFilter.sell.max = undefined;
//     }
//     if (type !== 'rent') {
//       this.priceFilter.rent.maxDeposit = undefined;
//       this.priceFilter.rent.maxRent = undefined;
//     }

//     this.applyFilters();
//   }

//   toggleSortDropdown() {
//     this.showSortDropdown = !this.showSortDropdown;
//   }

//   onSortSelect(value: '' | 'asc' | 'desc') {
//     this.sortOrder = value;
//     this.showSortDropdown = false;
//     this.applyFilters();
//   }

//   applyPriceFilter() {
//     this.applyFilters();
//   }

//   applyFilters() {
//     let flattened = this.flattenChunks(
//       this.houseAdvertiseServ.houseAdvertises.getValue()
//     );

//     if (this.selectedType !== 'all') {
//       flattened = flattened.filter(
//         (item) => item.advertise.advertiseType === this.selectedType
//       );
//     }

//     // فیلتر قیمت برای فروش
//     if (this.selectedType === 'sell') {
//       const { min, max } = this.priceFilter.sell;
//       //
//       flattened = flattened.filter((item) => {
//         const price = +item.advertise.price;
//         // +item.advertise.price مبلغی که در اینجا هست به ریاله پس :
//         //  min*10 و min*10 تا به مبلغ فیلتر ریالی بشه
//         return (!min || price >= min * 10) && (!max || price <= max * 10);
//       });
//     }

//     // فیلتر اجاره
//     if (this.selectedType === 'rent') {
//       const { maxRent, maxDeposit } = this.priceFilter.rent;
//       flattened = flattened.filter((item) => {
//         const deposit = +item.advertise.depositPrice;
//         const rent = +item.advertise.rentPrice;
//         return (
//           (!maxDeposit || deposit <= maxDeposit * 10) &&
//           (!maxRent || rent <= maxRent * 10)
//         );
//       });
//     }

//     // مرتب‌سازی
//     if (this.sortOrder === 'asc' || this.sortOrder === 'desc') {
//       flattened.sort((a, b) => {
//         const aPrice =
//           a.advertise.advertiseType === 'sell'
//             ? +a.advertise.price
//             : +a.advertise.depositPrice;
//         const bPrice =
//           b.advertise.advertiseType === 'sell'
//             ? +b.advertise.price
//             : +b.advertise.depositPrice;

//         return this.sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
//       });
//     }

//     // ✅ مرتب‌سازی بر اساس تاریخ آگهی
//     if (this.dateSortOrder === 'newest') {
//       flattened.sort(
//         (a, b) =>
//           new Date(b.advertise.createdAt).getTime() -
//           new Date(a.advertise.createdAt).getTime()
//       );
//     } else if (this.dateSortOrder === 'oldest') {
//       flattened.sort(
//         (a, b) =>
//           new Date(a.advertise.createdAt).getTime() -
//           new Date(b.advertise.createdAt).getTime()
//       );
//     }

//     // دسته‌بندی نهایی
//     this.items = this.groupIntoChunks(
//       flattened,
//       this.arrayElemrntPairCount(this.deviceWidth)
//     );
//   }
//   // مقداردهی به فیلتر فروش
//   setSellMinPrice(val: number) {
//     this.priceFilter.sell.min = val;
//   }

//   setSellMaxPrice(val: number) {
//     this.priceFilter.sell.max = val;
//   }

//   // مقداردهی به فیلتر اجاره
//   setRentMaxDeposit(val: number) {
//     this.priceFilter.rent.maxDeposit = val;
//   }

//   setRentMaxRent(val: number) {
//     this.priceFilter.rent.maxRent = val;
//   }
//   closePriceDialog() {
//     this.showPriceFilter = false;
//   }
//   closeSortDialog() {
//     this.showSortDropdown = false;
//   }
//   closeDateSortDialog() {
//     this.showDateSortDropdown = false;
//   }

//   toggleDateSortDropdown() {
//     this.showDateSortDropdown = !this.showDateSortDropdown;
//   }

//   onDateSortSelect(value: '' | 'newest' | 'oldest') {
//     this.dateSortOrder = value;
//     this.showDateSortDropdown = false;
//     this.applyFilters();
//   }
// }
