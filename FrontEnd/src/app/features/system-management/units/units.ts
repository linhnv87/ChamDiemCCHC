import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SystemBaseLayout } from '../system-base-layout/system-base-layout';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    SystemBaseLayout,
  ],
  templateUrl: './units.html',
  styleUrl: './units.scss',
})
export class Units implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'index',
    'code',
    'name',
    'parentName',
    'level',
    'actions',
  ];

  dataSource = new MatTableDataSource<Unit>(UNIT_DATA);
  selection = new SelectionModel<Unit>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // UI state
  showSearch = false;
  searchText = '';
  levelFilter: string | null = null;
  readonly LEVEL_OPTIONS = [
    'Sở ngành',
    'Quận huyện',
    'Đảng ủy',
    'Xã phường',
    'ĐV sự nghiệp',
    'Ngành dọc',
  ];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'index':
          return item.id;
        default:
          return (item as any)[property];
      }
    };

    // Setup a single predicate that reads combined filter criteria from JSON string
    this.dataSource.filterPredicate = (data: Unit, filter: string) => {
      try {
        const criteria = JSON.parse(filter || '{}') as { text?: string; level?: string | null };
        const text = (criteria.text || '').trim().toLowerCase();
        const level = (criteria.level || '').trim().toLowerCase();
        const textOk =
          !text ||
          data.code.toLowerCase().includes(text) ||
          data.name.toLowerCase().includes(text) ||
          data.parentName.toLowerCase().includes(text) ||
          data.level.toLowerCase().includes(text);
        const levelOk = !level || data.level.toLowerCase() === level;
        return textOk && levelOk;
      } catch {
        return true;
      }
    };
    this.applyCombinedFilter();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows && numRows > 0;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: Unit): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  deleteSelected() {
    const selectedIds = new Set(this.selection.selected.map((x) => x.id));
    const remaining = this.dataSource.data.filter((x) => !selectedIds.has(x.id));
    this.dataSource.data = remaining;
    this.selection.clear();
  }

  onEdit(row: Unit) {
    // Placeholder for edit action
    console.log('Edit unit', row);
  }

  onView(row: Unit) {
    console.log('View unit', row);
  }

  onUpdateParent(row: Unit) {
    console.log('Update parent for unit', row);
  }

  onDelete(row: Unit) {
    this.dataSource.data = this.dataSource.data.filter((u) => u.id !== row.id);
    this.selection.deselect(row);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchText = '';
      this.levelFilter = null;
      this.applyCombinedFilter();
    }
  }

  applyCombinedFilter() {
    const filterValue = JSON.stringify({ text: this.searchText, level: this.levelFilter });
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  addNew() {
    const nextId = Math.max(...this.dataSource.data.map((d) => d.id)) + 1;
    const item: Unit = {
      id: nextId,
      code: `DV${nextId.toString().padStart(3, '0')}`,
      name: `Đơn vị ${nextId}`,
      parentName: 'UBND tỉnh',
      level: 'Cấp huyện',
    };
    this.dataSource.data = [item, ...this.dataSource.data];
  }
}

// Dummy data types and data
export interface Unit {
  id: number;
  code: string;
  name: string;
  parentName: string;
  level: string;
}

const UNIT_DATA: Unit[] = Array.from({ length: 46 }).map((_, i) => ({
  id: i + 1,
  code: `DV${(i + 1).toString().padStart(3, '0')}`,
  name: `Đơn vị ${i + 1}`,
  parentName: i % 3 === 0 ? 'Sở Tài chính' : i % 3 === 1 ? 'UBND tỉnh' : 'Sở Nội vụ',
  level:
    i % 4 === 0
      ? 'Cấp tỉnh'
      : i % 4 === 1
        ? 'Cấp huyện'
        : i % 4 === 2
          ? 'Cấp xã'
          : 'Đơn vị sự nghiệp',
}));
