import { type RemotionAvatarScene } from '~/common/services/remotion/type/types.js';

const getTotalDuration = (scenes: RemotionAvatarScene[]): number => {
    return scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
};

export { getTotalDuration };
