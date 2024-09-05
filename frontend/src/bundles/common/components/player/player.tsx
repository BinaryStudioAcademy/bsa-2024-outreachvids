import { type PlayerRef, Player as LibraryPlayer } from '@remotion/player';
import { type RefObject } from 'react';

import { Box } from '~/bundles/common/components/components.js';

import styles from './player.module.css';

type Properties = {
    orientation: 'landscape' | 'portrait';
    durationInFrames: number;
    playerRef: RefObject<PlayerRef>;
    VideoComponent: React.FC;
};

const Player = ({
    orientation,
    durationInFrames,
    playerRef,
    VideoComponent,
}: Properties): JSX.Element => {
    const size =
        orientation === 'landscape'
            ? { width: 1920, height: 1080 }
            : { width: 1080, height: 1920 };

    return (
        <Box
            className={styles['outerBox']}
        >
            <LibraryPlayer
                ref={playerRef}
                component={VideoComponent}
                durationInFrames={durationInFrames}
                compositionWidth={size.width}
                compositionHeight={size.height}
                fps={30}
                style={{
                    height: '100%',
                    maxWidth: '100%',
                }}
            />
        </Box>
    );
};

export { Player };
