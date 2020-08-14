import { appImports } from '../shared/testing';
import { ErrorModule } from './error.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './error-routing.module';
import { TestBed, async } from '@angular/core/testing';

describe('ErrorRoutingModule', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes(routes),
                ErrorModule
            ]
        });
        router = TestBed.get(Router);
    });

    it(`'/403' is accessible`, async(() => {
        router.navigate(['/403']).then(() => expect(router.routerState.snapshot.url).toEqual('/403'));
    }));
});
