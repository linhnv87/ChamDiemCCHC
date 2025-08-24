import { Routes } from '@angular/router';
import { SystemConfig } from './system-config/system-config';
import { Units } from './units/units';
import { Categories } from './categories/categories';
import { Users } from './users/users';

export const systemRoute: Routes = [
  { path: 'config', component: SystemConfig, data: { breadcrumb: 'Cấu hình hệ thống' } },
  { path: 'units', component: Units, data: { breadcrumb: 'Quản lý đơn vị' } },
  { path: 'categories', component: Categories, data: { breadcrumb: 'Quản lý danh mục' } },
  { path: 'users', component: Users, data: { breadcrumb: 'Quản lý người dùng' } },
  {
    path: '**',
    redirectTo: 'config',
  },
];
