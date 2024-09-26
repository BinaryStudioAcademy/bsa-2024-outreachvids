import {
    type AvatarGetResponseDto,
    type AvatarMapped,
} from '../types/types.js';
import { capitalCase } from './helpers.js';

const avatarsMapper = (avatars: AvatarGetResponseDto[]): AvatarMapped[] => {
    return avatars.flatMap(({ id, name, styles }) => {
        return styles.map(({ imgUrl, style }) => {
            return {
                id,
                name: capitalCase(name),
                style: style.split('-')[0] as string,
                imgUrl,
            };
        });
    });
};

export { avatarsMapper };
