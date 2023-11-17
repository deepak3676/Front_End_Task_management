import { CanActivateFn } from '@angular/router';

export const adminauthGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userEmail')=='d.rawat2002@gmail.com')
  {
    return true;
  }
  else{
    return false;
  }
};
