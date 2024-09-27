import {
    BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const WarningModal: React.FC<React.PropsWithChildren<Properties>> = ({
    isOpen,
    onClose,
    children,
}) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody p="40px">{children}</ModalBody>
            </ModalContent>
        </BaseModal>
    );
};

export { WarningModal };
