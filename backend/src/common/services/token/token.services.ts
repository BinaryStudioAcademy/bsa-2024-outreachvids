import { type JWTPayload as TokenPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

class TokenService {
    private SECRET_KEY: Uint8Array;
    private EXPIRATION_TIME: string;

    public constructor(secretKey: string, expirationTime: string) {
        this.SECRET_KEY = new TextEncoder().encode(secretKey);
        this.EXPIRATION_TIME = expirationTime;
    }

    public async createToken(userId: string): Promise<string> {
        return await new SignJWT({ userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(this.EXPIRATION_TIME)
            .sign(this.SECRET_KEY);
    }

    public async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const { payload } = await jwtVerify(token, this.SECRET_KEY);
            return payload;
        } catch {
            return null;
        }
    }

    public async getUserIdFromToken(token: string): Promise<string | null> {
        const payload = await this.verifyToken(token);
        return (payload?.['userId'] as string) || null;
    }
}

export { TokenService };
