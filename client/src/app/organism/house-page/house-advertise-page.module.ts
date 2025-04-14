import { NgModule } from '@angular/core';



import { BedroomSvgComponent } from './bedroom-svg/bedroom-svg.component';
import { BookmarkSvgComponent } from './bookmark-svg/bookmark-svg.component';
import { ParkingSvgComponent } from './parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from './elevator-svg/elevator-svg.component';

import { HouseAdvertisePageRoutingModule } from './house-advertise-page-routing.module';
import { NumberSepratorPipe } from './number-seprator.pipe';
import { HouseAdvertisePageComponent } from './house-advertise-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
    HouseAdvertisePageRoutingModule,
    ScrollingModule,
    HouseAdvertisePageComponent,
    BedroomSvgComponent,
    BookmarkSvgComponent,
    ParkingSvgComponent,
    ElevatorSvgComponent,
    NumberSepratorPipe,
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
