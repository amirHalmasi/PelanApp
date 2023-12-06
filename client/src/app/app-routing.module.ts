import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { registerGuard } from './shared/register-route.guard';
import { canDeactivateGuardFn } from './register/checkout.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    canActivate: [registerGuard],
    component: LoginComponent,
    canDeactivate: [canDeactivateGuardFn],
  },
  {
    path: 'registeruser',
    component: RegisterComponent,
    canActivate: [registerGuard],
    canDeactivate: [canDeactivateGuardFn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
