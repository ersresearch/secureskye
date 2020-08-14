import '../config/protobuf.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { ProtobufMessageInterceptor } from '../interceptor';
import { SharedModule } from '../shared.module';
import { Writer } from 'protobufjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

/**
 * Common import for testing.
 */
export const appImports = [
    SharedModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
];

/**
 * Common providers for testing.
 */
export const appProviders = [
    {
        provide: OAuthStorage,
        useValue: localStorage
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ProtobufMessageInterceptor,
        multi: true
    }
];

/**
 * Protobuf encode function for mockup data.
 * @param type protobuf message type
 * @param data data
 */
export function encode<T>(type: { encode(data: T): Writer }, data: T): ArrayBuffer | SharedArrayBuffer {
    return type.encode(data).finish().slice().buffer;
}
