import { type ValueOf } from '~/bundles/common/types/types.js';

import { type MessageSender } from '../enums/message-sender.js';
import { type Message } from './message.js';

type MessageGroup = {
    sender: ValueOf<typeof MessageSender>;
    messages: Message[];
};

export { type MessageGroup };
