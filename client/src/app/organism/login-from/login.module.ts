import { NgModule } from '@angular/core';



import { LoginRoutingModule } from './login-routing.module';
import { LoginFromComponent } from './login-from.component';

@NgModule({
    imports: [
    LoginRoutingModule,
    LoginFromComponent,
],
})
export class LoginFormModule {}
