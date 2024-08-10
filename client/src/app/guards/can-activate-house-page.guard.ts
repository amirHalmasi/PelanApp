import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanActivateHousePageGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const cityData = localStorage.getItem('cityData');
    if (cityData) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
