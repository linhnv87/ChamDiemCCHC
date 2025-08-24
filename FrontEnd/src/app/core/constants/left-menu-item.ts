import { MenuItem } from '../../shared/interfaces';

export const LEFT_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'home',
    label: 'Trang chủ',
    route: '/dashboard',
    active: false,
  },
  {
    icon: 'description',
    label: 'Quản lý hệ thống',
    route: '/systems',
    active: false,
    expanded: false,
    children: [
      {
        icon: 'config',
        label: 'Cấu hình hệ thống',
        route: '/systems/config',
        active: false,
      },
      {
        icon: 'upload',
        label: 'Quản lý đơn vị',
        route: '/systems/units',
        active: false,
      },
      {
        icon: 'category',
        label: 'Quản lý danh mục',
        route: '/systems/categories',
        active: false,
      },
      {
        icon: '',
        label: 'Quản lý người dùng',
        route: '/systems/users',
        active: false,
      },
      {
        icon: '',
        label: 'Quản lý chức năng',
        route: '/systems/function',
        active: false,
      },
      {
        icon: '',
        label: 'Danh sách vai trò',
        route: '/systems/roles',
        active: false,
      },
      {
        icon: '',
        label: 'Log hệ thống',
        route: '/systems/logs',
        active: false,
      },
    ],
  },
  {
    icon: 'folder',
    label: 'Quản lý bộ chỉ số',
    route: '/index',
    active: false,
    expanded: false,
    children: [
      {
        icon: 'add_circle',
        label: 'Quản lý bộ chỉ số (core cấu hình form khảo sát)',
        route: '/index/core',
        active: false,
      },
      {
        icon: 'history',
        label: 'Quản lý đợt khê khai',
        route: '/index/dot',
        active: false,
      },
    ],
  },
  {
    icon: 'assessment',
    label: 'Tổng hợp số liệu',
    route: '/reports',
    active: false,
    expanded: false,
    children: [
      {
        icon: 'summarize',
        label: 'Tổng hợp số liệu',
        route: '/reports',
        active: false,
      },
    ],
  },
  {
    icon: 'settings',
    label: 'Quản lý hội đồng',
    route: '/settings',
    active: false,
    expanded: false,
    children: [
      {
        icon: 'people',
        label: 'Phân công hội đồng chấm ngoài sở NV',
        route: '/settings/users',
        active: false,
      },
      {
        icon: 'config',
        label: 'Quản lý hội đồng chấm ngoài sở NV',
        route: '/settings/roles',
        active: false,
      },
      {
        icon: 'tune',
        label: 'Phân công nội bộ sở NV',
        route: '/settings/general',
        active: false,
      },
    ],
  },
];
