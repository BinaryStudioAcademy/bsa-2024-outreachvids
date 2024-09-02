import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AvatarRepository } from './avatar.repository.js';
import { AvatarValidationMessage } from './enums/enums.js';
import {
    type AvatarGetAllResponseDto,
    type AvatarGetResponseDto,
} from './types/types.js';

class AvatarService {
    private avatarRepository: AvatarRepository;

    public constructor(avatarRepository: AvatarRepository) {
        this.avatarRepository = avatarRepository;
    }

    public async find(avatarId: string): Promise<AvatarGetResponseDto> {
        const avatar = await this.avatarRepository.find(avatarId);

        if (!avatar) {
            throw new HttpError({
                message: AvatarValidationMessage.AVATAR_DOESNT_EXIST,
                status: HttpCode.NOT_FOUND,
            });
        }

        return avatar.toObject();
    }

    public async findAll(): Promise<AvatarGetAllResponseDto> {
        const avatars = await this.avatarRepository.findAll();

        return {
            items: avatars.map((it) => it.toObject()),
        };
    }
}

export { AvatarService };
