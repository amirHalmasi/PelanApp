import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './form-field/text-input/text-input.component';
import { MaterialModule } from './material.module';

import { CityProvinceModalComponent } from './organism/city-province-modal/city-province-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionBtnAtomComponent } from './organism/city-province-modal/action-btn-atom/action-btn-atom.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ProvinceListAtmComponent } from './organism/city-province-modal/province-list-atm/province-list-atm.component';
import { CityListAtmComponent } from './organism/city-province-modal/city-list-atm/city-list-atm.component';

import { LoadingAtmComponent } from './organism/loading-atm/loading-atm.component';
import { LoginFromComponent } from './organism/login-from/login-from.component';
import { HomeComponent } from './organism/home/home.component';
import { SignupFromComponent } from './organism/signup-from/signup-from.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectWitSearchComponent } from './organism/signup-from/select-wit-search/select-wit-search.component';
import { AdvertiseComponent } from './organism/advertise/advertise.component';
import { UploadfileComponent } from './organism/advertise/uploadfile/uploadfile.component';
import { AlertComponent } from './organism/advertise/uploadfile/alert/alert.component';
// import { AuthInterceptor } from './services/auth.interceptor';
import { ProvinceAndCityComponent } from './organism/province-and-city/province-and-city.component';
import { SellComponent } from './organism/advertise/house-advertise/sell/sell.component';
import { RentComponent } from './organism/advertise/house-advertise/rent/rent.component';
// import { CommonComponent } from './organism/advertise/house-advertise/common-house/common.component';
import { HouseAdvertiseComponent } from './organism/advertise/house-advertise/house-advertise.component';
import { StoreadvertiseComponent } from './organism/advertise/storeadvertise/storeadvertise.component';
import { CommonHouseComponent } from './organism/advertise/house-advertise/common-house/common-house.component';
import { CommonComponent } from './organism/advertise/storeadvertise/common/common.component';
import { SellStoreComponent } from './organism/advertise/storeadvertise/sell-store/sell-store.component';
import { RentStoreComponent } from './organism/advertise/storeadvertise/rent-store/rent-store.component';
import { GroundAdvertiseComponent } from './organism/advertise/ground-advertise/ground-advertise.component';
// import { RentPageComponent } from './organism/rent-page/rent-page.component';
import { SellPageComponent } from './organism/sell-page/sell-page.component';
// import { ImageSliderComponent } from './organism/image-slider/image-slider.component';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CustomeCarouselModule } from './organism/carousel/carousel.module';
import { ThereisOrNotComponent } from './organism/house-page/thereis-or-not/thereis-or-not.component';
import { UncheckedSvgComponent } from './organism/house-page/thereis-or-not/unchecked-svg/unchecked-svg.component';
import { CheckedSvgComponent } from './organism/house-page/thereis-or-not/checked-svg/checked-svg.component';
import { BedroomSvgComponent } from './organism/house-page/bedroom-svg/bedroom-svg.component';
import { ParkingSvgComponent } from './organism/house-page/parking-svg/parking-svg.component';
import { ElevatorSvgComponent } from './organism/house-page/elevator-svg/elevator-svg.component';
import { HouseAdvertisePageComponent } from './organism/house-page/house-advertise-page.component';
// import { ElevatorSvgComponent } from './organism/rent-page/elevator-svg/elevator-svg.component';
// import { ParkingSvgComponent } from './organism/rent-page/parking-svg/parking-svg.component';
// import { BedroomSvgComponent } from './organism/rent-page/bedroom-svg/bedroom-svg.component';
// import { CheckedSvgComponent } from './organism/rent-page/thereis-or-not/checked-svg/checked-svg.component';
// import { UncheckedSvgComponent } from './organism/rent-page/thereis-or-not/unchecked-svg/unchecked-svg.component';
// import { ThereisOrNotComponent } from './organism/rent-page/thereis-or-not/thereis-or-not.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TextInputComponent,
    CityProvinceModalComponent,
    ActionBtnAtomComponent,
    ProvinceListAtmComponent,
    CityListAtmComponent,
    // SearchFormComponent,
    LoadingAtmComponent,
    LoginFromComponent,
    HomeComponent,
    SignupFromComponent,
    SelectWitSearchComponent,
    AdvertiseComponent,
    UploadfileComponent,
    AlertComponent,
    ProvinceAndCityComponent,
    SellComponent,
    RentComponent,
    CommonHouseComponent,
    CommonComponent,
    HouseAdvertiseComponent,
    StoreadvertiseComponent,
    SellStoreComponent,
    RentStoreComponent,
    GroundAdvertiseComponent,
    HouseAdvertisePageComponent,
    SellPageComponent,
    // ImageSliderComponent,
    ElevatorSvgComponent,
    ParkingSvgComponent,
    BedroomSvgComponent,
    CheckedSvgComponent,
    UncheckedSvgComponent,
    ThereisOrNotComponent,
  ],
  imports: [
    NgxMatSelectSearchModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // CarouselModule.forRoot(),
    CustomeCarouselModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
