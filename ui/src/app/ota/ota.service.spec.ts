import { OtaService } from './ota.service';
import { appImports, appProviders, encode } from '../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ota } from '../shared/model';
import { FileSaverService } from '../shared/service';
import { of, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

describe('OtaService', () => {
    let service: OtaService;
    let httpMock: HttpTestingController;
    let fileSaverServiceObservable: BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>;

    beforeAll(() => {
        fileSaverServiceObservable = new BehaviorSubject<{ fileData: Blob, fileName: string, type?: string }>(undefined);
        fileSaverServiceObservable.pipe(first()).subscribe();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: [
                ...appProviders,
                {
                    provide: FileSaverService, // Mockup FileSaverService
                    useValue: {
                        save: (data: Blob, fileName: string = 'download', type?: string) => {
                            fileSaverServiceObservable.next({
                                fileData: data,
                                fileName: fileName,
                                type: type
                            });
                        }
                    }
                }
            ]
        }).compileComponents();
        service = TestBed.get(OtaService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('#getImageArchiveMetadata return no data', async(() => {
        service.getImageArchiveMetadata('1').subscribe((resp) => expect(resp).toEqual(ota.vehicle.MetadataProto.create()));

        httpMock.expectOne('/api/ota/metadata/1').flush(encode(ota.vehicle.MetadataProto, {}));
    }));

    it('#getImageArchiveMetadata', async(() => {
        const expected = ota.vehicle.MetadataProto.create({
            id: '1',
            family: 'test',
            updateType: 'test',
            version: '1.0',
            ecus: [
                ota.vehicle.EcuProto.create({
                    id: '1',
                    version: '1.0',
                    description: 'test',
                    images: [
                        ota.vehicle.ImageProto.create({ id: '1', checksum: '1', name: 'test', url: 'path/to/test' })
                    ]
                })
            ]
        });

        service.getImageArchiveMetadata('1').subscribe((resp) => expect(resp).toEqual(expected));

        httpMock.expectOne('/api/ota/metadata/1').flush(encode(ota.vehicle.MetadataProto, expected));
    }));

    it('#getUpdatesImageArchiveMetadataByFamily return no data', async(() => {
        service.getUpdatesImageArchiveMetadataByFamily('test', '1.0').subscribe((resp) =>
            expect(resp).toEqual(ota.vehicle.MetadataListProto.create())
        );

        httpMock
            .expectOne((req) =>
                req.url === '/api/ota/metadata'
                && req.params.get('family') === 'test'
                && req.params.get('fromVersion') === '1.0')
            .flush(encode(ota.vehicle.MetadataProto, {}));
    }));

    it('#getImageArchiveMetadata return 2 records', async(() => {
        const expected = ota.vehicle.MetadataListProto.create({
            data: [
                ota.vehicle.MetadataProto.create({
                    id: '1',
                    family: 'test',
                    updateType: 'test',
                    version: '1.0',
                    ecus: [
                        ota.vehicle.EcuProto.create({
                            id: '1',
                            version: '1.0',
                            description: 'test',
                            images: [
                                ota.vehicle.ImageProto.create({ id: '1', checksum: '1', name: 'test', url: 'path/to/test' })
                            ]
                        })
                    ]
                }),
                ota.vehicle.MetadataProto.create({
                    id: '2',
                    family: 'test',
                    updateType: 'test',
                    version: '2.0',
                    ecus: [
                        ota.vehicle.EcuProto.create({
                            id: '2',
                            version: '2.0',
                            description: 'test2',
                            images: [
                                ota.vehicle.ImageProto.create({ id: '2', checksum: '2', name: 'test2', url: 'path/to/test2' })
                            ]
                        })
                    ]
                })
            ]
        });

        service.getUpdatesImageArchiveMetadataByFamily('test', '1.0').subscribe((resp) => expect(resp).toEqual(expected));

        httpMock
            .expectOne((req) =>
                req.url === '/api/ota/metadata'
                && req.params.get('family') === 'test'
                && req.params.get('fromVersion') === '1.0')
            .flush(encode(ota.vehicle.MetadataListProto, expected));
    }));

    it('#getImageArchiveMetadataList return no data', async(() => {
        service.getImageArchiveMetadataList().subscribe((resp) => expect(resp.data).toEqual([]));

        httpMock.expectOne('/api/ota/metadata').flush(encode(ota.vehicle.MetadataListProto, { data: [] }));
    }));

    it('#getImageArchiveMetadataList return 2 records', async(() => {
        const expected = ota.vehicle.MetadataListProto.create({
            data: [
                ota.vehicle.MetadataProto.create({
                    id: '1',
                    family: 'test',
                    updateType: 'test',
                    version: '1.0',
                    ecus: [
                        ota.vehicle.EcuProto.create({
                            id: '1',
                            version: '1.0',
                            description: 'test',
                            images: [
                                ota.vehicle.ImageProto.create({ id: '1', checksum: '1', name: 'test', url: 'path/to/test' })
                            ]
                        })
                    ]
                }),
                ota.vehicle.MetadataProto.create({
                    id: '2',
                    family: 'test',
                    updateType: 'test',
                    version: '2.0',
                    ecus: [
                        ota.vehicle.EcuProto.create({
                            id: '2',
                            version: '2.0',
                            description: 'test2',
                            images: [
                                ota.vehicle.ImageProto.create({ id: '2', checksum: '2', name: 'test2', url: 'path/to/test2' })
                            ]
                        })
                    ]
                })
            ]
        });

        service.getImageArchiveMetadataList().subscribe((resp) => expect(resp).toEqual(expected));

        httpMock.expectOne('/api/ota/metadata').flush(encode(ota.vehicle.MetadataListProto, expected));
    }));

    it('#publishImageArchiveMetadata request correctly', async(() => {
        service.publishImageArchiveMetadata('1').subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne({
            method: 'PUT',
            url: '/api/ota/1/publish'
        }).flush(null);
    }));

    it('#downloadImg request correctly', async(() => {
        service.downloadImg({
            url: '/path/to/test.img',
            name: 'hello-world.txt'
        }).subscribe((name) => expect(name).toEqual('hello-world.txt'));

        const blob = new Blob(['hello', 'world']);
        httpMock.expectOne('/path/to/test.img').flush(blob);

        fileSaverServiceObservable.subscribe((actual) => {
            expect(actual.fileData).toEqual(blob);
            expect(actual.fileName).toEqual('hello-world.txt');
        });
    }));

    it('#remove request correctly', async(() => {
        service.remove('1').subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne({
            method: 'DELETE',
            url: '/api/ota/1'
        }).flush(null);
    }));
});
