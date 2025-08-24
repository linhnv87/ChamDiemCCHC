import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SystemBaseLayout } from '../system-base-layout/system-base-layout';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    SystemBaseLayout,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements AfterViewInit {
  displayedColumns: string[] = [
    'index',
    'name',
    'code',
    'displayOrder',
    'note',
    'attachment',
    'actions',
  ];

  dataSource = new MatTableDataSource<CategoryItem>(CATEGORY_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Search state
  showSearch = false;
  nameQuery = '';
  codeQuery = '';

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'index':
          return item.id;
        case 'displayOrder':
          return item.displayOrder;
        default:
          return (item as any)[property];
      }
    };

    this.dataSource.filterPredicate = (data: CategoryItem, filter: string) => {
      try {
        const f = JSON.parse(filter || '{}') as { name?: string; code?: string };
        const nameOk = !f.name || data.name.toLowerCase().includes(f.name.toLowerCase());
        const codeOk = !f.code || data.code.toLowerCase().includes(f.code.toLowerCase());
        return nameOk && codeOk;
      } catch {
        return true;
      }
    };
    this.applyFilter();
  }

  isAllSelected() {
    return false;
  }

  masterToggle() {
    // no-op: checkboxes removed
  }

  checkboxLabel(row?: CategoryItem): string {
    return '';
  }

  deleteSelected() {
    // no bulk delete without selection; keep as placeholder if needed
  }

  onView(row: CategoryItem) {
    console.log('View category', row);
  }

  onEdit(row: CategoryItem) {
    console.log('Edit category', row);
  }

  onDelete(row: CategoryItem) {
    this.dataSource.data = this.dataSource.data.filter((x) => x.id !== row.id);
  }

  applyFilter() {
    const filterValue = JSON.stringify({ name: this.nameQuery, code: this.codeQuery });
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  clearFilter() {
    this.nameQuery = '';
    this.codeQuery = '';
    this.applyFilter();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearFilter();
    }
  }

  addNew() {
    const nextId = Math.max(...this.dataSource.data.map((d) => d.id)) + 1;
    const item: CategoryItem = {
      id: nextId,
      name: `Tên mới ${nextId}`,
      code: `MA_${nextId}`,
      displayOrder: nextId,
      note: 'Ghi chú',
      attachment: '',
    };
    this.dataSource.data = [item, ...this.dataSource.data];
  }
}

export interface CategoryItem {
  id: number;
  name: string;
  code: string;
  displayOrder: number;
  note?: string;
  attachment?: string;
}

const CATEGORY_DATA: CategoryItem[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name:
    i % 5 === 0
      ? 'http://demo.eoffice.vn:8741'
      : i % 5 === 1
        ? 'Sở Nội vụ'
        : i % 5 === 2
          ? '2022'
          : i % 5 === 3
            ? 'Đường Trần Phú - Phường Tân Dân - Tp.Việt Trì - tỉnh Phú Thọ'
            : 'TỈNH PHÚ THỌ',
  code:
    i % 5 === 0
      ? 'DIACHI_HETHONG'
      : i % 5 === 1
        ? 'TEN_DONVI'
        : i % 5 === 2
          ? 'NAM_SANXUAT'
          : i % 5 === 3
            ? 'DIACHI_DONVI'
            : 'TEN_TINH',
  displayOrder: i + 1,
  note: i % 3 === 0 ? 'Ghi chú' : '',
  attachment: '',
}));
