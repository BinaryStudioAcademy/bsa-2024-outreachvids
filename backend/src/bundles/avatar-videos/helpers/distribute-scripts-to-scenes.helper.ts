import { ScriptProcessor } from '../services/script-processor.service.js';
import {
    type Scene,
    type SceneForRenderAvatar,
    type Script,
} from '../types/types.js';

function distributeScriptsToScenes({
    scenes,
    scripts,
}: {
    scenes: Scene[];
    scripts: Script[];
}): SceneForRenderAvatar[] {
    const processor = new ScriptProcessor(scenes, scripts);
    return processor.distributeScriptsToScenes();
}

export { distributeScriptsToScenes };
