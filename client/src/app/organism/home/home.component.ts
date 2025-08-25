import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { flipInOut } from 'src/app/services/animation';
import { ProvinceAndCityService } from '../province-and-city-select-list/province-and-city.service';
// import Typed from 'typed.js';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flipInOut],
  standalone: true,
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}
  // url!: string;
  ngOnInit() {
    this.route.url.subscribe((event) => {
      // this.updateBackground(event[0].path);
    }); // UrlSegment[]

    // localStorage.clear();
    // authUser ??
    // return data ? JSON.parse(data) : null;
    // this.getProvinceAndCityData();
  }

  private updateBackground(url: string) {
    const body = document.body;
    console.log(url);
    const homeStyles = {
      backgroundImage: 'url("../../../assets/backiee-70679.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };

    const otherRoutes = {
      background: 'linear-gradient(#ffffff, #c5c5c5, #a7a7a7) !important',
    };

    if (url === 'home') {
      this.applyStyles(body, homeStyles);
      // this.removeStyles(body, otherRoutes);
    } else {
      this.removeStyles(body, homeStyles);
      // this.applyStyles(body, otherRoutes);
    }
  }

  private applyStyles(element: HTMLElement, styles: { [key: string]: string }) {
    for (const [key, value] of Object.entries(styles)) {
      this.renderer.setStyle(element, key, value);
    }
  }

  private removeStyles(
    element: HTMLElement,
    styles: { [key: string]: string }
  ) {
    for (const key of Object.keys(styles)) {
      this.renderer.removeStyle(element, key);
    }
  }

  // Add more items as needed

  // constructor(private provinceAndCityServ: ProvinceAndCityService) {}
  // getProvinceAndCityData() {
  //   this.provinceAndCityServ.provinceAndCityData.subscribe((data) => {
  //     console.log('provinceDate', data);
  //   });
  //   // console.log(data);
  // }
}
