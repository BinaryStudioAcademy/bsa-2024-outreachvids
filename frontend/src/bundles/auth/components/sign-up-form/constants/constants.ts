import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
