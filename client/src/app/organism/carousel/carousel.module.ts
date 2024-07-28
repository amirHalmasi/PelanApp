import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [CarouselComponent],
})
export class CustomeCarouselModule {}
