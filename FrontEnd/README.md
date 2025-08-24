# FrontEnd - Hệ thống Chấm điểm CLHĐ Tỉnh Phú Thọ

## Mô tả
Ứng dụng web Angular sử dụng Angular Material để quản lý hệ thống chấm điểm CLHĐ (Chất lượng hoạt động) của Tỉnh Phú Thọ.

## Tính năng chính

### Layout System
- **Sidenav Navigation**: Menu bên trái có thể đóng/mở với animation mượt mà
- **Responsive Design**: Tự động điều chỉnh layout theo kích thước màn hình
- **Material Design**: Sử dụng Angular Material components với theme đẹp và chỉnh chu
- **Hover Effects**: Khi sidenav đóng, hover vào menu item sẽ hiển thị tooltip

### Components
- **Header Toolbar**: Thanh công cụ phía trên với breadcrumb và user menu
- **Assessment Table**: Bảng hiển thị điểm đánh giá với progress bars
- **Chart Area**: Khu vực biểu đồ (placeholder cho chart library)
- **Notice Banner**: Banner thông báo quan trọng

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- Angular CLI 20+

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:4200`

### Build production
```bash
npm run build
```

## Cấu trúc dự án

```
src/
├── app/
│   ├── login/           # Component đăng nhập
│   ├── app.config.ts    # Cấu hình ứng dụng
│   ├── app.routes.ts    # Định tuyến
│   └── app.ts          # Component gốc
├── core/
│   └── guards/         # Route guards
├── shared/
│   └── components/
│       └── default-layout/  # Layout chính
└── styles.scss         # Global styles
```

## Sử dụng

### Sidenav Navigation
- Click vào button menu (☰) để đóng/mở sidenav
- Khi sidenav đóng, chỉ hiển thị icons
- Hover vào menu item khi sidenav đóng sẽ hiển thị tooltip

### Responsive Behavior
- **Desktop**: Layout 2 cột với sidenav mở rộng
- **Tablet**: Layout 1 cột, sidenav có thể đóng
- **Mobile**: Sidenav full-width, content stack vertically

## Customization

### Themes
- Sử dụng Angular Material theme system
- Có thể thay đổi theme trong `styles.scss`
- Custom CSS variables cho colors và spacing

### Components
- Tất cả components đều standalone
- Sử dụng Angular Material components
- Custom styling với SCSS

## Development

### Code Style
- TypeScript strict mode
- Angular standalone components
- SCSS với variables và mixins
- Material Design principles

### Testing
```bash
npm test
```

### Linting
```bash
ng lint
```

## Dependencies

### Core
- Angular 20+
- Angular Material 20+
- Angular CDK 20+

### Development
- Angular CLI
- Karma + Jasmine
- SCSS

## License
© 2024 Sở Nội vụ Tỉnh Phú Thọ
