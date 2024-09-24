import { type Scene, type Script } from '../types/types.js';

const INITIAL_DURATION = 0;

const scenesExceedScripts = (scenes: Scene[], scripts: Script[]): boolean => {
    const totalScenesDuration = scenes.reduce(
        (accumulator, scene) => accumulator + scene.duration,
        INITIAL_DURATION,
    );
    const totalScriptsDuration = scripts.reduce(
        (accumulator, script) => accumulator + script.duration,
        INITIAL_DURATION,
    );

    return totalScenesDuration > totalScriptsDuration;
};

export { scenesExceedScripts };