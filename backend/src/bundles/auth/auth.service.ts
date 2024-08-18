import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { cryptService } from '~/common/services/services.js';

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
        const user = await this.userService.find(email);

        if (!user) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { passwordHash } = user.toNewObject();

        const isPwdCorrect = cryptService.compareSyncPassword(
            password,
            passwordHash,
        );

        if (!isPwdCorrect) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return user.toObject();
    }

    public signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        return this.userService.create(userRequestDto);
    }
}

export { AuthService };
