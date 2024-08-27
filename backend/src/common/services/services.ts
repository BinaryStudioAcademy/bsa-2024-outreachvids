import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { FileService } from './file/file.service.js';

const cryptService = new CryptService();
const fileService = new FileService(config);

export { cryptService, fileService };
