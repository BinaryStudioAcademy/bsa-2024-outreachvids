import { type VideoCodec, type VideoFormat } from './types.js';

type AvatarConfig = {
    talkingAvatarCharacter: string;
    talkingAvatarStyle: string;
    videoFormat: VideoFormat;
    videoCodec: VideoCodec;
    subtitleType: string;
    backgroundColor: string;
};

export { type AvatarConfig };
