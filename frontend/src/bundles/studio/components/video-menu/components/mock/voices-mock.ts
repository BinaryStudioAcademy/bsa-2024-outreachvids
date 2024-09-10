import { v4 as uuidv4 } from 'uuid';

import { type Voice } from '~/bundles/studio/types/types.js';

const mockVoices: Voice[] = Array.from({ length: 10 }, (_, index) => ({
    id: uuidv4(),
    name: `Voice ${index + 1}`,
}));

export { mockVoices };