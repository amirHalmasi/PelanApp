import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, FontAwesomeModule, LazyLoadImageModule],
  exports: [CarouselComponent],
})
export class CustomeCarouselModule {}
