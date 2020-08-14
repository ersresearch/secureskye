import { appImports } from '../shared/testing';
import { OtaModule } from './ota.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './ota-routing.module';
import { TestBed, async } from '@angular/core/testing';

describe('OtaRoutingModule', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes(routes),
                OtaModule
            ]
        });
        router = TestBed.get(Router);
    });

    it(`'/' is accessible`, async(() => {
        router.navigate(['/']).then(() => expect(router.routerState.snapshot.url).toEqual('/list'));
    }));

    it(`'/list' is accessible`, async(() => {
        router.navigate(['/list']).then(() => expect(router.routerState.snapshot.url).toEqual('/list'));
    }));

    it(`'/upload' is accessible`, async(() => {
        router.navigate(['/upload']).then(() => expect(router.routerState.snapshot.url).toEqual('/upload'));
    }));

    it(`'/:otaId' is accessible`, async(() => {
        router.navigate(['/c4f50eb7-4065-4291-9b7b-871d2386ac20']).then(() =>
            expect(router.routerState.snapshot.url).toEqual('/c4f50eb7-4065-4291-9b7b-871d2386ac20'));
    }));
});
