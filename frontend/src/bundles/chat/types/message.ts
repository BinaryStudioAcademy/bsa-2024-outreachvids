import { type ValueOf } from '~/bundles/common/types/types.js';

import { type MessageSender } from '../enums/enums.js';

type Message = {
    sender: ValueOf<typeof MessageSender>;
    text: string;
};

export { type Message };
