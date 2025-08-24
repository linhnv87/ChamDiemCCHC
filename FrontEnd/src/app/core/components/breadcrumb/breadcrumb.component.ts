import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterModule } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private sub?: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Rebuild breadcrumbs on every navigation end
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });

    // Initial
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  private buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;

    // Ignore routes without a path or outlets other than primary
    let newUrl = url;
    if (routeConfig && routeConfig.path) {
      // Build the path, replacing route params with their actual values
      const pathSegments = routeConfig.path.split('/');
      const currentParams: Params = route.snapshot.params;
      const segmentPath = pathSegments
        .map((segment) => (segment.startsWith(':') ? currentParams[segment.substring(1)] : segment))
        .join('/');
      newUrl = `${url}/${segmentPath}`.replace(/\/+/g, '/');
    }

    // Add breadcrumb if data.breadcrumb exists
    const label = route.routeConfig?.data?.['breadcrumb'];
    if (label) {
      breadcrumbs.push({ label, url: newUrl });
    }

    // Recurse to first child
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, newUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
