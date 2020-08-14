import { async, ComponentFixture, TestBed, fakeAsync, tick, } from '@angular/core/testing';

import { OtaUploadComponent } from './ota-upload.component';
import { appImports, appProviders, encode } from '../../shared/testing';
import { first } from 'rxjs/operators';
import { ota } from '../../shared/model';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TreeModule, TreeComponent, TreeNode } from 'angular-tree-component';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterTestingModule } from '@angular/router/testing';
import { build } from 'protobufjs';
import xhrMock from 'xhr-mock';

describe('OtaUploadComponent', () => {
  let component: OtaUploadComponent;
  let fixture: ComponentFixture<OtaUploadComponent>;

  beforeEach(async(() => {
    xhrMock.setup();
    TestBed.configureTestingModule({
      imports: [
        ...appImports,
        FileUploadModule,
        RouterTestingModule
      ],
      declarations: [OtaUploadComponent],
      providers: appProviders
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => xhrMock.teardown());

  it('Error when 2 or more files uploaded', () => {
    const files = [
      new File(['hello'], 'metadata1.zip', { type: 'application/zip' }),
      new File(['world'], 'metadata2.zip', { type: 'application/zip' }),
    ];
    component.selectFile(files);

    expect(component.errorMsg).toEqual('Please select only 1 file');
  });

  it('Error when file is greater than 10MB', () => {
    const parts = [];
    for (let i = 0; i < 1000000; i++) {
      parts.push(`
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetxhruer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.`);
    }
    const blob = new Blob(parts);
    const files = [
      new File([
        blob, blob, blob, blob, blob, blob, blob, blob,
        blob, blob, blob, blob, blob, blob, blob, blob,
        blob, blob, blob, blob, blob, blob, blob, blob]
        , 'metadata.zip', { type: 'application/zip' })
    ];
    component.selectFile(files);
    component.uploader.uploadAll();

    expect(component.errorMsg).toEqual('Please choose the file less than 10 MB');
  });

  it('Error when file type other than zip or gzip file', () => {
    const files = [
      new File(['hello'], 'metadata1.zip', { type: 'application/data' })
    ];
    component.selectFile(files);
    expect(component.errorMsg).toEqual(`Please choose the file with '.zip', '.tar.gz' extension`);
  });

  it('Error when meta file is incorrect format', fakeAsync(() => {
    const message = `The 'metadata.yaml' has to be the first entry in the archive.
    Instead found 'ecus/0000000000000002000000000000000300000000000000040000000000000005/'`;
    xhrMock.post('/api/ota', (req, res) => {
      return res
        .status(500)
        .reason('Internal Server Error')
        .body(JSON.stringify({
          message: message,
          details: {
            some: 'detail'
          }
        }));
    });

    const files = [
      new File(['hello'], 'metadata1.zip', { type: 'application/zip' })
    ];
    component.selectFile(files);
    component.uploader.uploadAll();
    tick(100);

    expect(component.errorMsg).toEqual(message);
  }));

  it('Upload failed with unknown error.', fakeAsync(() => {
    xhrMock.post('/api/ota', (req, res) => {
      return res
        .status(500)
        .reason('Internal Server Error')
        .body({
          some: 'strange',
          response: 'from server'
        });
    });

    const files = [
      new File(['hello'], 'metadata1.zip', { type: 'application/zip' })
    ];
    component.selectFile(files);
    component.uploader.uploadAll();
    tick(100);

    expect(component.errorMsg).toEqual('Unknown error. Please contact the Administrator.');
  }));
});
