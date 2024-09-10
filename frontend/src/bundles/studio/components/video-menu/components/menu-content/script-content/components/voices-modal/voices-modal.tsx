import { type ModalProperties } from '~/bundles/common/components/components.js';
import { Modal } from '~/bundles/common/components/components.js';

import { VoicesModalContent } from './components/voices-modal-content.js';

type Properties = ModalProperties & {
    scriptId: string | null;
};
const VoicesModal: React.FC<Properties> = ({
    isOpen,
    onModalClose,
    scriptId,
}) => {
    return (
        <Modal isOpen={isOpen} onModalClose={onModalClose}>
            {scriptId && (
                <VoicesModalContent
                    scriptId={scriptId}
                    onModalClose={onModalClose}
                />
            )}
        </Modal>
    );
};

export { VoicesModal };
