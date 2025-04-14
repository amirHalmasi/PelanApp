import { Component, OnInit } from '@angular/core';
import { StoreAdvetisePageService } from '../../store-page/store-advertise-page.service';
import { NumberSepratorPipe } from '../../house-page/number-seprator.pipe';
import { CarouselComponent } from '../../carousel/carousel.component';
import { NgIf, NgSwitch, NgSwitchCase, NgClass } from '@angular/common';
import { ThereisOrNotComponent } from '../../house-page/thereis-or-not/thereis-or-not.component';

@Component({
    selector: 'app-store-details',
    templateUrl: './store-details.component.html',
    // styleUrls: ['./store-details.component.css']
    styleUrls: ['../advertisement-details.component.css'],
    standalone: true,
    imports: [
        ThereisOrNotComponent,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgClass,
        CarouselComponent,
        NumberSepratorPipe,
    ],
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
