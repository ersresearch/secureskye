import { appImports } from '../shared/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorComponent', () => {
    let fixture: ComponentFixture<ErrorComponent>;
    let router: Router;

    let route: {
        data: BehaviorSubject<any>,
        queryParams: BehaviorSubject<any>
    };
    const error403 = {
        errorCode: '403',
        errorPrimary: 'Forbidden',
        errorSecondary: 'Insufficient privileges to access this resource.'
    };
    const queryParamsReturnUrl = {
        prevUrl: '/home'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule
            ],
            declarations: [ErrorComponent],
            providers: [
                {
                    provide: ActivatedRoute, // mock activated route for component
                    useValue: {
                        data: new BehaviorSubject<any>({}),
                        queryParams: new BehaviorSubject<any>({})
                    }
                },
            ]
        });
        fixture = TestBed.createComponent(ErrorComponent);
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('403 Error with correct code, primary message and secondary message', () => {
        route.data.next(error403);

        fixture.detectChanges();

        // Tests
        const errorCodeElement = fixture.debugElement.query(By.css('#errorCode'));
        expect(errorCodeElement.nativeElement.textContent).toEqual(error403.errorCode);
        const errorPrimary = fixture.debugElement.query(By.css('#errorPrimary'));
        expect(errorPrimary.nativeElement.textContent).toEqual(error403.errorPrimary);
        const errorSecondary = fixture.debugElement.query(By.css('#errorSecondary'));
        expect(errorSecondary.nativeElement.textContent).toEqual(error403.errorSecondary);
    });

    it(`Error page with no previous url will return to '/'`, () => {
        route.queryParams.next({});

        fixture.detectChanges();

        // Tests
        const button = fixture.debugElement.query(By.css('#btnGoHome'));
        expect(button).toBeDefined();
        expect(button.nativeElement.getAttribute('href')).toEqual('/');
    });

    it(`Error page with previous url will return to it`, () => {
        route.queryParams.next(queryParamsReturnUrl);

        fixture.detectChanges();

        // Tests
        const button = fixture.debugElement.query(By.css('#btnGoBack'));
        expect(button).toBeDefined();
        expect(button.nativeElement.getAttribute('href')).toEqual(queryParamsReturnUrl.prevUrl);
    });
});
