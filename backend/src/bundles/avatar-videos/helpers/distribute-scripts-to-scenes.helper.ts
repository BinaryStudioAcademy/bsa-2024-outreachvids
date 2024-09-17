import { type AvatarData } from '~/common/services/azure-ai/avatar-video/types/types.js';

import { ScriptProcessor } from '../services/script-processor.service.js';
import { type Scene, type Script } from '../types/types.js';

function distributeScriptsToScenes({
    scenes,
    scripts,
}: {
    scenes: Scene[];
    scripts: Script[];
}): AvatarData[] {
    const processor = new ScriptProcessor(scenes, scripts);
    return processor.distributeScriptsToScenes();
}

export { distributeScriptsToScenes };
