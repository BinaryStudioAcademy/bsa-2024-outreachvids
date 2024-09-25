import { type Scene } from 'shared';

import { type AvatarData } from '~/common/services/azure-ai/avatar-video/types/types.js';

type SceneForRenderAvatar = Omit<Scene, 'avatar'> & {
    avatar: AvatarData;
};

export { type SceneForRenderAvatar };
