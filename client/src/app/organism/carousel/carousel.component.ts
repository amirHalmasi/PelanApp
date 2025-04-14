import { Component, Input, OnInit } from '@angular/core';
import { slideRightInOut } from 'src/app/services/animation';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
    animations: [slideRightInOut],
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        NgFor,
        LazyLoadImageModule,
        FontAwesomeModule,
    ],
})
export class CarouselComponent implements OnInit {
  @Input() imagesFiles: carouselImage[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() icon = { right: faChevronRight, left: faChevronLeft };
  currentUrl!: string;
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
