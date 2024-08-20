import { type JWTPayload } from 'jose';
import { jwtVerify,SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode('your_secret_key'); 
const EXPIRATION_TIME = '24h'; 

interface TokenPayload extends JWTPayload {
  userId: number;
}

const createToken = async (userId: number): Promise<string> => {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(EXPIRATION_TIME)
    .sign(SECRET_KEY);
};

const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as TokenPayload;
  } catch {
    return null;
  }
};

export { createToken, verifyToken };