import { type SceneBackground } from './scene-background.type.js';

type SceneAvatar = {
    id: string;
    name: string;
    style: string;
    url: string;
};

type Scene = {
    id: string;
    duration: number;
    avatar?: SceneAvatar;
    background?: SceneBackground;
};

export { type Scene, type SceneAvatar };
