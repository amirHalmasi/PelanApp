import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
// ⚡️ Bonus:
// If you want to prevent the lazy module from even being loaded, you can move the guard up one level in AppRoutingModule and use canMatch instead of canActivate:
export const canMatchAdvertiseGuard: CanMatchFn = () => {
  const router = inject(Router);
  console.log('router guard', router);
  const authUser = localStorage.getItem('authUser');

  // ✅ if logged in → allow loading Advertise module
  if (authUser) {
    return true;
  }

  // ❌ if not logged in → redirect to /home
  return router.createUrlTree(['/home']);
};
/*
🔹 canMatch

Runs earlier in the lifecycle: during route matching, before Angular decides if a route is usable.

Prevents Angular from even considering a route.

For lazy routes: prevents the lazy-loaded module from being downloaded at all.

Typically used on top-level lazy routes.

🔹 canActivate

Runs after Angular has matched a route and is about to activate the component/module.

Protects routes that are already matched.

If guard returns false → the component is never created, but the module is already loaded.

If guard returns a UrlTree → navigation is canceled and redirected.

Works at both eager and lazy routes.

*/
