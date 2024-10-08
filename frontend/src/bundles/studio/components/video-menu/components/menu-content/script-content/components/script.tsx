import {
    Editable,
    EditablePreview,
    EditableTextarea,
    HStack,
    Icon,
    IconButton,
    Spinner,
    Text,
    Tooltip,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { PlayIconNames } from '~/bundles/studio/enums/play-icon-names.enum.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type ScriptWithIcon as ScriptT } from '~/bundles/studio/types/types.js';

import styles from './styles.module.css';

type Properties = ScriptT & { handleChangeVoice: (scriptId: string) => void };

const Script: React.FC<Properties> = ({
    id,
    text,
    voice,
    url,
    iconName,
    handleChangeVoice,
}) => {
    const dispatch = useAppDispatch();

    const {
        isPlaying: playerIsPlaying,
        url: playerUrl,
        duration,
    } = useAppSelector(({ studio }) => studio.scriptPlayer);

    const isPlaying = useMemo(
        () => playerIsPlaying && playerUrl === url,
        [playerIsPlaying, playerUrl, url],
    );

    const handleDeleteScript = useCallback((): void => {
        void dispatch(studioActions.deleteScript(id));
    }, [dispatch, id]);

    const handleEditScript = useCallback(
        (newText: string): void => {
            if (text === newText) {
                return;
            }

            void dispatch(
                studioActions.editScript({ id, text: newText, url: '' }),
            );
        },
        [dispatch, id, text],
    );

    useEffect(() => {
        if (isPlaying && duration) {
            dispatch(studioActions.editScript({ id, duration }));
        }
    }, [dispatch, id, isPlaying, duration]);

    const toggleIsPlaying = useCallback((): void => {
        if (url) {
            dispatch(studioActions.playScript({ isPlaying: !isPlaying, url }));
            return;
        }

        void dispatch(
            studioActions.generateScriptSpeech({
                scriptId: id,
                text,
                voiceName: voice.shortName,
            }),
        );
    }, [dispatch, id, text, url, voice, isPlaying]);

    const iconComponent = useMemo(() => {
        if (iconName === PlayIconNames.LOADING) {
            return Spinner;
        }

        return isPlaying ? IconName.STOP : IconName.PLAY;
    }, [iconName, isPlaying]);

    const handleChangeVoiceId = useCallback((): void => {
        handleChangeVoice(id);
    }, [handleChangeVoice, id]);

    return (
        <VStack w="full">
            <HStack justify="space-between" w="full">
                <Text
                    onClick={handleChangeVoiceId}
                    cursor="pointer"
                    variant="link"
                >
                    {voice?.name || 'No voice'}
                </Text>
                <HStack gap={0}>
                    <Tooltip
                        isDisabled={Boolean(url)}
                        label="Click to update audio"
                        placement="top"
                        hasArrow
                    >
                        <IconButton
                            icon={<Icon as={iconComponent} />}
                            size="sm"
                            variant="ghostIconDark"
                            aria-label="Play script"
                            onClick={toggleIsPlaying}
                            borderRadius="100%"
                            border={url ? '' : '1px dotted'}
                        />
                    </Tooltip>
                    <IconButton
                        icon={<Icon as={IconName.CLOSE} />}
                        size="sm"
                        variant="ghostIconDark"
                        aria-label="Delete script"
                        onClick={handleDeleteScript}
                    />
                </HStack>
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
                    className={styles['no-scrollbar']}
                    h="full"
                    w="full"
                    p="8px 16px"
                    overflow="auto"
                    border="1px solid"
                    borderColor="background.600"
                />
                <EditableTextarea
                    className={styles['no-scrollbar']}
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
