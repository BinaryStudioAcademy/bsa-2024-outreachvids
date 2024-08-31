import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react';

import {
    Icon,
    IconButton,
    VStack,
} from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Script as ScriptT } from '~/bundles/studio/types/studio.type.js';

type Properties = ScriptT;

const Script: React.FC<Properties> = ({ id, text }) => {
    const dispatch = useAppDispatch();

    const handleDeleteScript = useCallback((): void => {
        void dispatch(studioActions.deleteScript(id));
    }, [dispatch, id]);

    const handleEditScript = useCallback(
        (newText: string): void => {
            void dispatch(studioActions.editScript({ id, text: newText }));
        },
        [dispatch, id],
    );

    return (
        <VStack w="full">
            <IconButton
                icon={<Icon as={IconName.CLOSE} />}
                size="sm"
                variant="ghostIconDark"
                aria-label="Delete script"
                alignSelf="end"
                onClick={handleDeleteScript}
            />
            <Editable
                defaultValue={text}
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                submitOnBlur={true}
                onSubmit={handleEditScript}
                h="95px"
                w="full"
            >
                <EditablePreview
                    h="full"
                    p="8px 16px"
                    sx={{
                        overflow: 'auto',
                        border: '1px solid',
                        borderColor: 'background.600',
                    }}
                />
                <EditableTextarea
                    h="full"
                    p="8px 16px"
                    resize="none"
                    sx={{
                        border: '1px solid',
                        borderColor: 'background.300',
                    }}
                    _focus={{
                        boxShadow: 'none',
                    }}
                />
            </Editable>
        </VStack>
    );
};

export { Script };
