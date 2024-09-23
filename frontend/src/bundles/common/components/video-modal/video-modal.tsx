import { useChatCleanup } from '~/bundles/chat/hooks/hooks.js';
import { Modal } from '~/bundles/common/components/components.js';

import { VideoModalContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const VideoModal: React.FC<Properties> = ({ isOpen, onClose }) => {
    const { handleCloseChat } = useChatCleanup({
        onModalChatClose: onClose,
    });

    return (
        <Modal isOpen={isOpen} onClose={handleCloseChat}>
            <VideoModalContent onClose={handleCloseChat} />
        </Modal>
    );
};

export { VideoModal };
