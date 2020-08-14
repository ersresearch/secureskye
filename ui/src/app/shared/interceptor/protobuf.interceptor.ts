import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerEndpointsProto } from '../config/endpoints.config';

@Injectable({
    providedIn: 'root'
})
export class ProtobufMessageInterceptor implements HttpInterceptor {

    /**
     * Intercept request for protobuf
     * @param req original request
     * @param next next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const self = this;

        // check for protobuf request

        if (self.checkUrl(req)) {
            // Add content-type to headers and responseType to arraybuffer
            const pbReq = req.clone({
                headers: req.headers
                    .append('Accept', 'application/x-protobuf;charset=UTF-8')
                    .append('Accept', 'application/json;charset=UTF-8'),
                responseType: 'arraybuffer'
            });

            return next.handle(pbReq);
        } else {
            return next.handle(req);
        }
    }

    /**
     * Check if request is regconized as protobuf message request
     * @param req request
     */
    private checkUrl(req: HttpRequest<any>) {
        const url = req.url.toLowerCase();
        const found = resourceServerEndpointsProto.find((u) => url.startsWith(u));
        return !!found;
    }
}
