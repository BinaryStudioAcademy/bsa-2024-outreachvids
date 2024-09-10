import { type Voice } from './types.js';

type Script = {
    id: string;
    duration: number;
    text: string;
    url?: string;
    voice?: Voice | undefined;
};

export { type Script };
