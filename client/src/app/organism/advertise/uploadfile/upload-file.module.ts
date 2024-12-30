import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { UploadfileComponent } from './uploadfile.component';
// import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AlertComponent, UploadfileComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AlertComponent, UploadfileComponent],
})
export class UploadfileModule {}
