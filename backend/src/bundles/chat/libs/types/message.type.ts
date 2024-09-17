import { type ValueOf } from 'shared';

import { type OpenAIRole } from '~/common/services/open-ai/libs/enums/enums.js';

type Message = {
    role: ValueOf<typeof OpenAIRole>;
    content: string;
};

export { type Message };
