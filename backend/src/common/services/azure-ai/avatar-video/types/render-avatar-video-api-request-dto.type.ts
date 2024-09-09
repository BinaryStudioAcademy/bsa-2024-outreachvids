import { type AvatarConfig, type InputKind } from './types.js';

type RenderAvatarVideoApiRequestDto = {
    inputKind: InputKind;
    synthesisConfig: {
        voice: string;
    };
    inputs: [
        {
            content: string;
        },
    ];
    avatarConfig: AvatarConfig;
};

export { type RenderAvatarVideoApiRequestDto };
