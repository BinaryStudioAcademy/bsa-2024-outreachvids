import { type UserRepository } from '~/bundles/users/user.repository.js';
import { cryptService, tokenService } from '~/common/services/services.js';
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

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findByEmail(email);
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
        const { hash, salt } = cryptService.encryptSync(payload.password);
        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordSalt: salt, // TODO
                passwordHash: hash, // TODO
            }),
        );
        const { id, email } = user.toObject();
        const token = await tokenService.createToken(id);

        return { id, email, token };
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
