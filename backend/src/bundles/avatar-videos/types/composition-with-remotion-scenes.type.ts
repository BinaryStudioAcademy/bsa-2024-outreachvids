import { type Composition } from 'shared';

import { type RemotionAvatarScene } from '~/common/services/remotion/type/remotion-avatar-scene.js';

type CompositionWithRemotionScenes = Omit<Composition, 'scripts' | 'scenes'> & {
    scenes: RemotionAvatarScene[];
};

export { type CompositionWithRemotionScenes };
