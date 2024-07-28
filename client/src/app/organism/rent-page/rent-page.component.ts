import { Component } from '@angular/core';
import { faBed, faCar } from '@fortawesome/free-solid-svg-icons';
// import { Component } from '@angular/core';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.css'],
})
export class RentPageComponent {
  icons = { bed: faBed, parking: faCar };
  items = [
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '6' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '7' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '8' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '9' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '10' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '11' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '134' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '1545' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '45457' },
      ],
      title: 'اجاره',
      advertiseType: 'rent',
      dateOfEmpty: new Date(),
      description: 'Description for product 1',
      price: 19.99,
      isHighlighted: true,
      isRated: true,
      roomCount: 2,
      hasParking: false,
      hasElevator: true,
    },
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (23).jpg', imageAlt: '23' },
        { imageSrc: '../../../assets/zamineh/1 (22).jpg', imageAlt: '22' },
        { imageSrc: '../../../assets/zamineh/1 (21).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (18).jpg', imageAlt: '18' },
      ],
      title: 'فروش',
      advertiseType: 'sell',
      description: 'Description for product 2',
      price: 19.99,
      isHighlighted: false,
      isRated: false,
      roomCount: 1,
      hasParking: true,
      hasElevator: false,
    },
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '6' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '7' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '8' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '9' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '10' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '11' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '134' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '1545' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '45457' },
      ],
      title: 'اجاره',
      advertiseType: 'rent',
      dateOfEmpty: new Date(),
      description: 'Description for product 1',
      price: 19.99,
      isHighlighted: false,
      isRated: true,
      roomCount: 2,
      hasParking: true,
      hasElevator: false,
    },
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (23).jpg', imageAlt: '23' },
        { imageSrc: '../../../assets/zamineh/1 (22).jpg', imageAlt: '22' },
        { imageSrc: '../../../assets/zamineh/1 (21).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (18).jpg', imageAlt: '18' },
      ],
      title: 'فروش',
      advertiseType: 'sell',
      description: 'Description for product 2',
      price: 19.99,
      isHighlighted: true,
      isRated: true,
      roomCount: 2,
      hasParking: true,
      hasElevator: false,
    },
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '6' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '7' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '8' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '9' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '10' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '11' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '134' },
        { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '1545' },
        { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '45457' },
      ],
      title: 'اجاره',
      advertiseType: 'rent',
      dateOfEmpty: new Date(),
      description: 'Description for product 1',
      price: 19.99,
      isHighlighted: false,
      isRated: true,
      roomCount: 2,
      hasParking: false,
      hasElevator: true,
    },
    {
      images: [
        { imageSrc: '../../../assets/zamineh/1 (23).jpg', imageAlt: '23' },
        { imageSrc: '../../../assets/zamineh/1 (22).jpg', imageAlt: '22' },
        { imageSrc: '../../../assets/zamineh/1 (21).jpg', imageAlt: '21' },
        { imageSrc: '../../../assets/zamineh/1 (18).jpg', imageAlt: '18' },
      ],
      title: 'فروش',
      advertiseType: 'sell',
      description: 'Description for product 2',
      price: 19.99,
      isHighlighted: true,
      isRated: false,
      roomCount: 1,
      hasParking: true,
      hasElevator: false,
    },
  ];
  activeSlideIndex = 0;
  // slides: { image: string; text?: string }[] = [];

  // constructor() {
  //   for (let i = 0; i < 4; i++) {
  //     this.addSlide(i);
  //   }
  // }

  // addSlide(index: any): void {
  //   this.slides.push({
  //     image: `../../../assets/zamineh/1 (${(this.slides.length % 8) + 1}).jpg`,
  //     text: index + 1,
  //   });
  // }

  // removeSlide(index?: number): void {
  //   const toRemove = index ? index : this.activeSlideIndex;
  //   this.slides.splice(toRemove, 1);
  // }
}
