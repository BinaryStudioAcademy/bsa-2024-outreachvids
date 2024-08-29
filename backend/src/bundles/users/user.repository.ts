import { type UserModel } from '~/bundles/users/user.model.js';
import { type Repository } from '~/common/types/types.js';

import { UserEntity } from '../../bundles/users/user.entity.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async findById(userId: string): Promise<UserEntity | null> {
        const user = await this.userModel.query().findById(userId).execute();

        return user ? UserEntity.initialize(user) : null;
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userModel.query().findOne({ email }).execute();

        return user ? UserEntity.initialize(user) : null;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, fullName, passwordSalt, passwordHash } =
            entity.toNewObject();

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

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
