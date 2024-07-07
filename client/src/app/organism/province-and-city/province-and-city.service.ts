import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProvinceAndCityService {
  provinceAndCityData = new EventEmitter<{
    provinceId: number;
    cityId: number;
  }>();
  constructor() {}
}
