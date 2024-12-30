import { Component, OnInit } from '@angular/core';
import { StoreAdvetisePageService } from '../../store-page/store-advertise-page.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  // styleUrls: ['./store-details.component.css']
  styleUrls: ['../advertisement-details.component.css'],
})
export class StoreDetailsComponent implements OnInit {
  advertiseData!: any;
  constructor(
    private storeAdvertiseServ: StoreAdvetisePageService // private advertiseDataServ: AdvetiseDataService
  ) {}
  ngOnInit(): void {
    this.advertiseData = this.storeAdvertiseServ.advertiseItem;
    console.log(this.advertiseData);
  }
}
