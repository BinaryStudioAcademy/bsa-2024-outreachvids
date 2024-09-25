import { type Composition } from 'shared';

import { type SceneWithGeneratedAvatar } from './types.js';

type CompositionWithGeneratedAvatars = Omit<
    Composition,
    'scripts' | 'scenes'
> & {
    scenes: SceneWithGeneratedAvatar[];
};

export { type CompositionWithGeneratedAvatars };
