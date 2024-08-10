import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreAdvetisePageService } from './store-advertise-page.service';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css'],
})
export class SellPageComponent implements OnInit, OnDestroy {
  cityData: any;
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
    this.storeAdvertiseServ.getHouseAdvertises(city_id).subscribe({
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
