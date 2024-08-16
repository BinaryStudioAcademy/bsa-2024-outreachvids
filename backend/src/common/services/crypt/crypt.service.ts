import * as Bcrypt from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '../../constants/constants.js';

type EncryptSyncReturnType = {
    salt: string;
    hash: string;
};

class CryptService {
    private bcrypt = Bcrypt;

    public createSaltSync(): string {
        return this.bcrypt.genSaltSync(USER_PASSWORD_SALT_ROUNDS);
    }

    public encryptSync(data: string): EncryptSyncReturnType {
        const salt = this.createSaltSync();
        const hash = this.bcrypt.hashSync(data, salt);
        return { salt, hash };
    }

    public compareSyncPassword(password: string, hash: string): boolean {
        return this.bcrypt.compareSync(password, hash);
    }
}

export { CryptService };
