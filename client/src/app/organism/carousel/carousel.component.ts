import { Component, Input, OnInit } from '@angular/core';
import { slideRightInOut } from 'src/app/services/animation';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [slideRightInOut],
})
export class CarouselComponent implements OnInit {
  @Input() images: carouselImage[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() icon = { right: faChevronRight, left: faChevronLeft };
  selectedIndex = 0;
  isMoreThanOneImageExist!: boolean;
  ngOnInit(): void {
    console.log(this.images);
    this.isMoreThanOneImageExist = this.images.length > 1;
  }
  //sets index of image on dot/ indicator click
  selectedImage(imageIndex: number) {
    this.selectedIndex = imageIndex;
  }

  onPreviousClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
