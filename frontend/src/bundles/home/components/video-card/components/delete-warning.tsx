import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    LibraryButton as Button,
} from '~/bundles/common/components/components.js';
import { useRef } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
};

const DeleteWarning: React.FC<Properties> = ({ isOpen, onClose, onDelete }) => {
    const cancelReference = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelReference}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Video
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can&apos;t undo this action
                        afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelReference}
                            onClick={onClose}
                            variant="secondaryOutlined"
                        >
                            Cancel
                        </Button>

                        <Button onClick={onDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export { DeleteWarning };
