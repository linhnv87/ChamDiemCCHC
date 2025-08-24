export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active: boolean;
  expanded?: boolean;
  children?: MenuItem[];
}
