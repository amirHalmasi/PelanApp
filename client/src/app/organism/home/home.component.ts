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
  // constructor(private provinceAndCityServ: ProvinceAndCityService) {}
  // getProvinceAndCityData() {
  //   this.provinceAndCityServ.provinceAndCityData.subscribe((data) => {
  //     console.log('provinceDate', data);
  //   });
  //   // console.log(data);
  // }
}
