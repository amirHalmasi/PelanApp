import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseAdvetisePageService {
  constructor(private http: HttpClient) {}
  // houseAdvertises = new AsyncSubject<any>();
  houseAdvertises = new Subject<any>();
  hasItems = new Subject<boolean>();
  selectedAdvertiseRow = new BehaviorSubject<number>(0);
  // advertiseItem = new Subject<any>();
  advertiseItem!: any;
  // cityData = new Subject<any>();
  getHouseAdvertises(city_id: string) {
    let advertisesUrl = 'https://localhost:5001/api/HouseAdvertise/' + city_id;
    // const authUser = JSON.parse(
    //   localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    // );

    // const headers = {
    //   Authorization: `Bearer ${authUser.token}`,
    // };

    return this.http.get<any>(
      advertisesUrl
      // , { headers }
    );
  }
}
