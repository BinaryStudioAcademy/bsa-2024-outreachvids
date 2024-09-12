import { type MessageSender } from '~/bundles/chat/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Message = {
    sender: ValueOf<typeof MessageSender>;
    text: string;
};

export { type Message };
