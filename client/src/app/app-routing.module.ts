import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { registerGuard } from './shared/register-route.guard';
import { canDeactivateGuardFn } from './shared/checkout.guard';
import { RentComponent } from './rentOrBuy/rent/rent.component';
import { rentGuard } from './shared/rent-route.guard';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './advertise/account/account.component';
import { advertiseGuard } from './shared/advertise-route.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { animation: 'isMainPage' } },
  {
    path: 'login',
    canActivate: [registerGuard],
    component: LoginComponent,
    canDeactivate: [canDeactivateGuardFn],
    data: { animation: 'isLoginPage' },
  },
  {
    path: 'registeruser',
    component: RegisterComponent,
    canActivate: [registerGuard],
    canDeactivate: [canDeactivateGuardFn],
    data: { animation: 'isRegisterPage' },
  },
  {
    path: 'rent',
    component: RentComponent,
    canActivate: [rentGuard],
    // canDeactivate: [canDeactivateGuardFn],
  },
  {
    path: 'createAdvertise',
    component: AccountComponent,
    canActivate: [registerGuard],
    // canDeactivate: [canDeactivateGuardFn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
