import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
interface provinceDto {
  id: number;
  name: string;
  name_en: string;
  latitude: string;
  longitude: string;
  center: string;
}
interface cityDto {
  id: number;
  province_id: number;
  city_name: string;
  city_name_en: string;
  latitude: string;
  longitude: string;
}
export interface province {
  province_id: number;
  province_name: string;
  province_eng_name: string;
  province_latitude: string;
  province_longitude: string;
  province_center: string;
}
export interface city {
  city_id: number;
  province_id: number;
  city_name: string;
  city_name_en: string;
  city_latitude: string;
  city_longitude: string;
}
@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  isModalOpen!: boolean;
  isOpenModal = new Subject<boolean>();
  provinces = new Subject<province[]>();
  isSelectProvinces = new Subject<boolean>();

  closeModal() {
    this.isOpenModal.next(false);
    this.isSelectProvinces.next(true);
  }
  openModal() {
    this.isOpenModal.next(true);
    this.isSelectProvinces.next(true);
  }
  constructor(private http: HttpClient) {}
  getProvinces() {
    let provinceUrl = 'https://localhost:5001/api/province';
    // return this.http.get<provinceDto[]>(provinceUrl);
    return this.http.get<provinceDto[]>(provinceUrl).pipe(
      map((provinces) =>
        provinces.map((province) => {
          return {
            province_id: province.id,
            province_name: province.name,
            province_eng_name: province.name_en,
            province_latitude: province.latitude,
            province_longitude: province.longitude,
            province_center: province.center,
          };
        })
      )
    );
  }
  getCities(province_id: number) {
    let citiesUrl = 'https://localhost:5001/api/cities/' + province_id;
    // return this.http.get<provinceDto[]>(provinceUrl);
    return this.http.get<any>(citiesUrl).pipe(
      map((cities) =>
        cities.map((city:cityDto) => {
          return {
            city_id: city.id,
            province_id: city.province_id,
            city_name: city.city_name,
            city_name_en: city.city_name_en,
            city_latitude: city.latitude,
            city_longitude: city.longitude,
          };
        })
      )
    );
  }
}
