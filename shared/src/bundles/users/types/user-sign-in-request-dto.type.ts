import { type UserSignUpRequestDto } from './types.js';

type UserSignInRequestDto = Pick<UserSignUpRequestDto, 'email' | 'password'>;

export { type UserSignInRequestDto };
