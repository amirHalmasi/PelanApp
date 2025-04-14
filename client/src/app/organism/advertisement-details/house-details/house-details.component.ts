import { Component, Input, OnInit } from '@angular/core';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetisePageService } from '../../house-page/house-advertise-page.service';
import { Router } from '@angular/router';
import { NumberSepratorPipe } from '../../house-page/number-seprator.pipe';
import { CarouselComponent } from '../../carousel/carousel.component';
import { NgIf, NgSwitch, NgSwitchCase, NgClass } from '@angular/common';
import { ThereisOrNotComponent } from '../../house-page/thereis-or-not/thereis-or-not.component';

@Component({
    selector: 'app-house-details',
    templateUrl: './house-details.component.html',
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
export class HouseDetailsComponent implements OnInit {
  advertiseData!: any;
  constructor(
    private route: Router,
    private houseAdvertiseServ: HouseAdvetisePageService // private advertiseDataServ: AdvetiseDataService
  ) {}
  ngOnInit(): void {
    this.advertiseData = this.houseAdvertiseServ.advertiseItem;
  }
  navigateTo() {
    this.route.navigate(['/chat']);
  }
}
