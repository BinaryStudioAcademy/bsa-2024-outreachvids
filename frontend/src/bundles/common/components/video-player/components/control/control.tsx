import { type PlayerRef } from '@remotion/player';

import {
    Box,
    Flex,
    HStack,
    Icon,
    IconButton,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from '~/bundles/common/components/components.js';
import {
    type PlayerOptions,
    type VideoDuration,
} from '~/bundles/common/components/video-player/libs/types/types.js';
import { EMPTY_LENGTH } from '~/bundles/common/constants/constants.js';
import {
    useAnimationFrame,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';

import {
    MAX_PERCENT,
    MAX_VOLUME,
    MIN_VOLUME,
} from './libs/constants/constants.js';
import { VideoEvent } from './libs/enums/enums.js';
import { getTime } from './libs/helpers/helpers.js';

type Properties = {
    videoPlayerReference: React.RefObject<PlayerRef>;
    duration: VideoDuration;
};

const Control: React.FC<Properties> = ({ videoPlayerReference, duration }) => {
    const [videoState, setVideoState] = useState<PlayerOptions>({
        isPlaying: false,
        isMuted: false,
        wasPlaying: true,
        volume: MAX_VOLUME / 2,
        playedPercent: 0,
    });

    const time = getTime({
        played: videoState.playedPercent,
        durationInSeconds: duration.inSeconds,
    });

    const handleVideoEnd = useCallback(() => {
        setVideoState({
            ...videoState,
            isPlaying: false,
            playedPercent: 0,
            isMuted: videoPlayerReference.current?.isMuted() as boolean,
            wasPlaying: true,
        });
    }, [videoState, videoPlayerReference]);

    const handleSliderUpdate = (): void => {
        if (videoPlayerReference.current?.isPlaying()) {
            const currentTime =
                videoPlayerReference.current.getCurrentFrame() /
                duration.inFrames;

            setVideoState((previousState) => {
                return {
                    ...previousState,
                    playedPercent: currentTime * MAX_PERCENT,
                };
            });
        }
    };

    useAnimationFrame(handleSliderUpdate, videoState.isPlaying);

    useEffect(() => {
        const player = videoPlayerReference.current;
        player?.addEventListener(VideoEvent.ENDED, handleVideoEnd);

        return () => {
            player?.removeEventListener(VideoEvent.ENDED, handleVideoEnd);
        };
    }, [videoPlayerReference, handleVideoEnd]);

    const handlePlayPause = useCallback(() => {
        videoPlayerReference.current?.toggle();
        setVideoState({
            ...videoState,
            isPlaying: videoPlayerReference.current?.isPlaying() as boolean,
            wasPlaying: !videoPlayerReference.current?.isPlaying() as boolean,
        });
    }, [videoState, videoPlayerReference]);

    const handleSeek = useCallback(
        (value: number) => {
            const currentTime = (duration.inFrames / MAX_PERCENT) * value;

            setVideoState({
                ...videoState,
                playedPercent: value,
            });
            (videoPlayerReference.current as PlayerRef).seekTo(currentTime);
        },
        [videoState, videoPlayerReference, duration.inFrames],
    );

    const handleOnSeekMouseDown = useCallback(() => {
        setVideoState({
            ...videoState,
            isPlaying: false,
        });
        (videoPlayerReference.current as PlayerRef).pause();
    }, [videoState, videoPlayerReference]);

    const handleOnSeekMouseUp = useCallback(() => {
        videoState.wasPlaying
            ? videoPlayerReference.current?.pause()
            : videoPlayerReference.current?.play();

        setVideoState({
            ...videoState,
            isPlaying: videoPlayerReference.current?.isPlaying() ? true : false,
        });
    }, [videoState, videoPlayerReference]);

    const handleMute = useCallback(() => {
        const isCurrentlyMuted = videoPlayerReference.current?.isMuted();

        isCurrentlyMuted
            ? videoPlayerReference.current?.unmute()
            : videoPlayerReference.current?.mute();

        const newVolume =
            isCurrentlyMuted && videoState.volume === EMPTY_LENGTH
                ? MIN_VOLUME
                : videoState.volume;
        const isMuted = !isCurrentlyMuted;

        setVideoState({
            ...videoState,
            volume: newVolume,
            isMuted,
        });

        if (newVolume !== videoState.volume) {
            videoPlayerReference.current?.setVolume(newVolume);
        }
    }, [videoState, videoPlayerReference]);

    const handleVolumeSeekUp = useCallback(
        (value: number) => {
            const newVolume = value / MAX_PERCENT;

            if (newVolume > 0 && videoPlayerReference.current?.isMuted()) {
                videoPlayerReference.current?.unmute();
            }

            setVideoState({
                ...videoState,
                volume: newVolume,
                isMuted: newVolume === EMPTY_LENGTH ? true : false,
            });
            videoPlayerReference.current?.setVolume(newVolume);
        },
        [videoState, videoPlayerReference],
    );

    return (
        <Flex
            borderRadius="12px"
            height="47px"
            position="absolute"
            bottom="0"
            left="50%"
            transform="translate(-50%, -50%)"
            maxWidth="540px"
            width="100%"
            bg="background.900"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <HStack>
                <IconButton
                    onClick={handlePlayPause}
                    backgroundColor="background.600"
                    borderRadius="50%"
                    aria-label={videoState.isPlaying ? 'pause' : 'play'}
                    icon={
                        <Icon
                            as={
                                videoState.isPlaying
                                    ? IconName.PAUSE
                                    : IconName.PLAY
                            }
                        />
                    }
                />

                <Box padding="1px 5px">
                    <Slider
                        width="270px"
                        onPointerDownCapture={handleOnSeekMouseDown}
                        onPointerUpCapture={handleOnSeekMouseUp}
                        onChange={handleSeek}
                        min={0}
                        max={MAX_PERCENT}
                        step={0.1}
                        value={videoState.playedPercent}
                    >
                        <SliderTrack backgroundColor="background.100">
                            <SliderFilledTrack backgroundColor="brand.secondary.300" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Text fontSize="13px">{time}</Text>

                <IconButton
                    width="10px"
                    onClick={handleMute}
                    backgroundColor="background.600"
                    borderRadius="50%"
                    aria-label={
                        videoState.isMuted ? 'Unmute volume' : 'Mute volume'
                    }
                    icon={
                        <Icon
                            as={
                                videoState.isMuted
                                    ? IconName.VOLUME_OFF
                                    : IconName.VOLUME
                            }
                        />
                    }
                />

                <Slider
                    marginLeft="5px"
                    value={videoState.volume * MAX_PERCENT}
                    onChange={handleVolumeSeekUp}
                    min={0}
                    max={MAX_PERCENT}
                    step={1}
                    width="40px"
                >
                    <SliderTrack backgroundColor="background.900">
                        <SliderFilledTrack backgroundColor="brand.secondary.300" />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </HStack>
        </Flex>
    );
};

export { Control };
