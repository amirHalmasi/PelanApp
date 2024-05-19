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
import { SearchFormComponent } from './organism/city-province-modal/search-form/search-form.component';
import { LoadingAtmComponent } from './organism/loading-atm/loading-atm.component';
import { LoginFromComponent } from './organism/login-from/login-from.component';
import { HomeComponent } from './organism/home/home.component';
import { SignupFromComponent } from './organism/signup-from/signup-from.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectWitSearchComponent } from './organism/signup-from/select-wit-search/select-wit-search.component';
import { AdvertiseComponent } from './organism/advertise/advertise.component';
import { UploadfileComponent } from './organism/advertise/uploadfile/uploadfile.component';
import { AlertComponent } from './organism/advertise/uploadfile/alert/alert.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TextInputComponent,
    CityProvinceModalComponent,
    ActionBtnAtomComponent,
    ProvinceListAtmComponent,
    CityListAtmComponent,
    SearchFormComponent,
    LoadingAtmComponent,
    LoginFromComponent,
    HomeComponent,
    SignupFromComponent,
    SelectWitSearchComponent,
    AdvertiseComponent,
    UploadfileComponent,
    AlertComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
