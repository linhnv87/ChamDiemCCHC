import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { IResponse } from '../interfaces';
import { inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(HotToastService);
  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        const { isSuccess, message } = res.body as IResponse<unknown>;
        if (!isSuccess) {
          toast.error(message);
        }
      }
    }),
  );
};
