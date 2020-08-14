import { authConfig } from './auth.config';

/**
 * Resource server URL (required access_token)
 */
export const resourceServerEndpointsProto = [
    '/vehicle/',
    '/api/users',
    '/api/notifications',
    '/api/ota',
    '/api/vehicles',
    '/api/routes',
    '/uaa/oauth/2fa'
];

export const resourceServerEndpointsRequiredAuth = [
    authConfig.userinfoEndpoint,
    '/vehicle/',
    '/api/users',
    '/api/notifications',
    '/api/ie/',
    '/api/ota',
    '/api/vehicles',
    '/api/routes',
    '/uaa/oauth/2fa'
];
