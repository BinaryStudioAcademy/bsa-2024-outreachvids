import { type Message } from '~/bundles/chat/types/types.js';
import { EMPTY_LENGTH } from '~/bundles/common/constants/constants.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

const generateMessageTemplate = (
    payload: GenerateVideoScriptRequestDto,
): string => {
    const { language, topic, tone, additionalInfo } = payload;
    const toneMessage = tone.length > 0 ? `, using a '${tone}' tone '` : '';
    const additionalInfoMessage =
        additionalInfo.length > 0
            ? `, to make a better script use this additional information: '${additionalInfo}'`
            : '';

    return `Create the script narration for a video,
        divided in scene, generate script on topic '${topic}'
        in '${language}' ${toneMessage} ${additionalInfoMessage}

        The response must be valid a JSON that has an array of objects with title for the corresponding scene and
        the description, dont return any other text, just the JSON.
    `;
};

const getVideoScriptMessageFromPayload = (
    payload: GenerateVideoScriptRequestDto,
    messages: Message[],
): string => {
    return messages.length === EMPTY_LENGTH
        ? generateMessageTemplate(payload)
        : `Please, generate another script:

            ${generateMessageTemplate(payload)}

            The response must be valid a JSON that has an array of objects with title for the corresponding scene and
            the description, dont return any other text, just the JSON.`;
};

export { getVideoScriptMessageFromPayload };
