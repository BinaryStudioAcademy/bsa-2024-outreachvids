import { type RemotionAvatarScene } from '~/common/services/remotion/type/types.js';

import { FPS } from '../constants/fps.js';
import { type SceneWithGeneratedAvatar } from '../types/types.js';

const generatedAvatarToRemotionScene = (
    scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[],
): RemotionAvatarScene[] => {
    return scenesWithGeneratedAvatars.map((scene) => {
        return {
            ...scene,
            durationInFrames: Math.round(
                (scene.durationInMilliseconds / 1000) * FPS,
            ),
        };
    });
};

export { generatedAvatarToRemotionScene };
