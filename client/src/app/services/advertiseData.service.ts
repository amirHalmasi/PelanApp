import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdvetiseDataService {
  constructor(private http: HttpClient) {}
  //   advertises = new Subject<any>();
  //   hasItems = new Subject<boolean>();
  //   selectedAdvertiseRow = new BehaviorSubject<number>(0);
  //   advertiseItem!: any;
  previousRouteURL = new BehaviorSubject<string>('');
  editAdvertiseData = new BehaviorSubject<any>('');
}
