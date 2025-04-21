import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseAdvetisePageService {
  constructor(private http: HttpClient) {}
  houseAdvertises = new Subject<any>();
  hasItems = new Subject<boolean>();
  selectedAdvertiseRow = new BehaviorSubject<number>(0);
  advertiseItem!: any;

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
  getSpecificHouseAdverise(advertiseCode: number) {
    // const advertiseCode = 964617300;
    return this.http.get<any>(
      'https://localhost:5001/api/HouseAdvertise/' +
        'houserent/' +
        advertiseCode
    );
  }
}
