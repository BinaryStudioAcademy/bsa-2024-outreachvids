import {
    BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';

import { WarningContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

const WarningModal: React.FC<Properties> = ({ isOpen, onClose, onSubmit }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody p="40px">
                    <WarningContent onCancel={onClose} onSubmit={onSubmit} />
                </ModalBody>
            </ModalContent>
        </BaseModal>
    );
};

export { WarningModal };
