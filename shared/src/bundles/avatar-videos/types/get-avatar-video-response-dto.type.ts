import { type InputKind } from './input-kind.type.js';
import { type VideoCodec, type VideoFormat } from './types.js';

type GetAvatarVideoResponseDto = {
    id: string;
    internalId: string;
    status: string;
    createdDateTime: string;
    lastActionDateTime: string;
    inputKind: InputKind;
    properties: {
        timeToLiveInHours: number;
        sizeInBytes: number;
        durationInMilliseconds: number;
        succeededCount: number;
        failedCount: number;
        billingDetails: {
            neuralCharacters: number;
            talkingAvatarDurationSeconds: number;
        };
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
    outputs: {
        result: string;
        summary: string;
    };
};

export { type GetAvatarVideoResponseDto };
