import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.services.js';

const cryptService = new CryptService();

const secretKey = process.env['SECRET_KEY'] || 'default_secret_key';
const expirationTime = process.env['EXPIRATION_TIME'] || '24h';
const tokenService = new TokenService(secretKey, expirationTime);

export { cryptService, tokenService };
