import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoleListComponent } from './role-list.component';
import { appImports, appProviders, encode } from '../../../shared/testing';
import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';
import { user } from '../../../shared/model';
import { Router } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { EmptyParentComponent } from '../../../shared/layout';

describe('RoleListComponent', () => {
    let component: RoleListComponent;
    let fixture: ComponentFixture<RoleListComponent>;
    let httpMock: HttpTestingController;
    let router: Router;

    const roleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => user.admin.RoleProto.create({
        authorities: [1, 2, 3].map((authIndex) => user.admin.AuthorityProto.create({
            authority: `authority-${authIndex}`,
            description: `authority-${authIndex}`,
            id: `${authIndex}`
        })),
        id: `${index}`,
        name: `role-${index}`
    }));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes([
                    {
                        path: ':roldId',
                        component: EmptyParentComponent
                    }
                ]),
                PaginationModule.forRoot()
            ],
            declarations: [RoleListComponent],
            providers: appProviders
        }).compileComponents();
    }));

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(RoleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Role list of 10 records loaded with pagination', () => {
        // Mockup data
        httpMock
            .expectOne('/api/users/roles')
            .flush(encode(user.admin.RoleSetProto, { data: roleData }));
        fixture.detectChanges();

        // Tests
        expect(component.items.length).toEqual(10);
        expect(component.items).toEqual(roleData);
        // Pagination tests
        const paginationComp = fixture.debugElement.query(By.directive(PaginationComponent)).componentInstance as PaginationComponent;
        expect(paginationComp.totalItems).toEqual(10);
        expect(paginationComp.totalPages).toEqual(2);
    });

    it('Role data is displayed with correct info', () => {
        // Mockup data
        httpMock
            .expectOne('/api/users/roles')
            .flush(encode(user.admin.RoleSetProto, { data: [roleData[0]] }));
        fixture.detectChanges();

        const roleNameTd = fixture.debugElement.query(By.css('td.role-name'));
        expect(roleNameTd.nativeElement.textContent).toEqual(roleData[0].name);
        const authoritiesSpans = fixture.debugElement.queryAll(By.css('td.authorities > span'));
        authoritiesSpans.forEach((el, index) => expect(el.nativeElement.textContent).toEqual(roleData[0].authorities[index].authority));
    });

    it(`OTA archive view command is navigable to '/roles/:id'`, async(() => {
        // Mockup data
        httpMock
            .expectOne('/api/users/roles')
            .flush(encode(user.admin.RoleSetProto, { data: [roleData[0]] }));
        fixture.detectChanges();

        // Tests
        const viewDetailAnchor = fixture.debugElement.query(By.css('.btn.btn-secondary[href]'));
        viewDetailAnchor.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe(`/${roleData[0].id}`));
    }));
});
