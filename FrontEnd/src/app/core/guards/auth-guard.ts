import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import moment from 'moment';
import { IUser } from '../interfaces';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userInfo: IUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const { accessToken = '', tokenExpiration = '' } = userInfo;
  if (!accessToken || (tokenExpiration && moment().isAfter(moment(tokenExpiration)))) {
    localStorage.removeItem('userInfo');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
