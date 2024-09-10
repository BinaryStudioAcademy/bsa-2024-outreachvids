import {
    Editable,
    EditablePreview,
    EditableTextarea,
    HStack,
    Icon,
    IconButton,
    Spinner,
    Tooltip,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { AudioPlayer } from '~/bundles/studio/components/audio-player/audio-player.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Script as ScriptT } from '~/bundles/studio/types/types.js';

type Properties = ScriptT;

const Script: React.FC<Properties> = ({ id, text, voiceName, url }) => {
    const dispatch = useAppDispatch();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);

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

    const handleSetScriptDuration = useCallback(
        (duration: number): void => {
            void dispatch(studioActions.editScript({ id, duration }));
        },
        [dispatch, id],
    );

    const toggleIsPlaying = useCallback((): void => {
        if (url) {
            setIsPlaying((previous) => !previous);
            return;
        }

        setIsAudioLoading(true);

        void dispatch(
            studioActions.generateScriptSpeech({
                scriptId: id,
                text,
                voiceName,
            }),
        );
    }, [dispatch, id, text, url, voiceName]);

    const handleAudioEnd = useCallback((): void => {
        setIsPlaying(false);
    }, []);

    useEffect(() => {
        if (url) {
            setIsAudioLoading(false);
        }
    }, [url]);

    const iconComponent = useMemo(() => {
        if (isAudioLoading) {
            return Spinner;
        }

        return isPlaying ? IconName.STOP : IconName.PLAY;
    }, [isAudioLoading, isPlaying]);

    return (
        <VStack w="full">
            <HStack justify="end" w="full" gap={0}>
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
            {url && (
                <AudioPlayer
                    isPlaying={isPlaying}
                    audioUrl={url}
                    handleAudioEnd={handleAudioEnd}
                    handleSetDuration={handleSetScriptDuration}
                />
            )}
        </VStack>
    );
};

export { Script };
