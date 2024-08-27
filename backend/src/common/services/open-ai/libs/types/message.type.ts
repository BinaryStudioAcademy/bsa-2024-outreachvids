import { type ValueOf } from 'shared';

import { type OpenAIRole } from '../enums/enums.js';

type Message = {
    role: ValueOf<typeof OpenAIRole>;
    content: string;
};

export { type Message };
