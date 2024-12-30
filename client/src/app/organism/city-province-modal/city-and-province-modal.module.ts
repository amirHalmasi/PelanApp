import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselComponent } from './carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CityProvinceModalComponent } from './city-province-modal.component';
import { ProvinceListAtmComponent } from './province-list-atm/province-list-atm.component';
import { CityListAtmComponent } from './city-list-atm/city-list-atm.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ActionBtnAtomModule } from './action-btn-atom/action-btn-atom.module';
import { LoadingAtmComponent } from '../loading-atm/loading-atm.component';

@NgModule({
  declarations: [
    CityProvinceModalComponent,
    ProvinceListAtmComponent,
    CityListAtmComponent,
    // LoadingAtmComponent,
  ],
  imports: [SharedModule, ActionBtnAtomModule],
  exports: [
    CityProvinceModalComponent,
    ProvinceListAtmComponent,
    CityListAtmComponent,
    // LoadingAtmComponent,
  ],
})
export class CityAndProvinceModalModule {}
