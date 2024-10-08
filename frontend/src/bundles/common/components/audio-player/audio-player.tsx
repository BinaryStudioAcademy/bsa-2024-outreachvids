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
    onAudioEnd: () => void;
    onSetDuration?: (duration: number) => void;
};

const AudioPlayer: React.FC<Properties> = ({
    isPlaying,
    audioUrl,
    onAudioEnd,
    onSetDuration,
}) => {
    const playerReference = useRef<PlayerRef>(null);

    const [durationInFrames, setDurationInFrames] = useState(1);

    useEffect(() => {
        if (durationInFrames > 1) {
            if (isPlaying) {
                playerReference.current?.play();
            } else {
                playerReference.current?.pauseAndReturnToPlayStart();
            }
        }
    }, [isPlaying, durationInFrames]);

    useEffect(() => {
        getAudioData(audioUrl)
            .then(({ durationInSeconds }) => {
                setDurationInFrames(Math.round(durationInSeconds * FPS));
                if (onSetDuration) {
                    onSetDuration(durationInSeconds);
                }
            })
            .catch(() => {
                setDurationInFrames(1);
            });
    }, [audioUrl, onSetDuration]);

    useEffect(() => {
        const player = playerReference.current;

        player?.addEventListener(AudioEvent.ENDED, onAudioEnd);

        return () => {
            player?.removeEventListener(AudioEvent.ENDED, onAudioEnd);
        };
    }, [onAudioEnd, playerReference]);

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
