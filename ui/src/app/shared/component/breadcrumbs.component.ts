import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService, Breadcrumb } from '@exalif/ngx-breadcrumbs';
import { BreadcrumbSwitchLink } from '../model';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { BreadcrumbsSwitchService } from '../service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  crumbs: Breadcrumb[];

  breadcrumbSwitchLinks: BreadcrumbSwitchLink[];

  ngOnInit() {
    const self = this;

    self.breadcrumbsService.crumbs$.subscribe((crumbs) => {
      self.crumbs = crumbs;
    });

    self.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => {
      self.breadcrumbSwitchLinks = undefined;
    });
    self.breadcrumbsSwitchService.switchLinks.subscribe((data) => {
      self.breadcrumbSwitchLinks = data;
    });
  }
}
