import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseAdvetisePageService } from '../house-advertise-page.service';

@Component({
  selector: 'app-house-advertisement-details',
  templateUrl: './house-advertisement-details.component.html',
  styleUrls: ['./house-advertisement-details.component.css'],
})
export class HouseAdvertisementDetailsComponent implements OnInit {
  advertiseData!: any;
  constructor(private houseAdvertiseServ: HouseAdvetisePageService) {}
  ngOnInit(): void {
    // this.activatedroute.data.subscribe((data) => {
    //   console.log('pass data', data);
    // });
    console.log(this.houseAdvertiseServ.advertiseItem);
    this.advertiseData = this.houseAdvertiseServ.advertiseItem;
    this.houseAdvertiseServ.selectedAdvertiseRow.next(3);
  }
}
