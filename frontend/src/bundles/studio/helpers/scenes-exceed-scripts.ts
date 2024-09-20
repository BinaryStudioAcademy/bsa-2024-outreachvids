import { type Scene, type Script } from '../types/types.js';

const scenesExceedScripts = (scenes: Scene[], scripts: Script[]): boolean => {
    const totalScenesDuration = scenes.reduce(
        (accumulator, scene) => accumulator + scene.duration,
        0,
    );
    const totalScriptsDuration = scripts.reduce(
        (accumulator, script) => accumulator + script.duration,
        0,
    );

    return totalScenesDuration > totalScriptsDuration;
};

export { scenesExceedScripts };
