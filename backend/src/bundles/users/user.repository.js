import { UserEntity } from '../../bundles/users/user.entity.js';
class UserRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async find(userId) {
        const user = await this.userModel.query().findById(userId).execute();
        return user ? UserEntity.initialize(user) : null;
    }
    async findByEmail(email) {
        const user = await this.userModel.query().findOne({ email }).execute();
        return user ? UserEntity.initialize(user) : null;
    }
    async findAll() {
        const users = await this.userModel.query().execute();
        return users.map((it) => UserEntity.initialize(it));
    }
    async create(entity) {
        const { email, fullName, passwordSalt, passwordHash } = entity.toNewObject();
        const item = await this.userModel
            .query()
            .insert({
            email,
            fullName,
            passwordSalt,
            passwordHash,
        })
            .returning('*')
            .execute();
        return UserEntity.initialize(item);
    }
    update() {
        return Promise.resolve(null);
    }
    delete() {
        return Promise.resolve(true);
    }
}
export { UserRepository };
