import { logger } from '~/common/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(logger, userService);

export { userController, userService };
export {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
export { UserModel } from './user.model.js';
export { userSignUpValidationSchema } from './validation-schemas/validation-schemas.js';
