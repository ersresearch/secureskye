import { appImports, appProviders, encode } from '../../shared/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from '../../shared/component/breadcrumbs.component';
import { BreadcrumbsSwitchService } from '../../shared/service';
import { BreadcrumbSwitchLink, vehicle } from '../../shared/model';
import { By } from '@angular/platform-browser';
import { EmptyParentComponent } from '../../shared/layout';
import { first } from 'rxjs/operators';
import { HttpTestingController } from '@angular/common/http/testing';
import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../vehicle.service';

describe('VehicleListComponent', () => {
    let component: VehicleListComponent;
    let fixture: ComponentFixture<VehicleListComponent>;
    let httpMock: HttpTestingController;
    let router: Router;
    const vehicleData = [
        { id: '1', modelId: '1', modelName: 'Test Model 1', name: 'Test Vehicle 1' },
        { id: '2', modelId: '1', modelName: 'Test Model 1', name: 'Test Vehicle 2' },
        { id: '3', modelId: '1', modelName: 'Test Model 1', name: 'Test Vehicle 3' },
        { id: '4', modelId: '2', modelName: 'Test Model 2', name: 'Test Vehicle 4' },
        { id: '5', modelId: '2', modelName: 'Test Model 2', name: 'Test Vehicle 5' },
        { id: '6', modelId: '3', modelName: 'Test Model 3', name: 'Test Vehicle 6' },
        { id: '7', modelId: '4', modelName: 'Test Model 4', name: 'Test Vehicle 7' },
        { id: '8', modelId: '4', modelName: 'Test Model 4', name: 'Test Vehicle 8' },
        { id: '9', modelId: '4', modelName: 'Test Model 4', name: 'Test Vehicle 9' },
        { id: '10', modelId: '4', modelName: 'Test Model 4', name: 'Test Vehicle 10' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                RouterTestingModule.withRoutes([
                    {
                        path: 'vehicle',
                        component: VehicleListComponent,
                        children: [
                            {
                                path: ':id',
                                component: EmptyParentComponent
                            }
                        ]
                    },
                    {
                        path: ':id',
                        component: EmptyParentComponent
                    }
                ]),
                PaginationModule.forRoot()
            ],
            declarations: [VehicleListComponent],
            providers: appProviders
        }).compileComponents();
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(VehicleListComponent);
        component = fixture.componentInstance;

        fixture.autoDetectChanges();
    });

    it(`Quick nav item '/settings/vehicle/model' is created`, async(() => {
        // Tests
        const breadcrumbsSwitchService: BreadcrumbsSwitchService = TestBed.get(BreadcrumbsSwitchService);
        breadcrumbsSwitchService.switchLinks.pipe(first()).subscribe((links) => {
            expect(links[0]).toEqual(BreadcrumbSwitchLink.create('Vehicle Model', false, 'fa fa-cubes', ['/settings', 'vehicle', 'model']));
        });
    }));

    it('Vehicle list of 10 records loaded with pagination', () => {
        // Mockup data
        httpMock
            .expectOne('/api/vehicles')
            .flush(encode(vehicle.admin.VehicleListProto, { data: vehicleData }));
        fixture.detectChanges();

        // Tests
        expect(component.items.data.length).toEqual(10);
        vehicleData
            .map(value => vehicle.admin.VehicleProto.create(value))
            .forEach((value, index) => expect(component.items.data[index]).toEqual(value));
        // Pagination tests
        const paginationComp = fixture.debugElement.query(By.directive(PaginationComponent)).componentInstance as PaginationComponent;
        expect(paginationComp.totalItems).toEqual(10);
        expect(paginationComp.totalPages).toEqual(2);
    });

    it('Vehicle data is displayed with correct info', () => {
        // Mockup data
        httpMock
            .expectOne('/api/vehicles')
            .flush(encode(vehicle.admin.VehicleListProto, { data: [vehicleData[0]] }));
        fixture.detectChanges();

        const vehicleNameTd = fixture.debugElement.query(By.css('td.vehicle-name'));
        expect(vehicleNameTd.nativeElement.textContent).toEqual(vehicleData[0].name);
        const vehicleModelTd = fixture.debugElement.query(By.css('td.vehicle-model'));
        expect(vehicleModelTd.nativeElement.textContent).toEqual(vehicleData[0].modelName);
    });

    it(`Vehicle view command is navigable to '/vehicle/:id'`, async(() => {
        // Mockup data
        httpMock
            .expectOne('/api/vehicles')
            .flush(encode(vehicle.admin.VehicleListProto, { data: [vehicleData[0]] }));
        fixture.detectChanges();

        // Tests
        const viewDetailAnchor = fixture.debugElement.query(By.css('.btn.btn-secondary[href]'));
        viewDetailAnchor.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe(`/${vehicleData[0].id}`));
    }));

    it(`Button 'Register' navigable to '/vehicle/register'`, async(() => {
        // Tests
        const registerButton = fixture.debugElement.query(By.css('.btn.btn-primary'));
        registerButton.nativeElement.click();
        fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe(`/register`));
    }));
});
