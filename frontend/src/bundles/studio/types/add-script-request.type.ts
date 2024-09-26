import { type Script } from './types.js';

type addScriptRequest = {
    text: string;
    scripts: Array<Script>;
    rangeEnd: number;
};

export { type addScriptRequest };
