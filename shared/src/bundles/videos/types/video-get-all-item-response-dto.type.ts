import { type Composition } from 'shared';

type VideoGetAllItemResponseDto = {
    id: string;
    userId: string;
    name: string;
    url: string | null;
    previewUrl: string;
    composition: Composition;
    createdAt: string;
};

export { type VideoGetAllItemResponseDto };
