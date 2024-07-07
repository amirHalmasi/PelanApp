import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  public isTokenExist = new BehaviorSubject<boolean>(false);

  constructor() {}
}
