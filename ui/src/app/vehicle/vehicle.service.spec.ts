import { VehicleService } from './vehicle.service';
import { async, TestBed } from '@angular/core/testing';
import { appImports, appProviders, encode } from '../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { vehicle, totp } from '../shared/model';

describe('VehicleService', () => {
    let service: VehicleService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: appProviders
        }).compileComponents();
        service = TestBed.get(VehicleService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it(`#getListVehicles() return no data`, async(() => {
        service.getListVehicles().subscribe((resp) => {
            expect(resp.data).toEqual([]);
        });

        httpMock
            .expectOne('/api/vehicles')
            .flush(encode(vehicle.admin.VehicleListProto, { data: [] }));
    }));

    it(`#getListVehicles() return 2 records`, async(() => {
        const respData = [
            vehicle.admin.VehicleProto.create({
                id: '1',
                modelId: '1',
                modelName: 'Test Model',
                name: 'Test Vehicle',
                tfa: totp.TwoFactorAuthenticationStatusProto.DISABLED
            }),
            vehicle.admin.VehicleProto.create({
                id: '2',
                modelId: '1',
                modelName: 'Test Model',
                name: 'Test Vehicle 2',
                tfa: totp.TwoFactorAuthenticationStatusProto.PENDING
            })
        ];

        service.getListVehicles().subscribe((resp) => {
            expect(resp.data).toEqual(respData);
        });

        httpMock
            .expectOne('/api/vehicles')
            .flush(encode(vehicle.admin.VehicleListProto, { data: respData }));
    }));
});
