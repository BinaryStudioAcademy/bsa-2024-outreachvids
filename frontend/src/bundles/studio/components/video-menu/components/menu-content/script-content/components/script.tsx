import {
    Editable,
    EditablePreview,
    EditableTextarea,
    HStack,
    Icon,
    IconButton,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Script as ScriptT } from '~/bundles/studio/types/types.js';

type Properties = ScriptT & { handleChangeVoice: (scriptId: string) => void };

const Script: React.FC<Properties> = ({ id, text, handleChangeVoice }) => {
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

    const handleChangeVoiceId = useCallback((): void => {
        handleChangeVoice(id);
    }, [handleChangeVoice, id]);

    return (
        <VStack w="full">
            <HStack justifyContent="space-between" w="full">
                <Text
                    onClick={handleChangeVoiceId}
                    cursor={'pointer'}
                    variant="link"
                >
                    Test text
                </Text>
                <IconButton
                    icon={<Icon as={IconName.CLOSE} />}
                    size="sm"
                    variant="ghostIconDark"
                    aria-label="Delete script"
                    onClick={handleDeleteScript}
                />
            </HStack>
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
                    w="full"
                    p="8px 16px"
                    overflow="auto"
                    border="1px solid"
                    borderColor="background.600"
                />
                <EditableTextarea
                    h="full"
                    p="8px 16px"
                    resize="none"
                    border="1px solid"
                    borderColor="background.300"
                    _focus={{
                        boxShadow: 'none',
                    }}
                />
            </Editable>
        </VStack>
    );
};

export { Script };
