import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';
export type Filters = {
  selectedType: 'all' | 'sell' | 'rent';
  priceFilter: {
    sell: {
      min: string | undefined;
      max: string | undefined;
    };
    rent: {
      maxRent: string | undefined;
      maxDeposit: string | undefined;
    };
  };
  sortOrder: 'asc' | 'desc' | '';
};
@Injectable({
  providedIn: 'root',
})
export class HouseAdvetisePageService {
  defaultFilters: Filters = {
    selectedType: 'all', // حالت اولیه: نمایش همه آگهی‌ها
    priceFilter: {
      sell: {
        min: undefined,
        max: undefined,
      },
      rent: {
        maxRent: undefined,
        maxDeposit: undefined,
      },
    },
    sortOrder: '',
  };

  constructor(private http: HttpClient) {}
  houseAdvertises = new BehaviorSubject<any[]>([]);
  Filters = new BehaviorSubject<Filters>(this.defaultFilters);

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
      advertisesUrl,
      { withCredentials: true }
      // , { headers }
    );
  }
}
