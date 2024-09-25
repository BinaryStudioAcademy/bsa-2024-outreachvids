import { type JWTPayload as TokenPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

class TokenService {
    private secretKey: Uint8Array;
    private expirationTime: string;

    public constructor(secretKey: string, expirationTime: string) {
        this.secretKey = new TextEncoder().encode(secretKey);
        this.expirationTime = expirationTime;
    }

    public async createToken(userId: string): Promise<string> {
        return await new SignJWT({ userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(this.expirationTime)
            .sign(this.secretKey);
    }

    public async createVideoIdToken(videoId: string): Promise<string> {
        const jwt = await new SignJWT({ videoId })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(this.secretKey);
        return jwt.replaceAll('.', '~');
    }

    public async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const { payload } = await jwtVerify(token, this.secretKey);
            return payload;
        } catch {
            return null;
        }
    }

    public async getUserIdFromToken(token: string): Promise<string | null> {
        const payload = await this.verifyToken(token);
        return (payload?.['userId'] as string) || null;
    }

    public async getVideoIdFromToken(token: string): Promise<string | null> {
        const payload = await this.verifyToken(token);
        return (payload?.['videoId'] as string) || null;
    }
}

export { TokenService };
