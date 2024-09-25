import { type Composition } from 'shared';

import { type SceneForRenderAvatar } from './types.js';

type CompositionWithScenesForRenderAvatar = Omit<
    Composition,
    'scripts' | 'scenes'
> & {
    scenes: SceneForRenderAvatar[];
};

export { type CompositionWithScenesForRenderAvatar };
