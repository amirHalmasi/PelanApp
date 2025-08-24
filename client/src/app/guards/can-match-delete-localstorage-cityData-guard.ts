// import { inject } from '@angular/core';
// import { CanMatchFn, Router } from '@angular/router';
// // ⚡️ Bonus:
// // If you want to prevent the lazy module from even being loaded, you can move the guard up one level in AppRoutingModule and use canMatch instead of canActivate:
// export const canMatchAdvertiseGuard: CanMatchFn = () => {
//   const router = inject(Router);
//   const authUser = localStorage.getItem('authUser');

//   // ✅ if logged in → allow loading Advertise module
//   if (authUser) {
//     return true;
//   }

//   // ❌ if not logged in → redirect to /home
//   return router.createUrlTree(['/home']);
// };
