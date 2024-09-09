import { type ModalProperties } from '~/bundles/common/components/components.js';
import { Modal } from '~/bundles/common/components/components.js';

import { VideoModalContent } from './components/components.js';

const VideoModal: React.FC<ModalProperties> = ({ isOpen, onModalClose }) => {
    return (
        <Modal isOpen={isOpen} onModalClose={onModalClose}>
            <VideoModalContent />
        </Modal>
    );
};

export { VideoModal };
