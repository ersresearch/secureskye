import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailComponent } from './vehicle-detail.component';
import { appImports, appProviders, encode } from '../../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { vehicle, totp } from '../../shared/model';
import { GlobalDialogService } from '../../shared/service';
import { GlobalDialogComponent } from '../../shared/component';

describe('VehicleDetailComponent', () => {
    let component: VehicleDetailComponent;
    let fixture: ComponentFixture<VehicleDetailComponent>;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule
            ],
            declarations: [VehicleDetailComponent],
            providers: appProviders
        }).compileComponents();
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(VehicleDetailComponent);
        component = fixture.componentInstance;

        fixture.autoDetectChanges();
    });

    it('Vehicle form is invalid when initialized', () => {
        expect(component.vehicleForm.valid).toBeFalsy();
    });

    it('Vehicle name validity', () => {
        const control = component.vehicleForm.get('vehicleName');
        expect(control.valid).toBeFalsy();
        control.setValue('Sample Vehicle');
        expect(control.valid).toBeTruthy();
    });

    it('Vehicle model validity', () => {
        // Mockup data
        httpMock
            .expectOne('/api/vehicles/models')
            .flush(encode(vehicle.admin.VehicleModelListProto, {
                model: [{ id: '1', name: 'Test Model', }]
            }));
        fixture.detectChanges();

        const control = component.vehicleForm.get('vehicleModel');
        expect(control.valid).toBeFalsy();
        control.setValue('1');
        expect(control.valid).toBeTruthy();
    })

    it(`Vehicle registration succeed then display vehicle's clientID in modal dialog`, async(() => {
        // Mockup data
        httpMock
            .expectOne({ method: 'GET', url: '/api/vehicles/models' })
            .flush(encode(vehicle.admin.VehicleModelListProto, {
                model: [{ id: '1', name: 'Test Model', }]
            }));
        fixture.detectChanges();

        component.vehicleForm.setValue({
            vehicleName: 'Test Vehicle',
            vehicleModel: '1'
        });

        component.registerVehicle();

        // Mockup response
        httpMock
            .expectOne({ method: 'POST', url: '/api/vehicles' })
            .flush(encode(vehicle.admin.RegisteredVehicleProto, {
                clientId: 'vehicle-1'
            }));
        const globalDialogService = TestBed.get(GlobalDialogService) as GlobalDialogService;
        const dialogComponent = globalDialogService.getCurrentModal().content as GlobalDialogComponent;
        expect(dialogComponent).toBeDefined();
        expect(dialogComponent.dialog.content).toContain('vehicle-1');
    }));
});