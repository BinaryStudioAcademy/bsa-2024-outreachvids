import { useChatCleanup } from '~/bundles/chat/hooks/hooks.js';
import { Modal } from '~/bundles/common/components/components.js';

import { VideoModalContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onModalClose: () => void;
};

const VideoModal: React.FC<Properties> = ({ isOpen, onModalClose }) => {
    const { handleCloseChat } = useChatCleanup({
        onModalChatClose: onModalClose,
    });

    return (
        <Modal isOpen={isOpen} onClose={handleCloseChat}>
            <VideoModalContent />
        </Modal>
    );
};

export { VideoModal };
