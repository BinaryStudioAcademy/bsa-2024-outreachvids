import { cryptService } from '~/common/services/services.js';
import { UserEntity } from '../../bundles/users/user.entity.js';
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id) {
        return await this.userRepository.find(id);
    }
    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
    async findAll() {
        const items = await this.userRepository.findAll();
        return {
            items: items.map((it) => it.toObject()),
        };
    }
    async create(payload) {
        const { hash, salt } = cryptService.encryptSync(payload.password);
        const user = await this.userRepository.create(UserEntity.initializeNew({
            email: payload.email,
            fullName: payload.fullName,
            passwordSalt: salt,
            passwordHash: hash,
        }));
        return user.toObject();
    }
    update() {
        return Promise.resolve(null);
    }
    delete() {
        return Promise.resolve(true);
    }
}
export { UserService };
