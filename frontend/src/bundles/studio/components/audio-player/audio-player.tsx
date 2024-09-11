import { getAudioData } from '@remotion/media-utils';
import { type PlayerRef } from '@remotion/player';

import {
    Audio,
    LibraryPlayer,
} from '~/bundles/common/components/components.js';
import { useEffect, useRef, useState } from '~/bundles/common/hooks/hooks.js';

import { FPS } from './constants/constants.js';
import { AudioEvent } from './enums/enums.js';

type Properties = {
    isPlaying: boolean;
    audioUrl: string;
    handleAudioEnd: () => void;
    handleSetDuration: (duration: number) => void;
};

const AudioPlayer: React.FC<Properties> = ({
    isPlaying,
    audioUrl,
    handleAudioEnd,
    handleSetDuration,
}) => {
    const playerReference = useRef<PlayerRef>(null);

    const [durationInFrames, setDurationInFrames] = useState(1);

    useEffect(() => {
        if (isPlaying) {
            playerReference.current?.play();
        } else {
            playerReference.current?.pauseAndReturnToPlayStart();
        }
    }, [isPlaying]);

    useEffect(() => {
        getAudioData(audioUrl)
            .then(({ durationInSeconds }) => {
                setDurationInFrames(Math.round(durationInSeconds * FPS));
                handleSetDuration(durationInSeconds);
            })
            .catch(() => {
                setDurationInFrames(1);
            });
    }, [audioUrl, handleSetDuration]);

    useEffect(() => {
        const player = playerReference.current;

        player?.addEventListener(AudioEvent.ENDED, handleAudioEnd);

        return () => {
            player?.removeEventListener(AudioEvent.ENDED, handleAudioEnd);
        };
    }, [handleAudioEnd, playerReference]);

    return (
        <LibraryPlayer
            ref={playerReference}
            component={Audio}
            inputProps={{ src: audioUrl }}
            fps={FPS}
            durationInFrames={durationInFrames}
            compositionWidth={1}
            compositionHeight={1}
            style={{ position: 'absolute' }}
        />
    );
};

export { AudioPlayer };
