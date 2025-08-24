import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginFromComponent } from './login-from.component';
import { HouseAdvertisePageComponent } from './house-advertise-page.component';
import { CanActivateHousePageGuard } from 'src/app/guards/can-activate-house-page.guard';

const routes: Routes = [
  {
    path: 'houseAdvertise',
    component: HouseAdvertisePageComponent,
    canActivate: [CanActivateHousePageGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseAdvertisePageRoutingModule {}
