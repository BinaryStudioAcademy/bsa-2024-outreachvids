import { type Script } from 'shared';

import { type Script as ScriptWithVoiceObject } from '../types/types.js';

const getVoicesConfigs = (scripts: ScriptWithVoiceObject[]): Script[] => {
    return scripts.map((script) => {
        return {
            duration: script.duration,
            text: script.text,
            id: script.id,
            voiceName: script.voice?.shortName,
        };
    });
};

export { getVoicesConfigs };
