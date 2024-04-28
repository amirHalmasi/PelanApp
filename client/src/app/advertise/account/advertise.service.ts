import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdvertiseService {
  createdAdvertiseType: string;
  constructor(private route: ActivatedRoute, private router: Router) {}
  advertiseCode = new EventEmitter<string>();
  getQueryParams(): Observable<string> {
    return this.route.queryParams.pipe(
      map((res) => {
        // console.log(res);
        return res['advertise-type'];
      })
    );
  }
}
