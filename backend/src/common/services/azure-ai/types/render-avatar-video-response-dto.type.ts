import { type InputKind, type VideoCodec, type VideoFormat } from './types.js';

type RenderAvatarVideoResponseDto = {
    id: string;
    internalId: string;
    status: string;
    createdDateTime: string;
    lastActionDateTime: string;
    inputKind: InputKind;
    properties: {
        timeToLiveInHours: number;
    };
    avatarConfig: {
        talkingAvatarCharacter: string;
        talkingAvatarStyle: string;
        videoFormat: VideoFormat;
        videoCodec: VideoCodec;
        subtitleType: string;
        bitrateKbps: number;
        customized: boolean;
    };
};

export { type RenderAvatarVideoResponseDto };
