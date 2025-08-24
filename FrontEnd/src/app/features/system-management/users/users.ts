import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SystemBaseLayout } from '../system-base-layout/system-base-layout';

@Component({
  selector: 'app-users',
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
    MatCheckboxModule,
    SystemBaseLayout,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'index',
    'fullName',
    'username',
    'unit',
    'email',
    'phone',
    'dob',
    'gender',
    'address',
    'actions',
  ];

  dataSource = new MatTableDataSource<UserItem>(USER_DATA);
  selection = new SelectionModel<UserItem>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Search state
  showSearch = false;
  fullNameQuery = '';
  usernameQuery = '';
  unitQuery = '';
  emailQuery = '';

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'index':
          return item.id;
        case 'fullName':
          return item.fullName;
        case 'username':
          return item.username;
        case 'unit':
          return item.unit;
        case 'email':
          return item.email;
        case 'phone':
          return item.phone;
        case 'dob':
          return item.dob;
        case 'gender':
          return item.gender;
        case 'address':
          return item.address;
        default:
          return '' as any;
      }
    };

    this.dataSource.filterPredicate = (data: UserItem, filter: string) => {
      try {
        const f = JSON.parse(filter || '{}');
        const nm = (data.fullName || '').toLowerCase();
        const un = (data.username || '').toLowerCase();
        const ut = (data.unit || '').toLowerCase();
        const em = (data.email || '').toLowerCase();
        const nameOk = !f.fullName || nm.includes(f.fullName.toLowerCase());
        const userOk = !f.username || un.includes(f.username.toLowerCase());
        const unitOk = !f.unit || ut.includes(f.unit.toLowerCase());
        const emailOk = !f.email || em.includes(f.email.toLowerCase());
        return nameOk && userOk && unitOk && emailOk;
      } catch {
        return true;
      }
    };

    this.applyFilter();
  }

  // Selection helpers (same behavior as Units)
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numRows > 0 && numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: UserItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  onView(row: UserItem) {
    console.log('View user', row);
  }

  onEdit(row: UserItem) {
    console.log('Edit user', row);
  }

  onDelete(row: UserItem) {
    this.dataSource.data = this.dataSource.data.filter((x) => x.id !== row.id);
  }

  deleteSelected() {
    const selectedIds = new Set(this.selection.selected.map((x) => x.id));
    this.dataSource.data = this.dataSource.data.filter((x) => !selectedIds.has(x.id));
    this.selection.clear();
  }

  // Extra actions from actions menu
  onResetPassword(row: UserItem) {
    console.log('Reset password for', row);
  }

  onAssignRole(row: UserItem) {
    console.log('Assign role for', row);
  }

  onPersonalPermission(row: UserItem) {
    console.log('Personal permission for', row);
  }

  onAutoLockConfig(row: UserItem) {
    console.log('Auto lock config for', row);
  }

  onLockAccount(row: UserItem) {
    console.log('Lock account for', row);
  }

  onViewLockLogs(row: UserItem) {
    console.log('View lock logs for', row);
  }

  onAssignManagementUnit(row: UserItem) {
    console.log('Assign management unit for', row);
  }

  applyFilter() {
    const filterValue = JSON.stringify({
      fullName: this.fullNameQuery,
      username: this.usernameQuery,
      unit: this.unitQuery,
      email: this.emailQuery,
    });
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  clearFilter() {
    this.fullNameQuery = '';
    this.usernameQuery = '';
    this.unitQuery = '';
    this.emailQuery = '';
    this.applyFilter();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearFilter();
    }
  }

  addNew() {
    const nextId = Math.max(...this.dataSource.data.map((d) => d.id), 0) + 1;
    const item: UserItem = {
      id: nextId,
      fullName: `Người dùng ${nextId}`,
      username: `user${nextId}`,
      unit: 'Sở Nội vụ',
      email: `user${nextId}@example.com`,
      phone: '0900000000',
      dob: '01/01/1990',
      gender: nextId % 2 === 0 ? 'Nam' : 'Nữ',
      address: 'Phú Thọ',
    };
    this.dataSource.data = [item, ...this.dataSource.data];
  }
}

export interface UserItem {
  id: number;
  fullName: string;
  username: string;
  unit: string;
  email: string;
  phone: string;
  dob: string; // dd/MM/yyyy
  gender: 'Nam' | 'Nữ';
  address: string;
}

const names = ['Nguyễn Văn A', 'Trần Thị B', 'Phạm Văn C', 'Lê Thị D', 'Hoàng Văn E'];
const units = [
  'UBND tỉnh',
  'Sở Nội vụ',
  'Văn phòng UBND Tỉnh',
  'Ban Dân tộc',
  'BQL các KCN',
  'BCH Quân sự Tỉnh',
  'Công an Tỉnh',
  'Sở Thông tin & Truyền thông',
];

const USER_DATA: UserItem[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  fullName: names[i % names.length],
  username: `user${(i + 1).toString().padStart(3, '0')}`,
  unit: units[i % units.length],
  email: `user${i + 1}@example.com`,
  phone: `09${(10000000 + i).toString()}`,
  dob: `${((i % 28) + 1).toString().padStart(2, '0')}/${((i % 12) + 1)
    .toString()
    .padStart(2, '0')}/19${80 + (i % 20)}`,
  gender: i % 2 === 0 ? 'Nam' : 'Nữ',
  address: i % 3 === 0 ? 'Thành phố Việt Trì, Phú Thọ' : 'Phú Thọ',
}));
