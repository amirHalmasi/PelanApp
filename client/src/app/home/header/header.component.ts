import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ProvinceAndCitiesService } from '../province-and-cities-service.service';
import { Province } from 'src/app/shared/province.model';
import { City } from 'src/app/shared/citiy.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentInit {
  headerBrand!: string;

  @Input('brandTitle') brand: string;
  isExpanded = false;
  selectedCity!: City;

  isLoading: boolean = false;
  constructor(
    private provinceAndCityServ: ProvinceAndCitiesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.provinceAndCityServ.selectedCity.subscribe({
      next: (city: City) => {
        console.log(city);

        this.selectedCity = city;
        // this.cdr.detectChanges;
      },
    });
  }
  ngOnInit() {
    this.isLoading = true;
    this.provinceAndCityServ.getProvinces().subscribe({
      next: (response: Province[]) => {
        this.provinceAndCityServ.provinceNames = response;
        console.log(this.provinceAndCityServ.provinceNames);
      },
      error: (error: any) => console.error(error),
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  @Output() onOpenCityModal = new EventEmitter<boolean>();
  openCities() {
    this.onOpenCityModal.emit(true);
  }
  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }
  // ngAfterContentInit(): void {
  //   this.headerBrand = this.brand.nativeElement;
  // }
}
