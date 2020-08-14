import { UserListComponent } from './user-list.component';
import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { appImports, appProviders, encode } from '../../../shared/testing';
import { first } from 'rxjs/operators';
import { BreadcrumbSwitchLink, user, totp } from '../../../shared/model';
import { BreadcrumbsSwitchService } from '../../../shared/service';
import { EmptyParentComponent } from '../../../shared/layout';
import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let httpMock: HttpTestingController;
    let router: Router;

    const userData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) =>
        user.admin.CredentialProto.create({
            avatar: undefined,
            avatarFormat: undefined,
            avatarThirdParty: false,
            displayName: `user ${index}`,
            email: `user${index}@trilliumsecure.com`,
            enabled: true,
            firstName: 'I',
            id: `178b3e66-3db9-4ac4-b08d-bc4f8cd1a7ff-${index}`,
            lastName: `User${index}`,
            middleName: 'Am',
            name: `user${index}`,
            password: 'no',
            roles: [
                user.admin.RoleProto.create({
                    authorities: [
                        user.admin.AuthorityProto.create({
                            authority: 'all',
                            description: 'all',
                            id: 'aca84269-0289-42a8-9fba-c6d2dd34fc2b'
                        })
                    ],
                    id: '3ce6805d-fcb4-435d-bd0a-4e27f4a58721',
                    name: 'user'
                })
            ],
            tfa: totp.TwoFactorAuthenticationStatusProto.DISABLED,
            version: 1
        })
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes([
                    {
                        path: ':roleId',
                        component: EmptyParentComponent
                    }
                ]),
                PaginationModule.forRoot(),
                AvatarModule
            ],
            declarations: [UserListComponent],
            providers: appProviders
        }).compileComponents();
    }));

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`Quick nav item '/settings/user/role' is created`, () => {
        // Tests
        const breadcrumbsSwitchService: BreadcrumbsSwitchService = TestBed.get(BreadcrumbsSwitchService);
        breadcrumbsSwitchService.switchLinks.pipe(first()).subscribe((links) => {
            expect(links[0]).toEqual(
                BreadcrumbSwitchLink.create('Role Management', false, 'fa fa-user-circle', ['/settings', 'user', 'role'])
            );
        });
    });

    it('User list of 10 records loaded with pagination', () => {
        // Mockup data
        httpMock
            .expectOne('/api/users')
            .flush(encode(user.admin.CredentialListProto, { data: userData }));
        fixture.detectChanges();

        // Tests
        component.items.forEach((item, index) => {
            expect(item.id).toEqual(userData[index].id);
        });
        // Pagination tests
        const paginationComp = fixture.debugElement.query(By.directive(PaginationComponent)).componentInstance as PaginationComponent;
        expect(paginationComp.totalItems).toEqual(10);
        expect(paginationComp.totalPages).toEqual(2);
    });

    it('User data is displayed with correct info', () => {
        // Mockup data
        httpMock
            .expectOne('/api/users')
            .flush(encode(user.admin.CredentialListProto, { data: [userData[0]] }));
        fixture.detectChanges();

        const usernameTd = fixture.debugElement.query(By.css('td.user-name'));
        expect(usernameTd.nativeElement.textContent).toEqual(userData[0].displayName);
        const emailTd = fixture.debugElement.query(By.css('td.email'));
        expect(emailTd.nativeElement.textContent).toEqual(userData[0].email);
        const firstNameTd = fixture.debugElement.query(By.css('td.first-name'));
        expect(firstNameTd.nativeElement.textContent).toEqual(userData[0].firstName);
        const middleNameTd = fixture.debugElement.query(By.css('td.middle-name'));
        expect(middleNameTd.nativeElement.textContent).toEqual(userData[0].middleName);
        const lastNameTd = fixture.debugElement.query(By.css('td.last-name'));
        expect(lastNameTd.nativeElement.textContent).toEqual(userData[0].lastName);
    });

    it(`User view command is navigable to '/settings/user/:userId'`, async(() => {
        // Mockup data
        httpMock
            .expectOne('/api/users')
            .flush(encode(user.admin.CredentialListProto, { data: [userData[0]] }));
        fixture.detectChanges();

        // Tests
        const viewDetailAnchor = fixture.debugElement.query(By.css('.btn.btn-secondary[href]'));
        viewDetailAnchor.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe(`/${userData[0].id}`));
    }));
});
