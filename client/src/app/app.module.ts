import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './form-field/text-input/text-input.component';
import { MaterialModule } from './material.module';

import { CityProvinceModalComponent } from './organism/city-province-modal/city-province-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionBtnAtomComponent } from './organism/city-province-modal/action-btn-atom/action-btn-atom.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalListAtomComponent } from './organism/city-province-modal/modal-list-atom/modal-list-atom.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TextInputComponent,
    CityProvinceModalComponent,
    ActionBtnAtomComponent,
    ModalListAtomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
