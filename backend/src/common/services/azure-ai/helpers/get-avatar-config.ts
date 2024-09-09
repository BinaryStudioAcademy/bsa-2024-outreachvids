import {
    type RenderAvatarVideoApiRequestDto,
    type RenderAvatarVideoRequestDto,
} from '../apis/avatar-video/libs/types/types.js';
import {
    AVATAR_BACKGROUND_COLOR,
    AVATAR_INPUT_KIND,
    AVATAR_SUBTITLE_TYPE,
    AVATAR_VIDEO_CODEC,
    AVATAR_VIDEO_FORMAT,
} from '../constants/constants.js';

const getAvatarConfig = (
    payload: RenderAvatarVideoRequestDto,
): RenderAvatarVideoApiRequestDto => {
    const { avatarName, avatarStyle, text, voice } = payload;
    return {
        inputKind: AVATAR_INPUT_KIND,
        synthesisConfig: {
            voice,
        },
        avatarConfig: {
            talkingAvatarCharacter: avatarName,
            talkingAvatarStyle: avatarStyle,
            backgroundColor: AVATAR_BACKGROUND_COLOR,
            subtitleType: AVATAR_SUBTITLE_TYPE,
            videoCodec: AVATAR_VIDEO_CODEC,
            videoFormat: AVATAR_VIDEO_FORMAT,
        },
        inputs: [
            {
                content: text,
            },
        ],
    };
};

export { getAvatarConfig };
