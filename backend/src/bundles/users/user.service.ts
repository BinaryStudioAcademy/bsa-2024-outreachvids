import { type UserRepository } from '~/bundles/users/user.repository.js';
import { cryptService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { UserEntity } from '../../bundles/users/user.entity.js';
import {
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findById(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findById(id);
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const normalizedEmail = email.toLowerCase();
        return await this.userRepository.findByEmail(normalizedEmail);
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { fullName, email, password } = payload;
        const { hash, salt } = cryptService.encryptSync(password);

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: email.toLowerCase(),
                fullName: fullName,
                passwordSalt: salt,
                passwordHash: hash,
            }),
        );

        return user.toObject();
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
