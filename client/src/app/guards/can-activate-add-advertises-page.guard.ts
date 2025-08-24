import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateAddAdvertisePageGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authUser = localStorage.getItem('authUser');

  return authUser ? true : router.parseUrl('/home');
};

// ➡️ this is the old way:
// ////////////////////////
// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class CanActivateAdvertisePageGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean | UrlTree {
//     const authUser = localStorage.getItem('authUser');
//     if (authUser) {
//       return true;
//     } else {
//       return this.router.parseUrl('/home');
//     }
//   }
// }
