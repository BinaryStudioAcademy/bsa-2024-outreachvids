import { type Scene } from 'shared';

type RemotionAvatarScene = Omit<Scene, 'duration' | 'avatar'> & {
    avatar: {
        url: string;
    };
    durationInFrames: number;
};

export { type RemotionAvatarScene };
