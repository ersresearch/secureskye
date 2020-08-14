import { DatabaseService } from './database.service';
import { appImports, appProviders, encode } from '../../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ota } from '../../shared/model';
import { FileSaverService } from '../../shared/service';
import { of } from 'rxjs';

describe('DatabaseService', () => {
    let service: DatabaseService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: appProviders
        }).compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(DatabaseService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('#exportDirect() successfully', async(() => {
        const blobData = new Blob(['hello', 'world']);

        service.exportDirect('json', 'p@ssw0rd').subscribe((resp) => expect(resp.body).toEqual(blobData));

        httpMock.expectOne((req) =>
            req.method === 'GET' && req.url === '/api/ie/exports/direct'
            && req.params.get('format') === 'json' && req.params.get('password') === 'p@ssw0rd'
        ).flush(blobData);
    }));
});
