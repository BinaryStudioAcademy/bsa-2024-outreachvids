import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
