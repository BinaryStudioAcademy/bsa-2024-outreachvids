import { AbstractModel, DatabaseTableName, } from '~/common/database/database.js';
class UserModel extends AbstractModel {
    'email';
    'fullName';
    'passwordHash';
    'passwordSalt';
    static get tableName() {
        return DatabaseTableName.USERS;
    }
}
export { UserModel };
