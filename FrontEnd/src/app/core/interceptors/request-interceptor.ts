import { HttpInterceptorFn } from '@angular/common/http';
import { IUser } from '../interfaces';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const userInfo: IUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (userInfo?.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    });
  }
  return next(req);
};
