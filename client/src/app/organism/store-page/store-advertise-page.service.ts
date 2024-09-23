import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreAdvetisePageService {
  constructor(private http: HttpClient) {}
  storeAdvertises = new Subject<any>();
  hasItems = new Subject<boolean>();
  selectedAdvertiseRow = new BehaviorSubject<number>(0);

  advertiseItem!: any;
  getStoreAdvertises(city_id: string) {
    let advertisesUrl = 'https://localhost:5001/api/StoreAdvertise/' + city_id;

    return this.http.get<any>(advertisesUrl);
  }
}
