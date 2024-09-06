import { type MessageSender } from '~/bundles/chat/enums/message-sender.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type Message } from './message.js';

type MessageGroup = {
    sender: ValueOf<typeof MessageSender>;
    messages: Message[];
};

export { type MessageGroup };
