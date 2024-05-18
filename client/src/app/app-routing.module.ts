import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFromComponent } from './organism/login-from/login-from.component';
import { HomeComponent } from './organism/home/home.component';
import { SignupFromComponent } from './organism/signup-from/signup-from.component';
import { canDeactivateGuardFn } from './organism/signup-from/can-deactivate-gaurde';
import { AdvertiseComponent } from './organism/advertise/advertise.component';

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
    path: 'advertise',
    // canDeactivate: [canDeactivateGuardFn],
    component: AdvertiseComponent,
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
