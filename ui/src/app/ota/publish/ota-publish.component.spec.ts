import { async, ComponentFixture, TestBed, } from '@angular/core/testing';

import { OtaPublishComponent } from './ota-publish.component';
import { appImports, appProviders, encode } from '../../shared/testing';
import { first } from 'rxjs/operators';
import { ota } from '../../shared/model';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TreeModule, TreeComponent, TreeNode } from 'angular-tree-component';
import { RouterTestingModule } from '@angular/router/testing';
import { FileSaverService } from '../../shared/service';

describe('OtaPublishComponent', () => {
  let component: OtaPublishComponent;
  let fixture: ComponentFixture<OtaPublishComponent>;
  let httpMock: HttpTestingController;
  let activatedRouteMock: { params: BehaviorSubject<any> };
  let fileSaverServiceObservable: BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>;

  const otaId = 'ota-1';
  const data = ota.vehicle.MetadataProto.create({
    id: otaId,
    family: 'test',
    updateType: 'test',
    version: '1.0',
    ecus: [
      ota.vehicle.EcuProto.create({
        id: `ecu-${Math.round(Math.random() * 1000)}`,
        version: '1.0',
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
  });

  beforeAll(() => {
    fileSaverServiceObservable = new BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>(undefined);
    fileSaverServiceObservable.pipe(first()).subscribe();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...appImports,
        RouterTestingModule,
        TreeModule
      ],
      declarations: [OtaPublishComponent],
      providers: [
        ...appProviders,
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<any>({})
          }
        },
        {
          provide: FileSaverService, // Mockup FileSaverService
          useValue: {
            save: (fileData: Blob, fileName: string = 'download', type?: string) => {
              fileSaverServiceObservable.next({
                fileData: fileData,
                fileName: fileName,
                type: type
              });
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(OtaPublishComponent);
    component = fixture.componentInstance;
    activatedRouteMock = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
    activatedRouteMock.params.next({
      otaId: otaId
    });
    httpMock.expectOne(`/api/ota/metadata/${otaId}`).flush(encode(ota.vehicle.MetadataProto, data));
    fixture.detectChanges();
  });

  it(`Able to load ota data from :otaId param`, () => {
    expect(component.metadata).toEqual(data);
  });

  it('Metadata info is loaded correctly in tree view', () => {
    const treeEl = fixture.debugElement.query(By.directive(TreeComponent));
    expect(treeEl).toBeDefined();
    const treeComponent: TreeComponent = treeEl.componentInstance;
    expect(treeComponent).toBeDefined();
    const treeModel = treeComponent.treeModel;
    expect(treeModel).toBeDefined();
    expect(treeModel.nodes[0].id).toEqual(data.ecus[0].id);
    expect(treeModel.nodes[0].name).toEqual(data.ecus[0].id);
    expect(treeModel.nodes[0].data).toEqual(data.ecus[0]);
    expect(treeModel.nodes[0].children[0].id).toEqual(data.ecus[0].images[0].id);
    expect(treeModel.nodes[0].children[0].name).toEqual(data.ecus[0].images[0].name);
    expect(treeModel.nodes[0].children[0].data).toEqual(data.ecus[0].images[0]);
  });

  it(`Image download working ${data.ecus[0].images[0].url}`, async(() => {
    const treeEl = fixture.debugElement.query(By.directive(TreeComponent));
    expect(treeEl).toBeDefined();
    const treeComponent: TreeComponent = treeEl.componentInstance;
    expect(treeComponent).toBeDefined();
    const treeModel = treeComponent.treeModel;
    expect(treeModel).toBeDefined();
    const imgNode: TreeNode = treeModel.getNodeById(data.ecus[0].images[0].id);
    imgNode.setActiveAndVisible();
    fixture.detectChanges();

    component.downloadImg().subscribe(fileName => expect(fileName).toEqual(data.ecus[0].images[0].name));

    const blob = new Blob(['hello', 'world'], { type: 'text/plain' });
    httpMock.expectOne(data.ecus[0].images[0].url).flush(blob);

    fileSaverServiceObservable.subscribe((actual) => {
      expect(actual.fileData).toEqual(blob);
      expect(actual.fileName).toEqual(data.ecus[0].images[0].name);
    });
  }));
});
