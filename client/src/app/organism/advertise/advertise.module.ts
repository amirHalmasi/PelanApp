import { NgModule } from '@angular/core';
import { StoreadvertiseComponent } from './storeadvertise/storeadvertise.component';
import { CommonComponent } from './storeadvertise/common/common.component';
import { SellStoreComponent } from './storeadvertise/sell-store/sell-store.component';
import { RentStoreComponent } from './storeadvertise/rent-store/rent-store.component';
import { HouseAdvertiseComponent } from './house-advertise/house-advertise.component';
import { CommonHouseComponent } from './house-advertise/common-house/common-house.component';
import { SellComponent } from './house-advertise/sell/sell.component';
import { RentComponent } from './house-advertise/rent/rent.component';
import { GroundAdvertiseComponent } from './ground-advertise/ground-advertise.component';

import { RouterModule } from '@angular/router';

import { ProvinceAndCityComponent } from '../province-and-city-select-list/province-and-city.component';



import { AdvertiseComponent } from './advertise.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdvertiseRoutingModule } from './advertise-routing.module';

@NgModule({
    imports: [
    RouterModule,
    AdvertiseRoutingModule,
    NgxMatSelectSearchModule,
    StoreadvertiseComponent,
    CommonComponent,
    SellStoreComponent,
    RentStoreComponent,
    ////////////
    HouseAdvertiseComponent,
    CommonHouseComponent,
    SellComponent,
    RentComponent,
    GroundAdvertiseComponent,
    AdvertiseComponent,
    ProvinceAndCityComponent,
],
    exports: [
    // StoreadvertiseComponent,
    // CommonComponent,
    // SellStoreComponent,
    // RentStoreComponent,
    // ////////////
    // HouseAdvertiseComponent,
    // CommonHouseComponent,
    // SellComponent,
    // RentComponent,
    // ////////////
    // GroundAdvertiseComponent,
    // AdvertiseComponent,
    ],
})
export class AdvertiseModule {}
