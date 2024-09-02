import { type Style } from './style.type.js';

type Avatar = {
    id: string | null;
    name: string;
    voice: string;
    voiceUrl: string;
    styles: Style[];
};

export { type Avatar };
