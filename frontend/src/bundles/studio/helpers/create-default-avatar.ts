import {
    type AvatarGetResponseDto,
    type SceneAvatar,
} from '~/bundles/studio/types/types.js';

const createDefaultAvatarFromRequest = (
    avatar: AvatarGetResponseDto | undefined,
): SceneAvatar | undefined => {
    if (!avatar) {
        return;
    }

    const avatarStyle = avatar.styles[0];
    if (!avatarStyle) {
        return;
    }

    return {
        id: avatar.id,
        name: avatar.name,
        style: avatarStyle.style,
        url: avatarStyle.imgUrl,
    };
};

export { createDefaultAvatarFromRequest };
