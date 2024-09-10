import { type ModalProperties } from '~/bundles/common/components/components.js';
import { Modal } from '~/bundles/common/components/components.js';

import { VoicesModalContent } from './voices-modal-content.js';

const VoicesModal: React.FC<ModalProperties> = ({ isOpen, onModalClose }) => {
    return (
        <Modal isOpen={isOpen} onModalClose={onModalClose}>
            <VoicesModalContent />
        </Modal>
    );
};

export { VoicesModal };
