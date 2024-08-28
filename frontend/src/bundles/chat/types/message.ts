import { type ValueOf } from '~/bundles/common/types/types.js';

import { type MessageSender } from '../enums/enums.js';

type Message = {
    id: number;
    sender: ValueOf<typeof MessageSender>;
    text: string;
    timeStamp: Date;
};

export { type Message };
