import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //check if user is logged in
  if (localStorage.getItem('user')) {
    return true;
  }
  else {
    return false;
  }
};
