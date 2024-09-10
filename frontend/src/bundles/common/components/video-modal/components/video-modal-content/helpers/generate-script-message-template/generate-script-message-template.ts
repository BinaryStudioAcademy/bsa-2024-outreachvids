import { type Message } from '~/bundles/chat/types/types.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

const generateMessageTemplate = (
    payload: GenerateVideoScriptRequestDto,
): string => {
    const { language, topic, tone, additionalInfo } = payload;
    const additionalInfoMessage =
        additionalInfo.length > 0
            ? `, to make a better script use this additional information: '${additionalInfo}'`
            : '';

    return `Create the script narration for a video,
        divided in scene, generate script on topic '${topic}'
        in '${language}' using a '${tone}' tone ${additionalInfoMessage}

        The response must be valid a JSON that has an array of objects with title for the corresponding scene and
        the description, dont return any other text, just the JSON.
    `;
};

const getVideoScriptMessageFromPayload = (
    payload: GenerateVideoScriptRequestDto,
    messages: Message[],
): string => {
    return messages.length === 0
        ? generateMessageTemplate(payload)
        : `Please, generate another script from the info provided before.

        The response must be valid a JSON that has an array of objects with title for the corresponding scene and
        the description, dont return any other text, just the JSON.`;
};

export { getVideoScriptMessageFromPayload };
