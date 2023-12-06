import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProvinceAndCitiesService } from '../home/province-and-cities-service.service';
export const registerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const provinceAndCityService = inject(ProvinceAndCitiesService);
  const router = inject(Router);
  const res = provinceAndCityService.provinceNames;
  if (res) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
export const registerGuardChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  // console.log('authguard child' + state);
  // console.log('authGard');
  // console.log(authGuard(route, state));
  return registerGuard(route, state);
};
