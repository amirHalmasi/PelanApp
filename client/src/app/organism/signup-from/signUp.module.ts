import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselComponent } from './carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SignupFromComponent } from './signup-from.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SuignupRoutingModule } from './signup-routing.module';

@NgModule({
    imports: [
    NgxMatSelectSearchModule,
    SuignupRoutingModule,
    SignupFromComponent,
],
})
export class SignupFromModule {}
