import { appImports, appProviders, encode } from '../shared/testing';
import { async, TestBed } from '@angular/core/testing';
import { filter, delay } from 'rxjs/operators';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router, ResolveStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './vehicle-routing.module';
import { vehicle } from '../shared/model';
import { VehicleModule } from './vehicle.module';

describe('VehicleRoutingModule', () => {
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes(routes),
                VehicleModule
            ],
            providers: appProviders,
        }).compileComponents();
        router = TestBed.get(Router);
        httpMock = TestBed.get(HttpTestingController);

        // Mockup data provided for route data resovler.
        router.events.pipe(
            filter((e) => e instanceof ResolveStart),
            delay(100), // delay 100ms to ensure request has been made
        ).subscribe(() => {
            httpMock.match('/api/vehicles/1').forEach((req) =>
                req.flush(encode(vehicle.admin.VehicleProto, {
                    id: '1',
                    name: 'Test Vehicle'
                }))
            );
        });
    });

    it(`'/' is accessible`, async(() => {
        router.navigate(['/']).then(() => expect(router.routerState.snapshot.url).toEqual('/'));
    }));

    it(`'/register' is accessible`, async(() => {
        router.navigate(['/register']).then(() => expect(router.routerState.snapshot.url).toEqual('/register'));
    }));

    it(`'/:vehicleId' is accessible`, async(() => {
        router.navigate(['1']).then(() => expect(router.routerState.snapshot.url).toEqual('/1'));
    }));

    it(`'/:vehicleId/monitoring' is accessible`, async(() => {
        router.navigate(['/1/monitoring']).then(() => expect(router.routerState.snapshot.url).toEqual('/1/monitoring'));
    }));

    it(`'/:vehicleId/route' is accessible`, async(() => {
        router.navigate(['/1/route']).then(() => expect(router.routerState.snapshot.url).toEqual('/1/route'));
    }));

    it(`'/:vehicleId/route/:routeId/detail' is accessible`, async(() => {
        router.navigate(['/1/route/1/detail']).then(() => expect(router.routerState.snapshot.url).toEqual('/1/route/1/detail'));
    }));
});
