import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdvetiseHouseDetailsService {
  constructor(private http: HttpClient) {}
  //   advertises = new Subject<any>();
  //   hasItems = new Subject<boolean>();
  //   selectedAdvertiseRow = new BehaviorSubject<number>(0);
  //   advertiseItem!: any;
  advertiseDetailsURL = new BehaviorSubject<string>('');
  getSpecificHouseRentAdverise(advertiseCode: number) {
    // const advertiseCode = 964617300;
    return this.http.get<any>(
      'https://localhost:5001/api/HouseAdvertise/' +
        'houserent/' +
        advertiseCode
    );
  }
  getSpecificHouseSellAdverise(advertiseCode: number) {
    // const advertiseCode = 964617300;
    return this.http.get<any>(
      'https://localhost:5001/api/HouseAdvertise/' +
        'housesell/' +
        advertiseCode.toString()
    );
  }
}
