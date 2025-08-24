import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  active?: boolean;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
  @Input() isExpanded = true;
  @Input() menuItems: MenuItem[] = [];
  @Output() expandedChange = new EventEmitter<boolean>();

  isShowing = false;
  private _menuItems: MenuItem[] = [];

  @Input() set menuItemsData(items: MenuItem[]) {
    this._menuItems = this.processMenuItems(items);
  }

  get menuItemsData(): MenuItem[] {
    return this._menuItems;
  }

  private processMenuItems(items: MenuItem[]): MenuItem[] {
    return items.map(item => {
      const hasActiveChild = item.children?.some(child => child.active);
      return {
        ...item,
        expanded: item.expanded || hasActiveChild,
        children: item.children ? this.processMenuItems(item.children) : undefined
      };
    });
  }

  toggleSubMenu(menuItem: MenuItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (menuItem.children && menuItem.children.length > 0) {
      menuItem.expanded = !menuItem.expanded;
    }
  }

  onMouseEnter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  onMouseLeave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
