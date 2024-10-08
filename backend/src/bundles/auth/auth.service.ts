import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
} from '~/bundles/users/users.js';
import { HTTPCode, HttpError } from '~/common/http/http.js';
import { cryptService, tokenService } from '~/common/services/services.js';

import { UserValidationMessage } from './enums/enums.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const { email, password } = userRequestDto;
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HTTPCode.BAD_REQUEST,
            });
        }

        const { passwordHash } = user.toNewObject();

        const isPasswordCorrect = cryptService.compareSyncPassword(
            password,
            passwordHash,
        );

        if (!isPasswordCorrect) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HTTPCode.BAD_REQUEST,
            });
        }

        const userObject = user.toObject();
        const { id } = userObject;
        const token = await tokenService.createToken(id);
        return { ...userObject, token };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email } = userRequestDto;
        const emailExists = await this.userService.findByEmail(email);
        if (emailExists) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
                status: HTTPCode.BAD_REQUEST,
            });
        }
        const user = await this.userService.create(userRequestDto);
        const { id } = user;
        const token = await tokenService.createToken(id);
        return { ...user, token };
    }
}

export { AuthService };
