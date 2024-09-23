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
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProvinceAndCityComponent } from '../province-and-city-select-list/province-and-city.component';

import { ActionBtnAtomModule } from '../city-province-modal/action-btn-atom/action-btn-atom.module';
import { UploadfileModule } from './uploadfile/upload-file.module';
import { AdvertiseComponent } from './advertise.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdvertiseRoutingModule } from './advertise-routing.module';

@NgModule({
  declarations: [
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
  imports: [
    RouterModule,
    AdvertiseRoutingModule,
    SharedModule,
    ActionBtnAtomModule,
    UploadfileModule,
    NgxMatSelectSearchModule,
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
