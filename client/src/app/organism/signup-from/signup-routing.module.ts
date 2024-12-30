import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupFromComponent } from './signup-from.component';
import { canDeactivateGuardFn } from './can-deactivate-gaurde';

const routes: Routes = [
  {
    path: '',
    canDeactivate: [canDeactivateGuardFn],
    component: SignupFromComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuignupRoutingModule {}
