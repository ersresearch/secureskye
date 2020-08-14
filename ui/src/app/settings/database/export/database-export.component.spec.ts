import { appImports, appProviders, encode } from '../../../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FileSaverService } from '../../../shared/service';
import { of, BehaviorSubject } from 'rxjs';
import { DatabaseExportComponent } from './database-export.component';
import { first } from 'rxjs/operators';

describe('DatabaseExportComponent', () => {
    let component: DatabaseExportComponent;
    let fixture: ComponentFixture<DatabaseExportComponent>;
    let httpMock: HttpTestingController;
    let fileSaverServiceObservable: BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>;

    beforeAll(() => {
        fileSaverServiceObservable = new BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>(undefined);
        fileSaverServiceObservable.pipe(first()).subscribe();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            declarations: [DatabaseExportComponent],
            providers: [
                ...appProviders,
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
        fixture = TestBed.createComponent(DatabaseExportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Component is initialized', () => {
        expect(component).toBeDefined();
    });

    it(`Export format field default to 'json' on init`, () => {
        expect(component.exportForm.get('exportFormat').valid).toBeTruthy();
        expect(component.exportForm.get('exportFormat').value).toEqual('json');
    });

    it('Export format field error when empty', () => {
        component.exportForm.get('exportFormat').setValue('');
        expect(component.exportForm.get('exportFormat').invalid).toBeTruthy();
    });

    it(`Export password field error on init`, () => {
        expect(component.exportForm.get('exportPassword').invalid).toBeTruthy();
    });

    it(`Export password field valid after set value`, () => {
        component.exportForm.get('exportPassword').setValue('p@ssw0rd');
        expect(component.exportForm.get('exportPassword').valid).toBeTruthy();
    });

    it('File is exported successfully', async(() => {
        component.exportForm.setValue({
            exportFormat: 'json',
            exportPassword: 'p@ssw0rd'
        });

        component.export();

        const blobData = new Blob(['hello', 'world']);
        httpMock.expectOne((req) =>
            req.method === 'GET' && req.url === '/api/ie/exports/direct'
            && req.params.get('format') === 'json' && req.params.get('password') === 'p@ssw0rd'
        ).flush(blobData, {
            headers: {
                'content-disposition': 'filename=testfile.txt'
            }
        });

        fileSaverServiceObservable.subscribe((actual) => {
            expect(actual.fileData).toEqual(blobData);
            expect(actual.fileName).toEqual('testfile.txt');
        });
    }));
});
