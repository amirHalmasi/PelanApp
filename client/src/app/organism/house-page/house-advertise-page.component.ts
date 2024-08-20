import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { faBed, faCar } from '@fortawesome/free-solid-svg-icons';
import { fadeInOut } from 'src/app/services/animation';
import { HouseAdvetisePageService } from './house-advertise-page.service';
import { fromEvent, map, Subscription } from 'rxjs';
import { ModalServiceService } from 'src/app/services/modal-service.service';
// import { Component } from '@angular/core';

@Component({
  selector: 'app-house-advertise-page',
  templateUrl: './house-advertise-page.component.html',
  styleUrls: ['./house-advertise-page.component.css'],
  animations: [fadeInOut],
})
export class HouseAdvertisePageComponent implements OnInit, OnDestroy {
  items!: any;
  startIndex!: number;
  lastIndex!: number;
  displayAdvertises!: any;
  private resizeSubscription$!: Subscription;
  deviceWidth = window.innerWidth;
  cityData: any = JSON.parse(
    localStorage.getItem('cityData') ||
      '{city_id:0,city_latitude:"0",city_longitude:"0",city_name:"",city_name_en:"",province_id:0}'
  );
  isLoadingAdvertises!: boolean;
  houseAdvSubscribtion!: Subscription;
  constructor(
    private http: HttpClient,
    private houseAdvertiseServ: HouseAdvetisePageService,
    private cityModalServ: ModalServiceService,
    private cdr: ChangeDetectorRef
  ) {
    // console.log('this.deviceWidth', this.deviceWidth);
  }
  ngOnDestroy(): void {
    this.houseAdvSubscribtion.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }
  ngOnInit(): void {
    // this.ViewportWidth();
    this.cityModalServ.selectedCity.subscribe({
      next: (cityData) => {
        this.cityData = cityData;
      },
    });

    this.getAllAdvertises(this.cityData.city_id);

    this.resizeSubscription$ = fromEvent(window, 'resize').subscribe(() => {
      this.deviceWidth = window.innerWidth;
      this.items = this.groupIntoChunks(
        this.flattenChunks(this.items),
        this.arrayElemrntPairCount(this.deviceWidth)
      );
      console.log('new width', this.deviceWidth);
      console.log('new structure after resize', this.items);
      this.cdr.detectChanges();
    });

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
        },
      });

    // this.houseAdvSubscribtion = this.houseAdvertiseServ.houseAdvertises
    //   .subscribe({
    //     next: (data) => {
    //       this.items = data;
    //       console.log('this.items house page', this.items);
    //     },
    //   });
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
    } else if (deviceWidth >= 992) {
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
      // .pipe(map((data) => this.groupIntoChunks(data, 3)))
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
        },
      });
  }

  icons = { bed: faBed, parking: faCar };
  activeSlideIndex = 0;
}
