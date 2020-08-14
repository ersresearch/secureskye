import { appImports, appProviders, encode } from '../shared/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { EmptyParentComponent } from '../shared/layout';
import { HttpTestingController } from '@angular/common/http/testing';
import { OtaService } from '../ota/ota.service';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './dashboard-routing.module';
import { user, vehicle, ota } from '../shared/model';
import { UserService } from '../settings/user/user.service';
import { VehicleService } from '../vehicle/vehicle.service';
import * as Long from 'long';

describe('DashboardComponent Routing', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [DashboardComponent],
            providers: appProviders
        }).compileComponents();
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(DashboardComponent);
    });

    it(`Route '/' is accessible`, async(() => {
        router.navigate(['']);
        // Tests
        fixture.whenStable().then(() => {
            expect(router.routerState.snapshot.url).toEqual('/');
        });
    }));
});
