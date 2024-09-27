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
import { actions as homeActions } from '~/bundles/home/store/home.js';
import { type Voice } from '~/bundles/home/types/types.js';
import { Control } from '~/bundles/studio/components/control/control.js';
import { TEXT_FOR_VOICES } from '~/bundles/voices/constants/constants.js';

type Properties = {
    voice: Voice;
};

const VoiceCard: React.FC<Properties> = ({ voice }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const { isPlaying: playerIsPlaying, url: playerUrl } = useAppSelector(
        ({ home }) => home.voicePlayer,
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
                dispatch(homeActions.playVoice({ isPlaying: !isPlaying, url }));
                return;
            }
            setIsLoading(true);
            void dispatch(
                homeActions.generateScriptSpeechPreview({
                    scriptId: uuidv4(),
                    text: TEXT_FOR_VOICES,
                    voiceName: voice.shortName,
                }),
            )
                .unwrap()
                .then(({ audioUrl }) => {
                    setUrl(audioUrl);
                    setIsLoading(false);
                    dispatch(
                        homeActions.playVoice({
                            isPlaying: true,
                            url: audioUrl,
                        }),
                    );
                });
        },
        [dispatch, url, voice, isPlaying, setUrl, setIsLoading, isLoading],
    );
    const handleLikeClick = useCallback((): void => {
        dispatch(homeActions.toogleVoiceLike(voice.shortName));
    }, [voice, dispatch]);

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
        <Card cursor="pointer">
            <CardBody>
                <HStack>
                    <Control
                        label={isPlaying ? 'Pause' : 'Play voice'}
                        size={IconSize.SMALL}
                        icon={iconComponent}
                        onClick={handlePlayClick}
                    />
                    <Text variant="body1" color={'text.default'} flexGrow={1}>
                        {voice.name}
                    </Text>
                    <Control
                        label={voice.isLiked ? 'Unlike' : 'Like'}
                        size={IconSize.LARGE}
                        icon={
                            voice.isLiked
                                ? IconName.HEART_FILL
                                : IconName.HEART_OUTLINE
                        }
                        onClick={handleLikeClick}
                        variant="ghost"
                        iconColor="brand.secondary.600"
                    />
                </HStack>
            </CardBody>
        </Card>
    );
};

export { VoiceCard };
