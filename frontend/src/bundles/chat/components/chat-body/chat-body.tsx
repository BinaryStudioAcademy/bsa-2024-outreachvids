import { MessageList } from '~/bundles/chat/components/message-list/message-list.js';
import { type Message } from '~/bundles/chat/types/types.js';
import {
    Box,
    Loader,
    Overlay,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    messages: Message[];
};

const ChatBody: React.FC<Properties> = ({ messages }) => {
    const { dataStatus } = useAppSelector(({ chat }) => ({
        dataStatus: chat.dataStatus,
    }));

    return (
        <>
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>
            <Box minHeight="400px" maxHeight="400px" overflowY="auto" mb="2">
                <MessageList messages={messages} />
            </Box>
        </>
    );
};

export { ChatBody };
