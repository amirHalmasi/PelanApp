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
export const advertiseGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const provinceAndCityService = inject(ProvinceAndCitiesService);
  const router = inject(Router);
  //   const res = provinceAndCityService.provinceNames;
  const storedUserData: {
    username: string;
    usertype: string;
    token: string;
    expires: string;
  } = JSON.parse(localStorage.getItem('userData')); //
  const expireDate = new Date(storedUserData.expires); //
  const formattedExpireDate = expireDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  //   console.log('formated Date', formattedExpireDate);
  if (storedUserData.username && storedUserData.usertype === 'special') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
export const advertiseGuardChild: CanActivateChildFn = (
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
  return advertiseGuard(route, state);
};
