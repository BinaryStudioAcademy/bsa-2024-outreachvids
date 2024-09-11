import { type AvatarConfig } from './avatar-config.type.js';
import { type InputKind } from './input-kind.type.js';

type RenderAvatarVideoRequestDto = {
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

export { type RenderAvatarVideoRequestDto };
