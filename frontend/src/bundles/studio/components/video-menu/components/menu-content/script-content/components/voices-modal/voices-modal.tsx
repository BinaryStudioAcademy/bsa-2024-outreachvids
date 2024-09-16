import { Modal } from '~/bundles/common/components/components.js';

import { VoicesModalContent } from './components/voices-modal-content.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
    scriptId: string | null;
};
const VoicesModal: React.FC<Properties> = ({ isOpen, onClose, scriptId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {scriptId && (
                <VoicesModalContent
                    scriptId={scriptId}
                    onModalClose={onClose}
                />
            )}
        </Modal>
    );
};

export { VoicesModal };
