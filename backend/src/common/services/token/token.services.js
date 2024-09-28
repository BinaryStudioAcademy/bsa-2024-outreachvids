import { jwtVerify, SignJWT } from 'jose';
class TokenService {
    secretKey;
    expirationTime;
    constructor(secretKey, expirationTime) {
        this.secretKey = new TextEncoder().encode(secretKey);
        this.expirationTime = expirationTime;
    }
    async createToken(userId) {
        return await new SignJWT({ userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(this.expirationTime)
            .sign(this.secretKey);
    }
    async verifyToken(token) {
        try {
            const { payload } = await jwtVerify(token, this.secretKey);
            return payload;
        }
        catch {
            return null;
        }
    }
    async getUserIdFromToken(token) {
        const payload = await this.verifyToken(token);
        return payload?.['userId'] || null;
    }
}
export { TokenService };
