import { EMPTY_LENGTH } from '~/bundles/common/constants/constants.js';
import { type Voice } from '~/bundles/studio/types/types.js';

// TODO: remove when we will have voices in store
const defaultVoiceName = 'en-US-BrianMultilingualNeural';

const mockVoices: Voice[] = Array.from({ length: 10 }, (_, index) => ({
    name: `Voice ${index + 1}`,
    shortName:
        index === EMPTY_LENGTH ? defaultVoiceName : defaultVoiceName + index,
    locale: '',
    localeName: '',
    voiceType: '',
}));

export { defaultVoiceName, mockVoices };
