import { RoleService } from './role.service';
import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { appImports, appProviders, encode } from '../../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http';
import { user } from '../../shared/model';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('RoleService', () => {
    let service: RoleService;
    let httpMock: HttpTestingController;

    const roleAdmin = user.admin.RoleProto.create({
        authorities: [
            user.admin.AuthorityProto.create({
                authority: 'all',
                description: 'all',
                id: 'aca84269-0289-42a8-9fba-c6d2dd34fc2b'
            })
        ],
        id: '3ce6805d-fcb4-435d-bd0a-4e27f4a58721',
        name: 'admin'
    });
    const roleGuest = user.admin.RoleProto.create({
        authorities: [
            user.admin.AuthorityProto.create({
                authority: 'none',
                description: 'none',
                id: '125a7878-d08b-46c6-9739-64afc2cb39e0'
            })
        ],
        id: '125a7878-d08b-46c6-9739-64afc2cb39e0',
        name: 'guest'
    });
    const roleData = user.admin.RoleSetProto.create({
        data: [roleAdmin, roleGuest]
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: appProviders
        }).compileComponents();
        service = TestBed.get(RoleService);
        httpMock = TestBed.get(HttpTestingController);
    }));

    afterEach(() => httpMock.verify());

    it('#getAllRoles() return no data', async(() => {
        service.getAllRoles().subscribe((data) => expect(data).toEqual(user.admin.RoleSetProto.create()));

        httpMock.expectOne('/api/users/roles').flush(encode(user.admin.RoleSetProto, {}));
    }));

    it('#getAllRoles() return 2 records', async(() => {
        service.getAllRoles().subscribe((data) => expect(data).toEqual(roleData));

        httpMock.expectOne('/api/users/roles').flush(encode(user.admin.RoleSetProto, roleData));
    }));

    it('#getRole() return data successfully', async(() => {
        service.getRole(roleAdmin.id).subscribe((data) => expect(data).toEqual(roleAdmin));

        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));
    }));

    it('#addRole() return data successfully', async(() => {
        service.addRole(roleAdmin).subscribe((data) => expect(data).toEqual(roleAdmin));

        httpMock.expectOne({
            method: 'POST',
            url: '/api/users/roles'
        }).flush(encode(user.admin.RoleProto, roleAdmin));
    }));

    it('#updateRole() return data successfully', async(() => {
        service.updateRole(roleAdmin.id, roleAdmin).subscribe((data) => expect(data).toEqual(roleAdmin));

        httpMock.expectOne({
            method: 'PATCH',
            url: `/api/users/roles/${roleAdmin.id}`
        }).flush(encode(user.admin.RoleProto, roleAdmin));
    }));

    it('#deleteRole() return successfully', async(() => {
        service.deleteRole(roleAdmin.id).subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne({
            method: 'DELETE',
            url: `/api/users/roles/${roleAdmin.id}`
        }).flush(null);
    }));

    it('#colorAuthority() switch case', async(() => {
        expect(service.colorAuthority(user.admin.AuthorityProto.create({ authority: 'data:read' }))).toEqual('primary');
        expect(service.colorAuthority(user.admin.AuthorityProto.create({ authority: 'data:create' }))).toEqual('success');
        expect(service.colorAuthority(user.admin.AuthorityProto.create({ authority: 'data:update' }))).toEqual('warning');
        expect(service.colorAuthority(user.admin.AuthorityProto.create({ authority: 'data:delete' }))).toEqual('danger');
        expect(service.colorAuthority(user.admin.AuthorityProto.create({ authority: 'other' }))).toEqual('secondary');
    }));

    it('#getListUserAuthorities() return no data', async(() => {
        service.getListUserAuthorities().subscribe((data) => expect(data).toEqual(user.admin.AuthorityListProto.create()));

        httpMock.expectOne('/api/users/authorities').flush(encode(user.admin.RoleSetProto, {}));
    }));

    it('#getListUserAuthorities() return 2 records', async(() => {
        const authoritiesData = user.admin.AuthorityListProto.create({
            data: [
                user.admin.AuthorityProto.create({
                    authority: 'all',
                    description: 'all',
                    id: 'aca84269-0289-42a8-9fba-c6d2dd34fc2b'
                }),
                user.admin.AuthorityProto.create({
                    authority: 'none',
                    description: 'none',
                    id: '125a7878-d08b-46c6-9739-64afc2cb39e0'
                })
            ]
        });
        service.getListUserAuthorities().subscribe((data) => expect(data).toEqual(authoritiesData));

        httpMock.expectOne('/api/users/authorities').flush(encode(user.admin.AuthorityListProto, authoritiesData));
    }));

    it('#resolve() return data successfully', async(() => {
        const routeSnapshot = new ActivatedRouteSnapshot();
        routeSnapshot.params = { roleId: roleAdmin.id };
        service.resolve(routeSnapshot, undefined).subscribe((data) => expect(data).toEqual(roleAdmin));

        httpMock.expectOne(`/api/users/roles/${roleAdmin.id}`).flush(encode(user.admin.RoleProto, roleAdmin));
    }));
});
