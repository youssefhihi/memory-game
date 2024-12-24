import { CanActivateFn } from '@angular/router';

export const gameGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
