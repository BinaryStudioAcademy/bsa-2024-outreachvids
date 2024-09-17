import { type Script } from 'shared';

import { defaultVoiceName } from '../components/video-menu/components/mock/voices-mock.js';
import { type Script as ScriptWithVoiceObject } from '../types/types.js';

const getVoicesConfigs = (scripts: ScriptWithVoiceObject[]): Script[] => {
    return scripts.map((script) => {
        return {
            duration: script.duration,
            text: script.text,
            id: script.id,
            voiceName: script.voice?.shortName ?? defaultVoiceName,
        };
    });
};

export { getVoicesConfigs };
