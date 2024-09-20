import { type Composition } from './composition.type.js';

type RenderAvatarVideoRequestDto = {
    composition: Composition;
    name: string;
    videoId?: string;
};

export { type RenderAvatarVideoRequestDto };
