import { type Composition } from 'shared';

type Template = {
    id: string;
    userId: string | null;
    composition: Composition;
    previewUrl: string;
    name: string;
};

export { type Template };
