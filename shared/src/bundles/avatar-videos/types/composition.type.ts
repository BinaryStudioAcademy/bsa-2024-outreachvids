import { type Scene } from './scene.type.js';
import { type Script } from './script.type.js';
import { type VideoOrientation } from './video-orientation.type.js';

type Composition = {
    scenes: Scene[];
    scripts: Script[];
    videoOrientation: VideoOrientation;
};

export { type Composition };
