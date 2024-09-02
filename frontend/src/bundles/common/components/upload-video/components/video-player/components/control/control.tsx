import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '~/bundles/common/components/upload-video/components/video-player/libs/types/types.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';

import { VideoEvent } from './libs/enums/enums.js';
import { getTime } from './libs/helpers/helpers.js';
import { useAnimationFrame } from './libs/hooks/hooks.js';

type Properties = {
    videoPlayerReference: React.RefObject<PlayerRef>;
    duration: VideoDuration;
};

const Control = ({
    videoPlayerReference,
    duration,
}: Properties): JSX.Element => {
    const [videoState, setVideoState] = useState<PlayerOptions>({
        isPlaying: false,
        isMuted: false,
        wasPlaying: true,
        volume: 0.5,
        played: 0,
    });

    const time = getTime({
        played: videoState.played,
        durationInSeconds: duration.inSeconds,
    });

    const handleVideoEnd = useCallback(() => {
        setVideoState({
            ...videoState,
            isPlaying: false,
            played: 0,
            isMuted: videoPlayerReference.current?.isMuted() as boolean,
            wasPlaying: true,
        });
    }, [videoState, videoPlayerReference]);

    const updateSlider = (): void => {
        if (videoPlayerReference.current?.isPlaying()) {
            const currentTime =
                videoPlayerReference.current.getCurrentFrame() /
                duration.inFrames;

            setVideoState((previousState) => {
                return {
                    ...previousState,
                    played: currentTime * 100,
                };
            });
        }
    };

    useAnimationFrame(updateSlider, videoState.isPlaying);

    useEffect(() => {
        const player = videoPlayerReference.current;
        player?.addEventListener(VideoEvent.ENDED, handleVideoEnd);

        return () => {
            if (player) {
                player.removeEventListener(VideoEvent.ENDED, handleVideoEnd);
            }
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
            const currentTime = (duration.inFrames / 100) * value;

            setVideoState({
                ...videoState,
                played: value,
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
            isCurrentlyMuted && videoState.volume === 0
                ? 0.2
                : videoState.volume;
        const isMuted = !isCurrentlyMuted;

        setVideoState({
            ...videoState,
            volume: newVolume,
            isMuted: isMuted,
        });

        if (newVolume !== videoState.volume) {
            videoPlayerReference.current?.setVolume(newVolume);
        }
    }, [videoState, videoPlayerReference]);

    const handleVolumeSeekUp = useCallback(
        (value: number) => {
            const newVolume = value / 100;

            if (newVolume > 0 && videoPlayerReference.current?.isMuted()) {
                videoPlayerReference.current?.unmute();
            }

            setVideoState({
                ...videoState,
                volume: newVolume,
                isMuted: newVolume === 0 ? true : false,
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
                    p={0}
                    borderRadius="50%"
                    aria-label={videoState.isPlaying ? 'pause' : 'play'}
                    icon={
                        videoState.isPlaying ? (
                            <Icon as={FontAwesomeIcon} icon={IconName.PAUSE} />
                        ) : (
                            <Icon as={FontAwesomeIcon} icon={IconName.PLAY} />
                        )
                    }
                />

                <Box padding="1px 10px">
                    <Slider
                        width="270px"
                        onPointerDownCapture={handleOnSeekMouseDown}
                        onPointerUpCapture={handleOnSeekMouseUp}
                        onChange={handleSeek}
                        min={0}
                        max={100}
                        step={0.1}
                        value={videoState.played}
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
                        videoState.isMuted ? (
                            <Icon
                                as={FontAwesomeIcon}
                                icon={IconName.VOLUME_OFF}
                            />
                        ) : (
                            <Icon as={FontAwesomeIcon} icon={IconName.VOLUME} />
                        )
                    }
                />

                <Slider
                    marginLeft="10px"
                    value={videoState.volume * 100}
                    onChange={handleVolumeSeekUp}
                    min={0}
                    max={100}
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
