import { type Scene } from './types.js';

type SceneWithGeneratedAvatar = Omit<Scene, 'avatar' | 'duration'> & {
    avatar: {
        url: string;
    };
    durationInMilliseconds: number;
};

export { type SceneWithGeneratedAvatar };
