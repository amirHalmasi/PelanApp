import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextInputComponent } from './form-field/text-input/text-input.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './organism/home/home.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectWitSearchComponent } from './organism/signup-from/select-wit-search/select-wit-search.component';
import { StoreAdvertisePageComponent } from './organism/store-page/store-advertise-page.component';
import { CustomeCarouselModule } from './organism/carousel/carousel.module';
import { ThereisOrNotComponent } from './organism/house-page/thereis-or-not/thereis-or-not.component';
import { UncheckedSvgComponent } from './organism/house-page/thereis-or-not/unchecked-svg/unchecked-svg.component';
import { CheckedSvgComponent } from './organism/house-page/thereis-or-not/checked-svg/checked-svg.component';
// import { BedroomSvgComponent } from './organism/house-page/bedroom-svg/bedroom-svg.component';
// import { ParkingSvgComponent } from './organism/house-page/parking-svg/parking-svg.component';
// import { ElevatorSvgComponent } from './organism/house-page/elevator-svg/elevator-svg.component';
// import { HouseAdvertisePageComponent } from './organism/house-page/house-advertise-page.component';
// import { NumberSepratorPipe } from './organism/house-page/number-seprator.pipe';
// import { SendRequestLoadingAtmComponent } from './organism/city-province-modal/action-btn-atom/send-request-loading-atm/send-request-loading-atm.component';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { BookmarkSvgComponent } from './organism/house-page/bookmark-svg/bookmark-svg.component';
import { AdvertisementDetailsComponent } from './organism/advertisement-details/advertisement-details.component';
import { AdvertiseModule } from './organism/advertise/advertise.module';
import { SharedModule } from './modules/shared/shared.module';
import { ActionBtnAtomModule } from './organism/city-province-modal/action-btn-atom/action-btn-atom.module';
import { CityAndProvinceModalModule } from './organism/city-province-modal/city-and-province-modal.module';
import { SignupFromModule } from './organism/signup-from/signUp.module';
// import { LoginFromComponent } from './organism/login-from/login-from.component';
import { LoginFormModule } from './organism/login-from/login.module';
import { HouseAdvertisePageModule } from './organism/house-page/house-advertise-page.module';
import { HouseDetailsComponent } from './organism/advertisement-details/house-details/house-details.component';
import { StoreDetailsComponent } from './organism/advertisement-details/store-details/store-details.component';
import { MyAdvertisesComponent } from './organism/my-advertises/my-advertises.component';
import { HouseAdvertisesProfileComponent } from './organism/my-advertises/house-advertises-profile/house-advertises-profile.component';
// import { LoginFormModule } from './organism/login-from/login.module';

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
    // CityProvinceModalComponent,
    // ActionBtnAtomComponent,
    // ProvinceListAtmComponent,
    // CityListAtmComponent,
    // SearchFormComponent,
    // LoadingAtmComponent,
    // LoginFromComponent,
    HomeComponent,
    // SignupFromComponent,
    SelectWitSearchComponent,
    // AdvertiseComponent,
    // AlertComponent,
    // ProvinceAndCityComponent,
    // UploadfileComponent,
    // StoreadvertiseComponent,
    // CommonComponent,
    // SellStoreComponent,
    // RentStoreComponent,
    // ////////////
    // HouseAdvertiseComponent,
    // CommonHouseComponent,
    // SellComponent,
    // RentComponent,
    // GroundAdvertiseComponent,
    // HouseAdvertisePageComponent,
    StoreAdvertisePageComponent,
    // ImageSliderComponent,
    // ElevatorSvgComponent,
    // ParkingSvgComponent,
    // BedroomSvgComponent,
    CheckedSvgComponent,
    // BookmarkSvgComponent,
    UncheckedSvgComponent,
    ThereisOrNotComponent,
    // NumberSepratorPipe,
    // SendRequestLoadingAtmComponent,
    AdvertisementDetailsComponent,
    HouseDetailsComponent,
    StoreDetailsComponent,
    MyAdvertisesComponent,
    HouseAdvertisesProfileComponent,
  ],
  imports: [
    HouseAdvertisePageModule,
    CityAndProvinceModalModule,
    AdvertiseModule,
    ActionBtnAtomModule,
    NgxMatSelectSearchModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    // ScrollingModule,
    SignupFromModule,
    LoginFormModule,
    // ReactiveFormsModule,
    // MaterialModule,
    // FontAwesomeModule,
    // FormsModule,
    // ReactiveFormsModule,
    SharedModule,

    // HttpClientModule,

    // CarouselModule.forRoot(),
    CustomeCarouselModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
