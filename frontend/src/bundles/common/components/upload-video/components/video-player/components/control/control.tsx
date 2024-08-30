import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import { type PlayerOptions } from '~/bundles/common/components/upload-video/components/video-player/libs/types/types.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';

type Properties = {
    handlePlayPause: () => void;
    handleSeek: (value: number) => void;
    handleVolumeSeekUp: (value: number) => void;
    handleMute: () => void;
    handleOnSeekMouseUp: (value: number) => void;
    handleOnSeekMouseDown: () => void;
    playerOptions: PlayerOptions;
    duration: string;
    currentTime: string;
};

const Control = ({
    handlePlayPause,
    handleSeek,
    handleMute,
    handleVolumeSeekUp,
    handleOnSeekMouseUp,
    handleOnSeekMouseDown,
    playerOptions,
    currentTime,
    duration,
}: Properties): JSX.Element => {
    const { played, isPlaying, volume, isMuted } = playerOptions;
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
                    aria-label={isPlaying ? 'pause' : 'play'}
                    icon={
                        isPlaying ? (
                            <Icon as={FontAwesomeIcon} icon={IconName.PAUSE} />
                        ) : (
                            <Icon as={FontAwesomeIcon} icon={IconName.PLAY} />
                        )
                    }
                />

                <Box
                    onPointerDownCapture={handleOnSeekMouseDown}
                    padding="1px 10px"
                >
                    <Slider
                        width="270px"
                        onChangeEnd={handleOnSeekMouseUp}
                        onChange={handleSeek}
                        min={0}
                        max={100}
                        step={0.1}
                        value={played * 100}
                    >
                        <SliderTrack backgroundColor="background.100">
                            <SliderFilledTrack backgroundColor="brand.secondary.300" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Text fontSize="13px">
                    {currentTime} : {duration}
                </Text>

                <IconButton
                    width="10px"
                    onClick={handleMute}
                    backgroundColor="background.600"
                    p={0}
                    borderRadius="50%"
                    aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
                    icon={
                        isMuted ? (
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
                    value={volume * 100}
                    onChange={handleVolumeSeekUp}
                    min={0}
                    max={100}
                    step={1}
                    width="50px"
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
