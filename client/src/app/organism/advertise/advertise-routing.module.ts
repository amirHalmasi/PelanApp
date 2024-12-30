import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canDeactivateGuardFn } from '../signup-from/can-deactivate-gaurde';
import { AdvertiseComponent } from './advertise.component';
import { GroundAdvertiseComponent } from './ground-advertise/ground-advertise.component';
import { HouseAdvertiseComponent } from './house-advertise/house-advertise.component';
import { StoreadvertiseComponent } from './storeadvertise/storeadvertise.component';
const routes: Routes = [
  {
    path: '',
    // canDeactivate: [canDeactivateGuardFn],
    component: AdvertiseComponent,
    children: [
      {
        path: 'house',
        canDeactivate: [canDeactivateGuardFn],
        component: HouseAdvertiseComponent,
      },
      {
        path: 'store',
        component: StoreadvertiseComponent,
        canDeactivate: [canDeactivateGuardFn],
      },
      {
        path: 'ground',
        component: GroundAdvertiseComponent,
      },
      {
        path: '',
        redirectTo: 'house',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRoutingModule {}
