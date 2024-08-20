import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.services.js';

const cryptService = new CryptService();
const tokenService = new TokenService('your_secret_key', '24h');

export { cryptService, tokenService };
