import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProvinceAndCitiesService } from 'src/app/home/province-and-cities-service.service';
import { City } from 'src/app/shared/citiy.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent implements OnInit {
  @Input() item: City;
  @Input() last: boolean = false;
  constructor(private provinceAndCityServ: ProvinceAndCitiesService) {}

  ngOnInit(): void {
    // console.log('city');
    // console.log(this.item);
  }
  //{{}:City,status:boolean}
  onSelectCity(emitedData: City) {
    this.provinceAndCityServ.selectedCity.emit(emitedData);
    this.provinceAndCityServ.onCloseCityModal.emit(false);
    this.provinceAndCityServ.city = emitedData;

    //چون میخوام از تغییر این متغییر مطلع بشم
    // و از این تغییر مقدار متغیر برای اپدیت ویو خودم استفاده کنم
    // باید از ایونت امیتر استفاده کنم
  }
}
