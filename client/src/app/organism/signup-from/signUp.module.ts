import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselComponent } from './carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SignupFromComponent } from './signup-from.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ActionBtnAtomModule } from '../city-province-modal/action-btn-atom/action-btn-atom.module';
import { SuignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [SignupFromComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    ActionBtnAtomModule,
    SuignupRoutingModule,
  ],
  //   exports: [SignupFromComponent],
})
export class SignupFromModule {}
