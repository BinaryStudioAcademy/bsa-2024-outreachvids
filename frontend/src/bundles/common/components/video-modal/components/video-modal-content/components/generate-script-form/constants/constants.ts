import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

const DEFAULT_GENERATE_SCRIPT_PAYLOAD: GenerateVideoScriptRequestDto = {
    topic: '',
    language: 'english',
    tone: '',
    additionalInfo: '',
};

export { DEFAULT_GENERATE_SCRIPT_PAYLOAD };
