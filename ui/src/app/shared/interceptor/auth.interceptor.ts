import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, defer, from, throwError, concat } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { resourceServerEndpointsRequiredAuth } from '../config/endpoints.config';
import { UserSessionExpiredError } from '../error/user-session-expire.error';
import { LoginService } from '../../login/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    /**
     * Intercept request to authorize request with oauth service
     * @param req original request
     * @param next next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const self = this;

        if (self.checkUrl(req)) {
            // Authorization handler observable
            const authHandle = defer(() => {
                // Add authorization to request
                const authorizedReq = req.clone({
                    headers: req.headers.set('Authorization', self.loginService.authorizationHeader())
                });
                // Execute
                return next.handle(authorizedReq);
            });

            return authHandle.pipe(
                catchError((requestError, retryRequest) => {
                    if (requestError instanceof HttpErrorResponse && requestError.status === 401) {
                        // Authrozation failed, retry if refresh_token succeeded.
                        return from(self.loginService.refreshToken()).pipe(
                            catchError((refreshTokenError) => {
                                // Refresh token failed, logout
                                self.loginService.invalidateSession();
                                // Emit UserSessionExpiredError
                                return throwError(new UserSessionExpiredError('refresh_token failed'));
                            }),
                            mergeMap(() => retryRequest)
                        );
                    } else {
                        // Re-throw response error
                        return throwError(requestError);
                    }
                })
            );
        } else {
            return next.handle(req);
        }
    }

    /**
     * Check if request is required authentication
     * @param req request
     */
    private checkUrl(req: HttpRequest<any>) {
        // Bypass auth interceptor
        if (req.headers.has('No-Auth')) {
            return false;
        }

        const url = req.url.toLowerCase();
        const found = resourceServerEndpointsRequiredAuth.find((u) => url.startsWith(u));
        return !!found;
    }
}
