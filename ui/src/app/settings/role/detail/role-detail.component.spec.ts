import { async, ComponentFixture, TestBed, tick, fakeAsync, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoleDetailComponent } from './role-detail.component';
import { appImports, appProviders, encode } from '../../../shared/testing';
import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';
import { user } from '../../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { EmptyParentComponent } from '../../../shared/layout';
import { BehaviorSubject, from, of } from 'rxjs';
import { ENOTCONN } from 'constants';
import { filter } from 'rxjs/operators';
import { GlobalDialogService } from '../../../shared/service';

describe('RoleDetailComponent', () => {
    let component: RoleDetailComponent;
    let fixture: ComponentFixture<RoleDetailComponent>;
    let httpMock: HttpTestingController;
    let router: Router;
    let route: {
        params: BehaviorSubject<{ roleId: string }>
    };
    const authorities = user.admin.AuthorityListProto.create({
        data: ['admin:read', 'admin:create', 'admin:update', 'admin:delete', 'user:read', 'user:update']
            .map((auth, index) => user.admin.AuthorityProto.create({
                authority: auth,
                description: `${auth} auth`,
                id: `${index}`
            }))
    });
    const roleAdmin = user.admin.RoleProto.create({
        authorities: authorities.data.slice(0, 4),
        id: '3ce6805d-fcb4-435d-bd0a-4e27f4a58721',
        name: 'admin'
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule
            ],
            declarations: [RoleDetailComponent],
            providers: [
                ...appProviders,
                {
                    provide: ActivatedRoute, // mock activated route for component
                    useValue: {
                        params: new BehaviorSubject<any>({})
                    }
                },
                {
                    provide: GlobalDialogService, // mock global dialog service
                    useValue: {
                        delete(id: string) {
                            return of(true);
                        }
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
        fixture = TestBed.createComponent(RoleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Mockup data
        httpMock.expectOne('/api/users/authorities').flush(encode(user.admin.AuthorityListProto, authorities));
    });

    afterEach(() => httpMock.verify());

    it('Authorities map is loaded successfully', () => {
        route.params.next({ roleId: undefined });

        expect(component.authoritiesList).toEqual(authorities.data);
        expect(component.moduleList[0].name).toEqual('admin');
        expect(component.moduleList[1].name).toEqual('user');
        expect(component.scopeList).toEqual(['read', 'create', 'update', 'delete']);
    });

    it('Role data is loaded successfully', () => {
        route.params.next({ roleId: roleAdmin.id });
        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));

        expect(component.role).toEqual(roleAdmin);
    });

    it('Role name is invalid when empty', () => {
        route.params.next({ roleId: undefined });

        expect(component.roleForm.get('name').invalid).toBeTruthy();
    });

    it('Role name is valid when has value', () => {
        route.params.next({ roleId: undefined });

        component.roleForm.get('name').setValue('admin');
        expect(component.roleForm.get('name').valid).toBeTruthy();
    });

    it('Add all availalbe authorities and update successfully', () => {
        route.params.next({ roleId: roleAdmin.id });
        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));

        // Set all available authorities to true
        from(Object.keys(component.roleForm.controls))
            .pipe(filter((controlName) => /^.+:.+$/.test(controlName)))
            .subscribe((authorityName) => component.roleForm.get(authorityName).setValue(true));

        // Update
        component.updateRole();
        httpMock.expectOne((req) => {
            expect(req.body).toEqual(user.admin.RoleProto.create({
                authorities: authorities.data,
                name: 'admin'
            }));
            return req.method === 'PATCH' && req.url === `/api/users/roles/${roleAdmin.id}`;
        });
    });

    it('Remove all availalbe authorities and update successfully', () => {
        route.params.next({ roleId: roleAdmin.id });
        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));

        // Set all available authorities to true
        from(Object.keys(component.roleForm.controls))
            .pipe(filter((controlName) => /^.+:.+$/.test(controlName)))
            .subscribe((authorityName) => component.roleForm.get(authorityName).setValue(false));

        // Update
        component.updateRole();
        httpMock.expectOne((req) => {
            expect(req.body).toEqual(user.admin.RoleProto.create({
                name: 'admin'
            }));
            return req.method === 'PATCH' && req.url === `/api/users/roles/${roleAdmin.id}`;
        });
    });

    it('Create new role successfully', () => {
        route.params.next({ roleId: undefined });

        // Set all available authorities to true
        component.roleForm.get('name').setValue('myrole');
        from(Object.keys(component.roleForm.controls))
            .pipe(filter((controlName) => /^.+:.+$/.test(controlName)))
            .subscribe((authorityName) => component.roleForm.get(authorityName).setValue(true));

        // Update
        component.addRole();
        httpMock.expectOne((req) => {
            expect(req.body).toEqual(user.admin.RoleProto.create({
                authorities: authorities.data,
                name: 'myrole'
            }));
            return req.method === 'POST' && req.url === `/api/users/roles`;
        });
    });

    it('Delete role successfully', () => {
        route.params.next({ roleId: roleAdmin.id });
        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));

        // Update
        component.deleteRole();
        httpMock.expectOne({
            method: 'DELETE',
            url: `/api/users/roles/${roleAdmin.id}`
        });
        expect(true).toBeTruthy();
    });
});
