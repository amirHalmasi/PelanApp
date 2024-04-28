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
import { City } from './citiy.model';
export const rentGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const provinceAndCityService = inject(ProvinceAndCitiesService);
  const router = inject(Router);
  let selectedCityResult = false;
  selectedCityResult = provinceAndCityService.city ? true : false;
  if (selectedCityResult) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
export const rentGuardChild: CanActivateChildFn = (
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
  return rentGuard(route, state);
};
