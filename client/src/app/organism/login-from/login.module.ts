import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ActionBtnAtomModule } from '../city-province-modal/action-btn-atom/action-btn-atom.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFromComponent } from './login-from.component';

@NgModule({
  declarations: [LoginFromComponent],
  imports: [
    SharedModule,
    // NgxMatSelectSearchModule,
    ActionBtnAtomModule,
    LoginRoutingModule,
  ],
  // exports: [LoginFromComponent],
})
export class LoginFormModule {}
