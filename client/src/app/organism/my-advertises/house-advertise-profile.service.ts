import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import { AsyncSubject, BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseAdvetiseProfileService {
  constructor(private http: HttpClient) {}
  houseProfileAdvertises = new Subject<any>();
  storeProfileAdvertises = new Subject<any>();
  hasItems = new Subject<boolean>();
  selectedAdvertiseRow = new BehaviorSubject<number>(3);
  advertiseItem!: any;
  getStoreAdvertises(username: string) {
    let advertisesUrl =
      'https://localhost:5001/api/account/storeAdvertises/' + username;
    // const authUser = JSON.parse(
    //   localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    // );

    // const headers = {
    //   Authorization: `Bearer ${authUser.token}`,
    // };

    return this.http
      .get<any>(
        advertisesUrl
        // , { headers }
      )
      .pipe(
        // Calculate the difference in days between todayDate and advertiseSubmitDate
        map((data: any) => {
          console.log('all store data', data);
          return data.storeAdvertisements.map((advertiseObj: any) => {
            const advertiseSubmitDate = moment(
              advertiseObj.commonData.advertiseSubmitDate
            );
            const todayDate = moment(advertiseObj.todayDate);

            // Calculate the difference in days
            const diffInDay = todayDate.diff(advertiseSubmitDate, 'days');
            const diffInHour = todayDate.diff(advertiseSubmitDate, 'hours');
            const diffInMonth = todayDate.diff(advertiseSubmitDate, 'months');

            // Add the difference to the object
            return {
              ...advertiseObj,
              diffInDay,
              diffInHour,
              diffInMonth,
            };
          });
        })
      );
  }
  getAllAdvertises(username: string) {
    let advertisesUrl =
      'https://localhost:5001/api/account/allAdvertises/' + username;
    // const authUser = JSON.parse(
    //   localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    // );

    // const headers = {
    //   Authorization: `Bearer ${authUser.token}`,
    // };

    return this.http
      .get<any>(
        advertisesUrl
        // , { headers }
      )
      .pipe(
        // Calculate the difference in days between todayDate and advertiseSubmitDate
        map((data: any) => {
          console.log('all data', data);
          return data.houseAdvertisements.map((advertiseObj: any) => {
            const advertiseSubmitDate = moment(
              advertiseObj.advertise.advertiseSubmitDate
            );
            const todayDate = moment(advertiseObj.todayDate);

            // Calculate the difference in days
            const diffInDay = todayDate.diff(advertiseSubmitDate, 'days');
            const diffInHour = todayDate.diff(advertiseSubmitDate, 'hours');
            const diffInMonth = todayDate.diff(advertiseSubmitDate, 'months');

            // Add the difference to the object
            return {
              ...advertiseObj,
              diffInDay,
              diffInHour,
              diffInMonth,
            };
          });
        })
      );
  }
}
