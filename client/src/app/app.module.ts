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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    HomeComponent,
    SelectCitiesComponent,
    RegisterComponent,

    CityListComponent,
    ProvinceListComponent,
    LoginComponent,
  ],
  imports: [
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
