import { HTTPCode, HttpError } from '~/common/http/http.js';

import { AvatarValidationMessage } from './enums/enums.js';
import {
    type AvatarGetAllResponseDto,
    type AvatarGetResponseDto,
} from './types/types.js';

class AvatarService {
    private avatars: AvatarGetResponseDto[];

    public constructor(avatars: AvatarGetResponseDto[]) {
        this.avatars = avatars;
    }

    public findById({ avatarId }: { avatarId: string }): AvatarGetResponseDto {
        const avatar = this.avatars.find((avatar) => avatar.id === avatarId);

        if (!avatar) {
            throw new HttpError({
                message: AvatarValidationMessage.AVATAR_DOESNT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return avatar;
    }

    public findAll(): AvatarGetAllResponseDto {
        const avatars = this.avatars;

        return {
            items: avatars,
        };
    }
}

export { AvatarService };
