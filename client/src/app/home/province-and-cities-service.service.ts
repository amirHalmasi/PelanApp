import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, isEmpty, throwError } from 'rxjs';
import { Province } from '../shared/province.model';
import { City } from '../shared/citiy.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceAndCitiesService {
  constructor(private http: HttpClient) {}
  provineCitiesList!: City[];
  selectedCity = new EventEmitter<City>();
  isShowCities: boolean = false;
  // provinceChange_cityName = new EventEmitter<City[]>();
  provinceNames!: Province[];
  getProvinces() {
    return this.http
      .get<Province[]>('https://localhost:5001/api/ProvinceAndCities/provinces')
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(() => error);
        })
      );
    // this.http
    //   .get<Province[]>('https://localhost:5001/api/ProvinceAndCities/provinces')
    //   .subscribe({
    //     next: (response) => {
    //       this.provinceNames = response;
    //       // return response;
    //       console.log(this.provinceNames);
    //     },
    //     error: (errorResponse) => {
    //       // return errorResponse;
    //       console.error(errorResponse);
    //     },
    //   });
  }
  getCities() {
    return this.http
      .get<City[]>('https://localhost:5001/api/ProvinceAndCities/cities')
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
  getCity(provinceIdCode: number) {
    return this.http
      .get<City[]>(
        'https://localhost:5001/api/ProvinceAndCities/' + provinceIdCode
      )
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(() => error);
        })
      );
    // this.http
    //   .get<City[]>(
    //     'https://localhost:5001/api/ProvinceAndCities/' + provinceIdCode
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);

    //       this.provineCitiesInfo = response;
    //       console.log(this.provineCitiesInfo);
    //       // return this.provineCitiesInfo;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }
}
