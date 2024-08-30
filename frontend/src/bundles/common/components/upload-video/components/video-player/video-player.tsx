import { useCallback, useRef, useState } from 'react';
import { type OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';

import { Box } from '~/bundles/common/components/components.js';

import { Control } from './components/components.js';
import { formatTime } from './libs/helpers/helpers.js';
import { type PlayerOptions } from './libs/types/types.js';

type Properties = {
    videoSource: string;
};

const VideoPlayer = ({ videoSource }: Properties): JSX.Element => {
    const videoPlayerReference = useRef<ReactPlayer | null>(null);

    const currentTime = videoPlayerReference.current
        ? videoPlayerReference.current.getCurrentTime()
        : 0;

    const duration = videoPlayerReference.current
        ? videoPlayerReference.current.getDuration()
        : 0;

    const formatCurrentTime = formatTime(currentTime);

    const formatDuration = formatTime(duration);

    const [videoState, setVideoState] = useState<PlayerOptions>({
        isPlaying: true,
        isMuted: false,
        volume: 0.5,
        played: 0,
        isSeeking: false,
    });

    const handlePlayPause = useCallback(() => {
        setVideoState({ ...videoState, isPlaying: !videoState.isPlaying });
    }, [videoState]);

    const onProgress = useCallback(
        (state: OnProgressProps) => {
            if (!videoState.isSeeking && videoState.isPlaying) {
                setVideoState({ ...videoState, played: state.played });

                if (state.played === 1) {
                    setVideoState({
                        ...videoState,
                        isPlaying: false,
                        played: state.played,
                    });
                }
            }
        },
        [videoState],
    );

    const handleSeek = useCallback(
        (value: number) => {
            setVideoState({
                ...videoState,
                played: value / 100,
            });
            (videoPlayerReference.current as ReactPlayer).seekTo(value / 100);
        },
        [videoState],
    );

    const handleOnSeekMouseDown = useCallback(() => {
        setVideoState({ ...videoState, isSeeking: true });
    }, [videoState]);

    const handleOnSeekMouseUp = useCallback(
        (value: number) => {
            setVideoState({ ...videoState, isSeeking: false });
            (videoPlayerReference.current as ReactPlayer).seekTo(value / 100);
        },
        [videoState],
    );

    const handleVolumeSeekUp = useCallback(
        (value: number) => {
            const newVolume = value / 100;

            setVideoState({
                ...videoState,
                volume: newVolume,
                isMuted: newVolume === 0 ? true : false,
            });
        },
        [videoState],
    );

    const handleMute = useCallback(() => {
        setVideoState({ ...videoState, isMuted: !videoState.isMuted });
    }, [videoState]);

    return (
        <Box
            height="278px"
            width="570px"
            border="2px solid transparent"
            boxSizing="content-box"
            position="relative"
            borderRadius="12px"
            backgroundColor="gray.200"
            overflow="hidden"
            transition="0.3s"
            _hover={{
                borderColor: 'background.900',
            }}
        >
            <ReactPlayer
                width="100%"
                height="100%"
                ref={videoPlayerReference}
                muted={videoState.isMuted}
                volume={videoState.volume}
                url={videoSource}
                playing={videoState.isPlaying}
                onProgress={onProgress}
            />

            <Control
                playerOptions={videoState}
                handlePlayPause={handlePlayPause}
                handleOnSeekMouseDown={handleOnSeekMouseDown}
                handleOnSeekMouseUp={handleOnSeekMouseUp}
                handleMute={handleMute}
                handleSeek={handleSeek}
                handleVolumeSeekUp={handleVolumeSeekUp}
                duration={formatDuration}
                currentTime={formatCurrentTime}
            />
        </Box>
    );
};

export { VideoPlayer };
