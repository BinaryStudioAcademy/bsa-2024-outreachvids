import { type JWTPayload as TokenPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

class TokenService {
    private secretKey: Uint8Array;
    private expirationTime: string;

    public constructor(secretKey: string, expirationTime: string) {
        this.secretKey = new TextEncoder().encode(secretKey);
        this.expirationTime = expirationTime;
    }

    public async createToken(
        id: string,
        expires: boolean = true,
    ): Promise<string> {
        const jwt = new SignJWT({ id }).setProtectedHeader({ alg: 'HS256' });

        if (expires) {
            jwt.setExpirationTime(this.expirationTime);
        }

        return await jwt.sign(this.secretKey);
    }

    public async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const { payload } = await jwtVerify(token, this.secretKey);
            return payload;
        } catch {
            return null;
        }
    }

    public async getIdFromToken(token: string): Promise<string | null> {
        const payload = await this.verifyToken(token);

        return (payload?.['id'] as string) ?? null;
    }
}

export { TokenService };
