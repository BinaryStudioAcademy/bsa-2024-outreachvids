import * as Bcrypt from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../constants/constants.js';
class CryptService {
    bcrypt = Bcrypt;
    createSaltSync() {
        return this.bcrypt.genSaltSync(USER_PASSWORD_SALT_ROUNDS);
    }
    encryptSync(data) {
        const salt = this.createSaltSync();
        const hash = this.bcrypt.hashSync(data, salt);
        return { salt, hash };
    }
    compareSyncPassword(password, hash) {
        return this.bcrypt.compareSync(password, hash);
    }
}
export { CryptService };
