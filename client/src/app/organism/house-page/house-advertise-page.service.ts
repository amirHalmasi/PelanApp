import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseAdvetisePageService {
  constructor(private http: HttpClient) {}
  houseAdvertises = new Subject<any>();
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
