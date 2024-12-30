import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BedroomSvgComponent } from './bedroom-svg/bedroom-svg.component';
import { BookmarkSvgComponent } from './bookmark-svg/bookmark-svg.component';
import { ParkingSvgComponent } from './parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from './elevator-svg/elevator-svg.component';
import { CustomeCarouselModule } from '../carousel/carousel.module';
import { HouseAdvertisePageRoutingModule } from './house-advertise-page-routing.module';
import { NumberSepratorPipe } from './number-seprator.pipe';
import { HouseAdvertisePageComponent } from './house-advertise-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    HouseAdvertisePageComponent,
    BedroomSvgComponent,
    BookmarkSvgComponent,
    ParkingSvgComponent,
    ElevatorSvgComponent,
    NumberSepratorPipe,
  ],
  imports: [
    SharedModule,
    CustomeCarouselModule,
    HouseAdvertisePageRoutingModule,
    ScrollingModule,
  ],
  exports: [
    BedroomSvgComponent,
    BookmarkSvgComponent,
    ParkingSvgComponent,
    ElevatorSvgComponent,
    NumberSepratorPipe,
    ScrollingModule,
  ],
})
export class HouseAdvertisePageModule {}
