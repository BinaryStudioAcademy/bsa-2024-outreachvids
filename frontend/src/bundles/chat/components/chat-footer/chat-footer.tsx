import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { ChatForm } from '../chat-form/chat-form.js';

const ChatFooter: React.FC = () => {
    const handleSubmit = useCallback((): void => {}, []);

    return (
        <>
            <ChatForm onSubmit={handleSubmit} />
        </>
    );
};

export { ChatFooter };
