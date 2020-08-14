import { appImports, appProviders, encode } from '../shared/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { EmptyParentComponent } from '../shared/layout';
import { HttpTestingController } from '@angular/common/http/testing';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { user, vehicle, ota } from '../shared/model';
import * as Long from 'long';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes([
                    {
                        path: '',
                        pathMatch: 'full',
                        component: DashboardComponent
                    },
                    {
                        path: 'vehicle',
                        pathMatch: 'full',
                        component: EmptyParentComponent
                    },
                    {
                        path: 'settings/vehicle/model',
                        pathMatch: 'full',
                        component: EmptyParentComponent
                    },
                    {
                        path: 'settings/user',
                        pathMatch: 'full',
                        component: EmptyParentComponent
                    },
                    {
                        path: 'ota',
                        pathMatch: 'full',
                        component: EmptyParentComponent
                    }
                ])
            ],
            declarations: [DashboardComponent],
            providers: appProviders
        }).compileComponents();
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;

        fixture.autoDetectChanges();
    });

    it('Jumbotron is displayed when no statistics available', () => {
        // Tests
        const jumbotron = fixture.debugElement.query(By.css('.jumbotron'));
        expect(jumbotron).toBeDefined();
    });

    it(`Vehicle statistics (1000 vehices, 1000 models) retrieved and displayed, also navigable to '/vehicle'`, async(() => {
        // Mockup data
        httpMock
            .expectOne(`/api/vehicles/statistics`)
            .flush(encode(vehicle.admin.VehicleStatisticsProto, {
                modelCount: Long.fromNumber(1000),
                vehicleCount: Long.fromNumber(1000)
            }));
        fixture.detectChanges();

        // Tests
        const vehicleCountDiv = fixture.debugElement.query(By.css('#vehicleCount'));
        expect(vehicleCountDiv.nativeElement.textContent).toEqual('1,000');
        const vehicleModelCount = fixture.debugElement.query(By.css('#vehicleModelCount'));
        expect(vehicleModelCount.nativeElement.textContent).toEqual('1,000');
        const vehicleCountCard = fixture.debugElement.query(By.css('#vehicleCountCard'));
        vehicleCountCard.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe('/vehicle'));
    }));

    it(`User statistics (1000 members) retrieved and displayed, also navigable to '/settings/user'`, async(() => {
        // Mockup data
        httpMock
            .expectOne(`/api/users/statistics`)
            .flush(encode(user.admin.UserStatisticsProto, {
                memberCount: Long.fromNumber(1000)
            }));

        // DOM changes rendering
        fixture.detectChanges();

        // Tests
        const userCountDiv = fixture.debugElement.query(By.css('#userCount'));
        expect(userCountDiv.nativeElement.textContent).toEqual('1,000');
        const userCountCard = fixture.debugElement.query(By.css('#userCountCard'));
        userCountCard.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe('/settings/user'));
    }));

    it(`OTA statistics (1000 packages) retrieved and displayed, also navigable to '/ota'`, async(() => {
        // Mockup data
        httpMock
            .expectOne(`/api/ota/statistics`)
            .flush(encode(ota.vehicle.ImageArchiveStatisticsProto, {
                imageArchiveCount: Long.fromNumber(1000)
            }));

        // DOM changes rendering
        fixture.detectChanges();

        // Tests
        const imageArchiveCountDiv = fixture.debugElement.query(By.css('#imageArchiveCount'));
        expect(imageArchiveCountDiv.nativeElement.textContent).toEqual('1,000');
        const imageArchiveCountCard = fixture.debugElement.query(By.css('#imageArchiveCountCard'));
        imageArchiveCountCard.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe('/ota'));
    }));
});
