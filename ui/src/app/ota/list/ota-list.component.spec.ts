import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OtaListComponent } from './ota-list.component';
import { appImports, appProviders, encode } from '../../shared/testing';
import { PaginationModule, PaginationComponent } from 'ngx-bootstrap';
import { BreadcrumbsSwitchService } from '../../shared/service';
import { first } from 'rxjs/operators';
import { BreadcrumbSwitchLink, ota } from '../../shared/model';
import { Router } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { EmptyParentComponent } from '../../shared/layout';

describe('OtaListComponent', () => {
  let component: OtaListComponent;
  let fixture: ComponentFixture<OtaListComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  const otaData: ota.vehicle.IMetadataProto[] = [];
  for (let i = 0; i < 10; i++) {
    otaData.push(ota.vehicle.MetadataProto.create({
      id: `ota-${i}`,
      family: 'test',
      updateType: 'test',
      version: `${i}.0`,
      ecus: [
        ota.vehicle.EcuProto.create({
          id: `ecu-${Math.round(Math.random() * 1000)}`,
          version: `${i}.0`,
          description: 'test',
          images: [
            ota.vehicle.ImageProto.create({
              id: `image-${Math.round(Math.random() * 1000)}`,
              checksum: '1',
              name: 'test',
              url: 'path/to/test'
            })
          ]
        })
      ]
    }));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...appImports,
        RouterTestingModule.withRoutes([
          {
            path: ':otaId',
            component: EmptyParentComponent
          }
        ]),
        PaginationModule.forRoot()
      ],
      declarations: [OtaListComponent],
      providers: appProviders
    }).compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(OtaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Quick nav item '/ota/upload' is created`, () => {
    // Tests
    const breadcrumbsSwitchService: BreadcrumbsSwitchService = TestBed.get(BreadcrumbsSwitchService);
    breadcrumbsSwitchService.switchLinks.pipe(first()).subscribe((links) => {
      expect(links[0]).toEqual(BreadcrumbSwitchLink.create('Upload', false, 'fa fa-cloud-upload', ['/ota/upload']));
    });
  });

  it('OTA list of 10 records loaded with pagination', () => {
    // Mockup data
    httpMock
      .expectOne('/api/ota/metadata')
      .flush(encode(ota.vehicle.MetadataListProto, { data: otaData }));
    fixture.detectChanges();

    // Tests
    expect(component.archives.length).toEqual(10);
    expect(component.archives).toEqual(otaData);
    // Pagination tests
    const paginationComp = fixture.debugElement.query(By.directive(PaginationComponent)).componentInstance as PaginationComponent;
    expect(paginationComp.totalItems).toEqual(10);
    expect(paginationComp.totalPages).toEqual(2);
  });

  it('OTA data is displayed with correct info', () => {
    // Mockup data
    httpMock
      .expectOne('/api/ota/metadata')
      .flush(encode(ota.vehicle.MetadataListProto, { data: [otaData[0]] }));
    fixture.detectChanges();

    const familyTd = fixture.debugElement.query(By.css('td.family'));
    expect(familyTd.nativeElement.textContent).toEqual(otaData[0].family);
    const versionTd = fixture.debugElement.query(By.css('td.version'));
    expect(versionTd.nativeElement.textContent).toEqual(otaData[0].version);
    const updateTypeTd = fixture.debugElement.query(By.css('td.updateType'));
    expect(updateTypeTd.nativeElement.textContent).toEqual(otaData[0].updateType);
  });

  it(`OTA archive view command is navigable to '/ota/:id'`, async(() => {
    // Mockup data
    httpMock
      .expectOne('/api/ota/metadata')
      .flush(encode(ota.vehicle.MetadataListProto, { data: [otaData[0]] }));
    fixture.detectChanges();

    // Tests
    const viewDetailAnchor = fixture.debugElement.query(By.css('.btn.btn-secondary[href]'));
    viewDetailAnchor.nativeElement.click();
    fixture.whenStable().then(() => expect(router.routerState.snapshot.url).toBe(`/${otaData[0].id}`));
  }));
});
