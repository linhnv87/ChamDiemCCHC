import { KeKhaiOverview } from './ke-khai-overview/ke-khai-overview';
import { TuDanhGia } from './tu-danh-gia/tu-danh-gia';

export const KeKhaiRoutes = [
  {
    path: '',
    component: KeKhaiOverview,
    data: {
      breadcrumb: 'Thực hiện tự đánh giá',
    },
  },
  {
    path: 'tu-danh-gia',
    component: TuDanhGia,
    data: {
      breadcrumb: 'Giải trình số liệu trụ cột Kết quả thực hiện nhiệm vụ theo chức năng',
    },
  },
];
