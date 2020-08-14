import { UserService } from './user.service';
import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { appImports, appProviders, encode } from '../../shared/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { user, totp, UpdateCredential, notification } from '../../shared/model';
import { first } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    const admin = user.admin.CredentialProto.create({
        avatar: undefined,
        avatarFormat: undefined,
        avatarThirdParty: false,
        displayName: 'Administrator',
        email: 'admin@trilliumsecure.com',
        enabled: true,
        firstName: 'I',
        id: '178b3e66-3db9-4ac4-b08d-bc4f8cd1a7ff',
        lastName: 'Admin',
        middleName: 'Am',
        name: 'admin',
        password: 'no',
        roles: [
            user.admin.RoleProto.create({
                authorities: [
                    user.admin.AuthorityProto.create({
                        authority: 'all',
                        description: 'all',
                        id: 'aca84269-0289-42a8-9fba-c6d2dd34fc2b'
                    })
                ],
                id: '3ce6805d-fcb4-435d-bd0a-4e27f4a58721',
                name: 'admin'
            })
        ],
        tfa: totp.TwoFactorAuthenticationStatusProto.DISABLED,
        version: 1
    });
    const guest = user.admin.CredentialProto.create({
        avatar: undefined,
        avatarFormat: undefined,
        avatarThirdParty: false,
        displayName: 'Guest',
        email: 'anonymous@trilliumsecure.com',
        enabled: true,
        firstName: 'I',
        id: '90590ed5-279f-461d-88a8-82a6ad6bef25',
        lastName: 'Guest',
        middleName: 'Am',
        name: 'guest',
        password: 'no',
        roles: [
            user.admin.RoleProto.create({
                authorities: [
                    user.admin.AuthorityProto.create({
                        authority: 'none',
                        description: 'none',
                        id: '125a7878-d08b-46c6-9739-64afc2cb39e0'
                    })
                ],
                id: '125a7878-d08b-46c6-9739-64afc2cb39e0',
                name: 'none'
            })
        ],
        tfa: totp.TwoFactorAuthenticationStatusProto.DISABLED,
        version: 1
    });

    const notificationUser = notification.UserProto.create({
        displayName: 'Administrator',
        email: 'admin@trilliumsecure.com',
        firstName: 'I',
        id: '178b3e66-3db9-4ac4-b08d-bc4f8cd1a7ff',
        lastName: 'Admin',
        middleName: 'Am',
        name: 'admin',
    });
    const channelDefault = notification.ChannelProto.create({
        id: '6c39d4c4-0c9d-49b1-ac01-470abe70b6eb',
        description: 'Default Channel',
        name: 'Default',
        type: notification.ChannelTypeProto.DEFAULT
    });
    const channelEmail = notification.ChannelProto.create({
        id: 'ba82137f-fc9d-4815-83c5-008653c2d108',
        description: 'Email Channel',
        name: 'Email',
        type: notification.ChannelTypeProto.EMAIL
    });
    const topicSysAlert = notification.TopicProto.create({
        id: 'a855617e-fa07-4712-8bef-7363c6d9cc6e',
        description: 'System Alerts',
        name: 'SysAlert',
        subjectPrefix: '[SysAlert]'
    });
    const topicMaintenance = notification.TopicProto.create({
        id: '3a0e59b2-d1df-4a08-9010-4c298ed5268c',
        description: 'Maintenance',
        name: 'Maintenance',
        subjectPrefix: '[Maintenance]'
    });
    const topics = notification.TopicListProto.create({
        topics: [
            topicSysAlert,
            topicMaintenance
        ]
    });
    const subscriptions = notification.SubscriptionListProto.create({
        subscriptions: [
            notification.SubscriptionProto.create({
                channel: channelDefault,
                user: notificationUser,
                topic: topicSysAlert
            }),
            notification.SubscriptionProto.create({
                channel: channelEmail,
                user: notificationUser,
                topic: topicMaintenance
            })
        ]
    });

    const oauthTotp = totp.OauthTotpProto.create({
        enabled: true,
        oauthGroup: 'admin',
        oauthId: 'admin',
        otpAuthUri: undefined,
        recoveryCode1: 1,
        recoveryCode2: 2,
        recoveryCode3: 3,
        recoveryCode4: 4,
        recoveryCode5: 5,
        secret: '12345'
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: appImports,
            providers: appProviders
        }).compileComponents();
        service = TestBed.get(UserService);
        httpMock = TestBed.get(HttpTestingController);
    }));

    afterEach(() => httpMock.verify());

    it('#getListUsers() return 2 records', async(() => {
        service.getListUsers().subscribe((resp) => {
            expect(resp.data).toEqual([admin, guest]);
        });

        httpMock.expectOne('/api/users').flush(encode(user.admin.CredentialListProto, {
            data: [admin, guest]
        }));
    }));

    it('#updateUser() return successfully with updated info', async(() => {
        const updateInfo = new UpdateCredential(undefined, undefined, undefined, undefined, undefined,
            'My Name', 'Changed To', 'Super Admin');
        service.updateUser(admin.id, updateInfo).subscribe((resp) => {
            expect(resp.firstName).toEqual(updateInfo.firstName);
            expect(resp.middleName).toEqual(updateInfo.middleName);
            expect(resp.lastName).toEqual(updateInfo.lastName);
        });

        httpMock.expectOne({
            method: 'PATCH',
            url: `/api/users/${admin.id}`
        }).flush(encode(user.admin.CredentialProto, Object.assign({}, admin, updateInfo)));
    }));

    it('#deleteUser() return successfully', async(() => {
        service.deleteUser(admin.id).subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne({
            method: 'DELETE',
            url: `/api/users/${admin.id}`
        }).flush(null);
    }));

    it('#registerUser() return successfully with registered info', async(() => {
        service.registerUser(admin).subscribe((resp) => {
            expect(resp).toEqual(admin);
        });

        httpMock.expectOne({
            method: 'POST',
            url: '/api/users'
        }).flush(encode(user.admin.CredentialProto, admin));
    }));

    it('#getUserById() return successfully with correct info', async(() => {
        service.getUserById(admin.id).subscribe((resp) => {
            expect(resp).toEqual(admin);
        });

        httpMock.expectOne(`/api/users/${admin.id}`).flush(encode(user.admin.CredentialProto, admin));
    }));

    it('#getUserByName() return successfully with correct info', async(() => {
        service.getUserByName(admin.name).subscribe((resp) => {
            expect(resp.data).toEqual([admin]);
        });

        httpMock.expectOne((req: HttpRequest<any>) => {
            return req.method === 'GET' && req.url === '/api/users' && req.params.has('name');
        }).flush(encode(user.admin.CredentialListProto, {
            data: [admin]
        }));
    }));

    it('#getUserAvatar() return successfully with correct info', async(() => {
        service.getUserAvatar(admin.id).subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne(`/api/users/${admin.id}/avatar`).flush(null);
    }));

    it('#updateSessionUser() trigger user changes', async(() => {
        service.onUpdateSessionUser.subscribe(() => {
            expect(true).toBeTruthy();
        });
        service.updateSessionUser();
    }));

    it('#getSubcriptionTopics() return 2 records', async(() => {
        service.getSubcriptionTopics().subscribe((resp) => {
            expect(resp).toEqual(topics);
        });

        httpMock.expectOne('/api/notifications/subscriptions/topics').flush(encode(notification.TopicListProto, topics));
    }));

    it('#getSubscriptions() return 2 records', async(() => {
        service.getSubscriptions('email').subscribe((resp) => {
            expect(resp).toEqual(notification.SubscriptionListProto.create({
                subscriptions: [
                    notification.SubscriptionProto.create({
                        channel: channelEmail,
                        user: notificationUser,
                        topic: topicMaintenance
                    })
                ]
            }));
        });

        httpMock.expectOne('/api/notifications/subscriptions/email')
            .flush(encode(notification.SubscriptionListProto, {
                subscriptions: [
                    notification.SubscriptionProto.create({
                        channel: channelEmail,
                        user: notificationUser,
                        topic: topicMaintenance
                    })
                ]
            }));
    }));

    it('#subscribeTopic() return empty immediately without any requests if no topics passed', async(() => {
        service.subscribeTopic('email', []).subscribe((resp) => {
            expect(resp).toEqual([]);
        });

        httpMock.expectNone({
            method: 'POST',
            url: '/api/notifications/subscriptions/email'
        });
    }));

    it('#subscribeTopic() return correct data', async(() => {
        service.subscribeTopic('email', [topicMaintenance.id, topicSysAlert.id]).subscribe((resp) => {
            expect(resp).toEqual(subscriptions);
        });

        httpMock
            .expectOne((req) => req.method === 'POST' && req.url === '/api/notifications/subscriptions/email' && req.params.has('topics'))
            .flush(encode(notification.SubscriptionListProto, subscriptions));
    }));

    it('#unsubscribeTopic() return empty immediately without any requests if no topics passed', async(() => {
        service.unsubscribeTopic('email', []).subscribe((resp) => {
            expect(resp).toBeUndefined();
        });

        httpMock.expectNone({
            method: 'DELETE',
            url: '/api/notifications/subscriptions/email'
        });
    }));

    it('#unsubscribeTopic() return correct data', async(() => {
        service.unsubscribeTopic('email', [topicMaintenance.id, topicSysAlert.id]).subscribe((resp) => {
            expect(null).toBeNull();
        });

        httpMock
            .expectOne((req) => req.method === 'DELETE' && req.url === '/api/notifications/subscriptions/email' && req.params.has('topics'))
            .flush(null);
    }));

    it('#register2FactorAuthentication() return successfully with correct info', async(() => {
        service.register2FactorAuthentication().subscribe((resp) => {
            expect(resp).toEqual(oauthTotp);
        });

        httpMock.expectOne({
            method: 'POST',
            url: '/uaa/oauth/2fa'
        }).flush(encode(totp.OauthTotpProto, oauthTotp));
    }));

    it('#request2FactorAuthenticationStatus() return successfully with correct info', async(() => {
        service.request2FactorAuthenticationStatus().subscribe((resp) => {
            expect(resp).toEqual(oauthTotp);
        });

        httpMock.expectOne('/uaa/oauth/2fa').flush(encode(totp.OauthTotpProto, oauthTotp));
    }));

    it('#confirm2FactorAuthentication() return successfully with correct info', async(() => {
        service.confirm2FactorAuthentication('123456').subscribe(() => expect(true).toBeTruthy());

        httpMock
            .expectOne((req) => req.method === 'PUT' && req.url === '/uaa/oauth/2fa' && req.params.has('otp'))
            .flush(null);
    }));

    it('#unregister2FactorAuthentication() return successfully with correct info', async(() => {
        service.unregister2FactorAuthentication('123456').subscribe(() => expect(true).toBeTruthy());

        httpMock
            .expectOne((req) => req.method === 'DELETE' && req.url === '/uaa/oauth/2fa' && req.params.has('otp'))
            .flush(null);
    }));

    it('#reset2FactorAuthentication() return successfully with correct info', async(() => {
        service.reset2FactorAuthentication('123456').subscribe(() => expect(true).toBeTruthy());

        httpMock
            .expectOne((req) => req.method === 'DELETE' && req.url === '/uaa/oauth/2fa' && req.params.has('scratchCode'))
            .flush(null);
    }));

    it('#removeOtpAccess() return successfully with correct info', async(() => {
        service.removeOtpAccess().subscribe(() => expect(true).toBeTruthy());

        httpMock.expectOne({
            method: 'DELETE',
            url: '/uaa/oauth/2fa/access'
        }).flush(null);
    }));
});
