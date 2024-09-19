import { type Composition } from '../../avatar-videos/types/types.js';

type VideoGetAllItemResponseDto = {
    id: string;
    userId: string;
    name: string;
    url: string | null;
    previewUrl: string;
    composition: Composition;
};

export { type VideoGetAllItemResponseDto };
