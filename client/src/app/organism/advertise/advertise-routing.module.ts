import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { canDeactivateGuardFn } from '../signup-from/can-deactivate-gaurde';
import { AdvertiseComponent } from './advertise.component';
import { GroundAdvertiseComponent } from './ground-advertise/ground-advertise.component';
import { HouseAdvertiseComponent } from './house-advertise/house-advertise.component';
import { StoreadvertiseComponent } from './storeadvertise/storeadvertise.component';
import { canActivateAddAdvertisePageGuard } from 'src/app/guards/can-activate-add-advertises-page.guard';
const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateAddAdvertisePageGuard],
    component: AdvertiseComponent,
    children: [
      {
        path: 'house',
        // canActivate: [canActivateAddAdvertisePageGuard],
        component: HouseAdvertiseComponent,
      },
      {
        path: 'store',
        component: StoreadvertiseComponent,
        // canActivate: [canActivateAddAdvertisePageGuard],

        // canDeactivate: [canDeactivateGuardFn],
      },
      {
        path: 'ground',
        // canActivate: [canActivateAddAdvertisePageGuard],
        component: GroundAdvertiseComponent,
      },
      // {
      //   path: '',
      //   component: GroundAdvertiseComponent,
      //   pathMatch: 'full',
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRoutingModule {}
