import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'passwordSalt': string;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }
}

export { UserModel };
