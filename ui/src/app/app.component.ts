import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './login/login.service';
import { authConfig } from './shared/config';
import { filter } from 'rxjs/operators';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'body',
  template: '<div id="app-wrapper" #appWrapper="ngxPerfectScrollbar" [perfectScrollbar]><router-outlet></router-outlet></div>',
  styles: [`
    #app-wrapper {
      position: relative;
      height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {


  @ViewChild('appWrapper')
  appWrapper: PerfectScrollbarDirective;

  constructor(
    private router: Router,
    private oauthService: LoginService
  ) { }

  ngOnInit() {
    const self = this;

    // Config oauth
    self.oauthService.configure(authConfig);
    self.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)).subscribe((evt) => {
      window.scrollTo(0, 0);
      self.appWrapper.scrollToTop();
    });
  }
}
