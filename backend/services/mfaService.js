import speakeasy from "speakeasy"

export function generateMfaSecret() {
    const secret = speakeasy.generateSecret({});
    return {
        secret: secret.base32, otpAuthUrl: secret.otpauth_url,
    }
}

export function verifyMfaToken(secret, token) {
    return speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1
    });
}