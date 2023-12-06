import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export type CanDeactivateType =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

export interface CanComponentDeactivateFn {
  canDeactivateFn: () => CanDeactivateType;
}

export const canDeactivateGuardFn: CanDeactivateFn<CanComponentDeactivateFn> = (
  component: CanComponentDeactivateFn,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
) => {
  // return component.canDeactivateFn ? component.canDeactivateFn() : true;
  return component.canDeactivateFn();
};
