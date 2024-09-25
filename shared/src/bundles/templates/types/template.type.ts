import { type Composition } from '../../avatar-videos/types/composition.type.js';

type Template = {
    id: string;
    userId: string | null;
    composition: Composition;
    previewUrl: string;
    name: string;
};

export { type Template };
