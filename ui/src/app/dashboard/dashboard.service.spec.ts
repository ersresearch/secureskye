import { DashboardService } from './dashboard.service';
import { appImports, appProviders, encode } from '../shared/testing';
import { Testability } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { VehicleService } from '../vehicle/vehicle.service';
import { vehicle, user, ota } from '../shared/model';
import * as Long from 'long';

describe('DashboardSerivce', () => {
    let service: DashboardService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: appProviders
        });
        service = TestBed.get(DashboardService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('#getUserStastistics', () => {
        service.getUserStastistics().subscribe((resp) => {
            expect(resp.memberCount.toNumber()).toEqual(1000);
        });

        httpMock
            .expectOne('/api/users/statistics')
            .flush(encode(user.admin.UserStatisticsProto, { memberCount: Long.fromNumber(1000) }));
    });

    it('#getVehicleStatistics', () => {
        service.getVehicleStatistics().subscribe((resp) => {
            expect(resp.modelCount.toNumber()).toEqual(1000);
            expect(resp.vehicleCount.toNumber()).toEqual(1000);
        });

        httpMock
            .expectOne('/api/vehicles/statistics')
            .flush(encode(vehicle.admin.VehicleStatisticsProto, { modelCount: Long.fromNumber(1000), vehicleCount: Long.fromNumber(1000) }));
    });

    it('#getImageArchiveStatistics', () => {
        service.getImageArchiveStatistics().subscribe((resp) => {
            expect(resp.imageArchiveCount.toNumber()).toEqual(1000);
        });

        httpMock
            .expectOne('/api/ota/statistics')
            .flush(encode(ota.vehicle.ImageArchiveStatisticsProto, { imageArchiveCount: Long.fromNumber(1000) }));
    });

});
