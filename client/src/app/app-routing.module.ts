import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { LoginFromComponent } from './organism/login-from/login-from.component';
import { HomeComponent } from './organism/home/home.component';
import { SignupFromComponent } from './organism/signup-from/signup-from.component';
import { canDeactivateGuardFn } from './organism/signup-from/can-deactivate-gaurde';
import { AdvertiseComponent } from './organism/advertise/advertise.component';
import { HouseAdvertiseComponent } from './organism/advertise/house-advertise/house-advertise.component';
import { StoreadvertiseComponent } from './organism/advertise/storeadvertise/storeadvertise.component';
import { GroundAdvertiseComponent } from './organism/advertise/ground-advertise/ground-advertise.component';
// import { RentPageComponent } from './organism/rent-page/rent-page.component';
import { StoreAdvertisePageComponent } from './organism/store-page/store-advertise-page.component';
import { HouseAdvertisePageComponent } from './organism/house-page/house-advertise-page.component';
import { CanActivateHousePageGuard } from './guards/can-activate-house-page.guard';
import { AdvertisementDetailsComponent } from './organism/advertisement-details/advertisement-details.component';
import { MyAdvertisesComponent } from './organism/my-advertises/my-advertises.component';
import { HouseAdvertisesProfileComponent } from './organism/my-advertises/house-advertises-profile/house-advertises-profile.component';
import { StoreAdvertisesProfileComponent } from './organism/my-advertises/store-advertises-profile/store-advertises-profile.component';
import { ChatComponent } from './organism/chat/chat.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./organism/login-from/login.module').then(
        (m) => m.LoginFormModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./organism/signup-from/signUp.module').then(
        (m) => m.SignupFromModule
      ),
  },
  {
    path: 'advertiseDetails/:title',
    // canDeactivate: [canDeactivateGuardFn],
    component: AdvertisementDetailsComponent,
  },
  {
    path: 'houseAdvertise',
    loadChildren: () =>
      import('./organism/house-page/house-advertise-page.module').then(
        (m) => m.HouseAdvertisePageModule
      ),
  },
  {
    path: 'storeAdvertise',
    component: StoreAdvertisePageComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'myAdvertises',
    component: MyAdvertisesComponent,
    children: [
      {
        path: 'userHouseAdvertises',
        component: HouseAdvertisesProfileComponent,
      },
      {
        path: 'userStoreAdvertises',
        component: StoreAdvertisesProfileComponent,
      },

      {
        path: '',
        redirectTo: 'userHouseAdvertises',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'advertise',
    loadChildren: () =>
      import('./organism/advertise/advertise.module').then(
        (m) => m.AdvertiseModule
      ),
  },
  // {
  //   path: 'advertise',
  //   // canDeactivate: [canDeactivateGuardFn],
  //   component: AdvertiseComponent,
  //   children: [
  //     {
  //       path: 'house',
  //       canDeactivate: [canDeactivateGuardFn],
  //       component: HouseAdvertiseComponent,
  //     },
  //     {
  //       path: 'store',
  //       component: StoreadvertiseComponent,
  //       canDeactivate: [canDeactivateGuardFn],
  //     },
  //     {
  //       path: 'ground',
  //       component: GroundAdvertiseComponent,
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'house',
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
