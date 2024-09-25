import { type Composition } from 'shared';

type CreateVideoRequestDto = {
    name: string;
    url?: string;
    composition: Composition;
};

export { type CreateVideoRequestDto };
