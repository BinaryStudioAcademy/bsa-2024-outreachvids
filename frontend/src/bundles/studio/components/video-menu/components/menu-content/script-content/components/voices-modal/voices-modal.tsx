import { Modal } from '~/bundles/common/components/components.js';

import { VoicesModalContent } from './components/voices-modal-content.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
    scriptId: string | null;
    modalReference: React.RefObject<HTMLDivElement>;
};
const VoicesModal: React.FC<Properties> = ({
    isOpen,
    onClose,
    scriptId,
    modalReference,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            modalReference={modalReference}
            scrollBehavior="inside"
        >
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
