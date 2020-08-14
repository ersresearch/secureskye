import { appImports } from '../shared/testing';
import { IxsModule } from './ixs.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './ixs-routing.module';
import { TestBed, async } from '@angular/core/testing';

describe('IXSRoutingModule', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes(routes),
                IxsModule
            ]
        });
        router = TestBed.get(Router);
    });

    it(`'/' is accessible`, async(() => {
        router.navigate(['/']).then(() => expect(router.routerState.snapshot.url).toEqual('/can-message'));
    }));

    it(`'/can-message' is accessible`, async(() => {
        router.navigate(['/can-message']).then(() => expect(router.routerState.snapshot.url).toEqual('/can-message'));
    }));
});
