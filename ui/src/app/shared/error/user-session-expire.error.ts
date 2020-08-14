
/**
 * Error when `access_token` & `refresh_token` failed. User must login again.
 * Used to bypass duplicate dialog modal message.
 */
export class UserSessionExpiredError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
