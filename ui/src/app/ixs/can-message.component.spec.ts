import { appImports, appProviders, encode } from '../shared/testing';
import { By } from '@angular/platform-browser';
import { CanMessageComponent } from './can-message.component';
import { take, finalize } from 'rxjs/operators';
import { ComponentFixture, TestBed, async, } from '@angular/core/testing';
import { EPERM } from 'constants';
import { from, throwError, defer, interval, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserSessionExpiredError } from '../shared/error';
import { vehicle } from '../shared/model';
import * as Long from 'long';
import * as Moment from 'moment';

describe('CanMessageComponent', () => {
    let fixture: ComponentFixture<CanMessageComponent>;
    let component: CanMessageComponent;
    let httpMock: HttpTestingController;

    const vehicleList = vehicle.admin.VehicleListProto.create({
        data: [
            vehicle.admin.VehicleProto.create({ id: '1', name: 'vehicle-1' }),
            vehicle.admin.VehicleProto.create({ id: '2', name: 'vehicle-2' }),
            vehicle.admin.VehicleProto.create({ id: '3', name: 'vehicle-3' })
        ]
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...appImports,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [CanMessageComponent],
            providers: appProviders
        });
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(CanMessageComponent);
        component = fixture.componentInstance;

        fixture.autoDetectChanges();

        httpMock.expectOne('/api/vehicles').flush(encode(vehicle.admin.VehicleListProto, vehicleList));

    });

    it('Load list vehicle', () => {
        fixture.detectChanges();
        expect(component.vehicleList).toEqual(vehicleList);
        expect(component.messageDataSource.length).toEqual(0);
    });

    it(`Load 501 messages (only 2-501 is displayed) from vehicle (id=${vehicleList.data[0].id}, name=${vehicleList.data[0].name})`,
        async(() => {

            Object.assign(CanMessageComponent, { 'DATA_REFRESH_INTERVAL': 1 }); // Adjust interval for faster test run time.

            let count = 0;

            interval(100).pipe(
                take(501)
            ).subscribe(() => {
                expect(component.messageDataSource.length).toEqual(count);

                const dlc = Math.round(Math.random() * 8);
                const data = new Uint8Array(dlc);
                for (let i = 0; i < dlc; i++) {
                    data[i] = Math.round(Math.random() * 255);
                }
                httpMock.expectOne(`/api/vehicles/${vehicleList.data[0].id}/messages`).flush(encode(vehicle.message.MessageBatchProto, {
                    canBus: [
                        {
                            timestamp: Long.fromNumber(new Date().getTime()),
                            messageId: ++count,
                            data: data,
                            dlc: dlc
                        }
                    ]
                }));
                fixture.detectChanges();
            });
        }), 60000);

    it('Load a message and displayed correctly', async(() => {
        const message = {
            timestamp: Long.fromNumber(Moment.now()).multiply(1000000),
            messageId: Math.round(Math.random() * 1000),
            data: Uint8Array.of(2, 1, 13, 55, 55), // 02-01-0d-37-37  |  ...77
            dlc: 5
        };

        httpMock.expectOne(`/api/vehicles/${vehicleList.data[0].id}/messages`).flush(encode(vehicle.message.MessageBatchProto, {
            canBus: [message]
        }));
        fixture.detectChanges();

        // Tests
        const timestampTd = fixture.debugElement.query(By.css('.milliTimestamp'));
        expect(timestampTd.nativeElement.textContent).toEqual(
            Moment(message.timestamp.divide(1000000).toNumber()).format('YYYY-MM-DD HH:mm:ss')
        );
        const messageIdTd = fixture.debugElement.query(By.css('.messageId'));
        expect(messageIdTd.nativeElement.textContent).toEqual(`${message.messageId.toString(16)}`);
        const dlcTd = fixture.debugElement.query(By.css('.dlc'));
        expect(dlcTd.nativeElement.textContent).toEqual(`${message.dlc}`);
        const dataTd = fixture.debugElement.query(By.css('.data'));
        expect(dataTd.nativeElement.textContent).toEqual('02-01-0d-37-37');
        const asciiTd = fixture.debugElement.query(By.css('.ascii'));
        expect(asciiTd.nativeElement.textContent).toEqual('...77');
    }));

    it(`Load 2 messages from vehicle (id=${vehicleList.data[0].id}, name=${vehicleList.data[0].name}),
    then 3 messages vehicle (id=${vehicleList.data[1].id}, name=${vehicleList.data[2].name})`,
        async(() => {
            Object.assign(CanMessageComponent, { 'DATA_REFRESH_INTERVAL': 1 }); // Adjust interval for faster test run time.

            let count = 0;

            interval(100).pipe(
                take(2),
                finalize(() => {
                    // Switch to second vehicle after first one completed.
                    component.selectedVehicleId = vehicleList.data[1].id;
                    component.changeVehicle(component.selectedVehicleId);
                    fixture.detectChanges();

                    count = 0;
                    interval(100).pipe(
                        take(3)
                    ).subscribe(() => {
                        expect(component.messageDataSource.length).toEqual(count);

                        const dlc = Math.round(Math.random() * 8);
                        const data = new Uint8Array(dlc);
                        for (let i = 0; i < dlc; i++) {
                            data[i] = Math.round(Math.random() * 255);
                        }
                        httpMock.expectOne(`/api/vehicles/${vehicleList.data[1].id}/messages`).flush(
                            encode(vehicle.message.MessageBatchProto, {
                                canBus: [
                                    {
                                        timestamp: Long.fromNumber(new Date().getTime()),
                                        messageId: ++count,
                                        data: data,
                                        dlc: dlc
                                    }
                                ]
                            }));
                        fixture.detectChanges();
                    });
                })
            ).subscribe(() => {
                expect(component.messageDataSource.length).toEqual(count);

                const dlc = Math.round(Math.random() * 8);
                const data = new Uint8Array(dlc);
                for (let i = 0; i < dlc; i++) {
                    data[i] = Math.round(Math.random() * 255);
                }
                httpMock.expectOne(`/api/vehicles/${vehicleList.data[0].id}/messages`).flush(encode(vehicle.message.MessageBatchProto, {
                    canBus: [
                        {
                            timestamp: Long.fromNumber(new Date().getTime()),
                            messageId: ++count,
                            data: data,
                            dlc: dlc
                        }
                    ]
                }));
                fixture.detectChanges();
            });
        }));
});
