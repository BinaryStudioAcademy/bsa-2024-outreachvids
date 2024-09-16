import { type Composition } from '../../avatar-videos/types/types.js';

type CreateVideoRequestDto = {
    name: string;
    url?: string;
    composition: Composition;
};

export { type CreateVideoRequestDto };
