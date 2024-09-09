type SceneAvatar = {
    id: string;
    style: string;
    url: string;
};

type Scene = {
    id: string;
    duration: number;
    avatar?: SceneAvatar;
};

export { type Scene, type SceneAvatar };
