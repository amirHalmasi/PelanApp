import { Component, Input, OnInit } from '@angular/core';

import {
  faChevronRight,
  faExpand,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgIf, NgClass, NgFor } from '@angular/common';
interface carouselImage {
  highQuality?: string;
  lowQuality?: string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],

  standalone: true,
  imports: [NgIf, NgClass, NgFor, LazyLoadImageModule, FontAwesomeModule],
})
export class CarouselComponent implements OnInit {
  @Input() imagesFiles: carouselImage[] = [];
  @Input() AllowExpand: boolean = false;
  // @Input() indicators: boolean = true;
  indicators: boolean = true;
  // @Input() controls: boolean = true;
  controls: boolean = true;
  icon = {
    right: faChevronRight,
    left: faChevronLeft,
    expand: faExpand,
    exit: faTimes,
  };

  // @Input() icon = { right: faChevronRight, left: faChevronLeft };
  currentUrl!: string;
  isImageExpanded: boolean = false;
  constructor(private router: Router) {}
  selectedIndex = 0;
  isMoreThanOneImageExist!: boolean;
  isInAdvertiseDetail!: boolean;
  ngOnInit(): void {
    console.log(this.imagesFiles);

    console.log(typeof this.imagesFiles);
    this.isMoreThanOneImageExist = this.imagesFiles.length > 1;
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);

    if (this.currentUrl.includes('advertiseDetails')) {
      this.isInAdvertiseDetail = true;
    } else {
      this.isInAdvertiseDetail = false;
    }
  }
  //sets index of image on dot/ indicator click
  selectedImage(imageIndex: number) {
    this.selectedIndex = imageIndex;
  }

  onPreviousClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.imagesFiles.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick() {
    if (this.selectedIndex === this.imagesFiles.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
