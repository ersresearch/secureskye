import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    oidc: false,
    tokenEndpoint: window.location.origin + '/uaa/oauth/token',
    userinfoEndpoint: window.location.origin + '/api/users/me',
    redirectUri: '/#/vehicle',
    clientId: 'secureskye-webapp-client',
    dummyClientSecret: 'secureskye',
    scope: '',
    customQueryParams: {
        otp_access: true // End able OTP access id
    }
};
