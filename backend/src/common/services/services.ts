import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.services.js';
import { FileService } from './file/file.service.js';

const cryptService = new CryptService();
const fileService = new FileService(config);

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;
const tokenService = new TokenService(secretKey, expirationTime);

export { cryptService, fileService, tokenService };

