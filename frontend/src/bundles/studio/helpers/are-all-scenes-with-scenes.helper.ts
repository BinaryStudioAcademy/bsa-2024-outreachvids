import { type Scene } from '../types/types.js';

function areAllScenesWithAvatar(scenes: Scene[]): boolean {
    return scenes.every((scene) => scene.avatar !== undefined);
}

export { areAllScenesWithAvatar };
