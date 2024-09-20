import { type Script, type Voice } from './types.js';

type addScriptRequest = {
    text: string;
    scripts: Array<Script>;
    rangeEnd: number;
    voice: Voice;
};

export { type addScriptRequest };
