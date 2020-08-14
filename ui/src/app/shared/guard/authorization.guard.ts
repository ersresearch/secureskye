import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, NavigationEnd, ActivationStart } from '@angular/router';
import { Observable, from } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { mergeMap, map, toArray, tap, pairwise, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild {

    private prevUrl: string;

    constructor(private authService: LoginService, private router: Router) {
        const self = this;

        // Tracking previous url
        self.router.events.pipe(
            filter((evt) => evt instanceof NavigationEnd)
        ).subscribe((prev: NavigationEnd) => {
            self.prevUrl = prev.urlAfterRedirects;
        });
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const self = this;

        if (childRoute.data.authorities !== undefined) {
            const userInfo = self.authService.getIdentityClaims() as { roles: { authorities: { authority: string }[] }[] };
            if (!userInfo) {
                self.authService.invalidateSession();
                return false;
            }
            // Check for required authorities
            return from(userInfo.roles).pipe(
                mergeMap((role: { authorities?: { authority: string }[] }) => role.authorities || []),
                map((authorities) => authorities.authority),
                toArray(),
                map((userAuthorities) => childRoute.data.authorities.every((authority) => userAuthorities.findIndex((userAuthority) => {
                    return userAuthority === authority;
                }) >= 0)),
                tap((passed) => {
                    if (!passed) {
                        self.router.navigate(['/error', '403'], { queryParams: { prevUrl: self.prevUrl }, replaceUrl: true });
                        self.prevUrl = undefined; // Reset
                    }
                })
            );
        }
        return true;
    }
}
