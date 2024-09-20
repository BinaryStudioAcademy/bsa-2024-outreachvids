import { type RemotionAvatarScene } from '~/common/services/remotion/type/types.js';

import { FPS } from '../constants/fps.js';
import { type GeneratedAvatarData } from '../types/types.js';

const generatedAvatarToRemotionScene = (
    generatedAvatars: GeneratedAvatarData[],
): RemotionAvatarScene[] => {
    return generatedAvatars.map((avatar) => {
        return {
            id: avatar.id,
            url: avatar.url,
            durationInFrames: Math.round(
                (avatar.durationInMilliseconds / 1000) * FPS,
            ),
        };
    });
};

export { generatedAvatarToRemotionScene };
