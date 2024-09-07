import { config } from '~/common/config/config.js';
import { baseHttp } from '~/common/http/http.js';

import { TextToSpeechApi } from './text-to-speech-api.js';

const textToSpeechApi = new TextToSpeechApi({
    baseUrl: `https://${config.ENV.AZURE.SERVICE_REGION}.tts.speech.microsoft.com/cognitiveservices`,
    http: baseHttp,
});

export { avatarVideoApi } from './avatar-video/avatar-video.js';
export { textToSpeechApi };
