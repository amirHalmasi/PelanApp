import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { SelectCitiesComponent } from './home/select-citeis/select-cities.component';

import { CityListComponent } from './home/select-citeis/province-and-city-el/city-list/city-list.component';
import { ProvinceListComponent } from './home/select-citeis/province-and-city-el/province-list/province-list.component';
import { LoginComponent } from './login/login.component';
// import {
//   NgbCarouselConfig,
//   NgbCarouselModule,
// } from '@ng-';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './register/register.component';
import { RentComponent } from './rentOrBuy/rent/rent.component';
import { RentitemComponent } from './rentOrBuy/rent/rentitem/rentitem.component';
import { AccountComponent } from './advertise/account/account.component';
// import { CreateRentOrSellComponent } from './advertise/account/create-rent-or-sell/create-rent-or-sell.component';
import { RentHomeAdvertiseComponent } from './advertise/account/rent-home-advertise/rent-home-advertise.component';
import { CardComponent } from './rentOrBuy/rent/card/card.component';
// import { IsSignInDirective } from './home/header/is-sign-in.directive';
// import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    RentComponent,
    RentitemComponent,
    CardComponent,
    SelectCitiesComponent,
    RegisterComponent,
    HomeComponent,
    CityListComponent,
    ProvinceListComponent,
    LoginComponent,
    AccountComponent,
    // CreateRentOrSellComponent,
    RentHomeAdvertiseComponent,
    // IsSignInDirective,
  ],
  imports: [
    // ProgressbarModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
