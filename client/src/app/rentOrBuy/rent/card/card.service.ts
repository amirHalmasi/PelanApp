import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  allAdvertisesData$: Observable<object>;
  constructor(private http: HttpClient) {}
  getAdvertiseDataHttp(targetUrl: string) {
    return this.http.get(targetUrl);
    //, JSON.stringify(sendedData), httpOptions)
    // .post(targetUrl, sendedData)
  }
}
