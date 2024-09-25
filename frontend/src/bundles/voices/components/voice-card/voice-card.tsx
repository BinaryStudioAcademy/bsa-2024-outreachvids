import { v4 as uuidv4 } from 'uuid';

import {
    Card,
    CardBody,
    HStack,
    Spinner,
    Text,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/control/control.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Voice } from '~/bundles/studio/types/types.js';

type Properties = {
    voice: Voice;
};

const VoiceCard: React.FC<Properties> = ({ voice }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const text = 'Sample text';

    const { isPlaying: playerIsPlaying, url: playerUrl } = useAppSelector(
        ({ studio }) => studio.scriptPlayer,
    );

    const isPlaying = useMemo(
        () => playerIsPlaying && playerUrl === url,
        [playerIsPlaying, playerUrl, url],
    );
    const handlePlayClick = useCallback(
        (event: React.MouseEvent): void => {
            event.stopPropagation();
            if (isLoading) {
                return;
            }
            if (url) {
                dispatch(
                    studioActions.playScript({ isPlaying: !isPlaying, url }),
                );
                return;
            }
            setIsLoading(true);
            void dispatch(
                studioActions.generateScriptSpeechPreview({
                    scriptId: uuidv4(),
                    text,
                    voiceName: voice.shortName,
                }),
            )
                .unwrap()
                .then(({ audioUrl }) => {
                    setUrl(audioUrl);
                    setIsLoading(false);
                    dispatch(
                        studioActions.playScript({
                            isPlaying: true,
                            url: audioUrl,
                        }),
                    );
                });
        },
        [
            dispatch,
            text,
            url,
            voice,
            isPlaying,
            setUrl,
            setIsLoading,
            isLoading,
        ],
    );
    // const handleCardClick = useCallback((): void => {
    //     onClick(voice, url);
    // }, [onClick, voice, url]);

    const iconComponent = useMemo(() => {
        if (isLoading) {
            return Spinner;
        }
        if (!url) {
            return IconName.DOWNLOAD;
        }
        return isPlaying ? IconName.STOP : IconName.PLAY;
    }, [isPlaying, isLoading, url]);

    return (
        <Card
            cursor="pointer"
            // onClick={handleCardClick}
        >
            <CardBody>
                <HStack>
                    <Control
                        label={isPlaying ? 'Pause' : 'Play voice'}
                        size={IconSize.SMALL}
                        icon={iconComponent}
                        onClick={handlePlayClick}
                    />
                    <Text variant="body1" color={'text.default'}>
                        {voice.name}
                    </Text>
                </HStack>
            </CardBody>
        </Card>
    );
};

export { VoiceCard };
