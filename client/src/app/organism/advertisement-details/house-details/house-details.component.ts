import { Component, Input, OnInit } from '@angular/core';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetisePageService } from '../../house-page/house-advertise-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['../advertisement-details.component.css'],
  // styleUrls: ['./house-details.component.css'],
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
