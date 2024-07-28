import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { flipInOut } from 'src/app/services/animation';
import { ProvinceAndCityService } from '../province-and-city/province-and-city.service';
import Typed from 'typed.js';
import { Title } from '@angular/platform-browser';
import { SlideInterface } from '../image-slider/image-slider.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flipInOut],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    // localStorage.clear();
    // authUser ??
    // return data ? JSON.parse(data) : null;
    // this.getProvinceAndCityData();
  }

  images = [
    { imageSrc: '../../../assets/zamineh/1 (11).jpg', imageAlt: '1' },
    { imageSrc: '../../../assets/zamineh/1 (1).jpg', imageAlt: '2' },
    { imageSrc: '../../../assets/zamineh/1 (2).jpg', imageAlt: '3' },
  ];

  // Add more items as needed

  // constructor(private provinceAndCityServ: ProvinceAndCityService) {}
  // getProvinceAndCityData() {
  //   this.provinceAndCityServ.provinceAndCityData.subscribe((data) => {
  //     console.log('provinceDate', data);
  //   });
  //   // console.log(data);
  // }
}
