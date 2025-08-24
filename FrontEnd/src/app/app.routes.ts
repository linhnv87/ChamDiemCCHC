import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { DefaultLayout } from '@core';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    canActivate: [authGuard],
    data: { breadcrumb: 'Trang chủ' },
    children: [
      {
        path: 'dashboard',
        data: { breadcrumb: 'Dashboard' },
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'systems',
        data: { breadcrumb: 'Quản lý hệ thống' },
        loadChildren: () =>
          import('./features/system-management/system-management.route').then((m) => m.systemRoute),
      },
      {
        path: 'ke-khai/:id',
        data: { breadcrumb: 'Kê khai' },
        loadChildren: () =>
          import('./features/ke-khai/khe-khai-routes').then((m) => m.KeKhaiRoutes),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
