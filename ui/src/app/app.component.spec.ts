import { AppComponent } from './app.component';
import { appImports, appProviders } from './shared/testing';
import { authConfig } from './shared/config';
import { LoginService } from './login/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('SecureSKYE', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule,
                PerfectScrollbarModule
            ],
            declarations: [AppComponent],

            providers: appProviders
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.autoDetectChanges();
    });

    it('Login (oauth2) service is configured', () => {
        // Tests
        const loginService: LoginService = TestBed.get(LoginService);
        expect(loginService.oidc).toEqual(authConfig.oidc);
        expect(loginService.tokenEndpoint).toEqual(authConfig.tokenEndpoint);
        expect(loginService.userinfoEndpoint).toEqual(authConfig.userinfoEndpoint);
        expect(loginService.redirectUri).toEqual(authConfig.redirectUri);
        expect(loginService.clientId).toEqual(authConfig.clientId);
        expect(loginService.dummyClientSecret).toEqual(authConfig.dummyClientSecret);
        expect(loginService.scope).toEqual(authConfig.scope);
        expect(loginService.customQueryParams).toEqual(authConfig.customQueryParams);
    });
});
