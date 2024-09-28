import { HttpCode, HttpError } from '~/common/http/http.js';
import { cryptService, tokenService } from '~/common/services/services.js';
import { UserValidationMessage } from './enums/enums.js';
class AuthService {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async signIn(userRequestDto) {
        const { email, password } = userRequestDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }
        const { passwordHash } = user.toNewObject();
        const isPwdCorrect = cryptService.compareSyncPassword(password, passwordHash);
        if (!isPwdCorrect) {
            throw new HttpError({
                message: UserValidationMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }
        const userObject = user.toObject();
        const { id } = userObject;
        const token = await tokenService.createToken(id);
        return { ...userObject, token };
    }
    async signUp(userRequestDto) {
        const { email } = userRequestDto;
        const emailExists = await this.userService.findByEmail(email);
        if (emailExists) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }
        const user = await this.userService.create(userRequestDto);
        const { id } = user;
        const token = await tokenService.createToken(id);
        return { ...user, token };
    }
}
export { AuthService };
