import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFromComponent } from './organism/login-from/login-from.component';
import { HomeComponent } from './organism/home/home.component';
import { SignupFromComponent } from './organism/signup-from/signup-from.component';
import { canDeactivateGuardFn } from './organism/signup-from/can-deactivate-gaurde';
import { AdvertiseComponent } from './organism/advertise/advertise.component';
import { HouseAdvertiseComponent } from './organism/advertise/house-advertise/house-advertise.component';
import { StoreadvertiseComponent } from './organism/advertise/storeadvertise/storeadvertise.component';
import { GroundAdvertiseComponent } from './organism/advertise/ground-advertise/ground-advertise.component';
// import { RentPageComponent } from './organism/rent-page/rent-page.component';
import { SellPageComponent } from './organism/sell-page/sell-page.component';
import { HouseAdvertisePageComponent } from './organism/house-page/house-advertise-page.component';
import { CanActivateHousePageGuard } from './guards/can-activate-house-page.guard';

const routes: Routes = [
  {
    path: 'login',

    component: LoginFromComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    canDeactivate: [canDeactivateGuardFn],
    component: SignupFromComponent,
  },
  {
    path: 'houseAdvertise',
    component: HouseAdvertisePageComponent,
    canActivate: [CanActivateHousePageGuard],
  },
  {
    path: 'sell',
    component: SellPageComponent,
  },
  {
    path: 'advertise',
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
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
