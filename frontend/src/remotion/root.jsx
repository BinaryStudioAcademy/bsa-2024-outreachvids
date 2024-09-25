// Using .js extension to avoid TypeScript issues with Remotion's rendering process.
import { Composition } from 'remotion';
import {
    FPS,
    LANDSCAPE_HEIGHT,
    LANDSCAPE_WIDTH,
    MINIMAL_DURATION_IN_FRAMES,
    PORTRAIT_HEIGHT,
    PORTRAIT_WIDTH,
} from './composition/constants/constants.js';
import { videoOrientation } from './composition/enums/enums.js';
import { Main } from './composition/main.jsx';

export const RemotionRoot = (props) => {
    return (
        <Composition
            id={'outreachvids-composition'}
            component={Main}
            durationInFrames={MINIMAL_DURATION_IN_FRAMES}
            fps={FPS}
            width={LANDSCAPE_WIDTH}
            height={LANDSCAPE_HEIGHT}
            defaultProps={{ scenes: props.scenes }}
            calculateMetadata={({ props }) => {
                return {
                    durationInFrames: props.totalDurationInFrames,
                    height:
                        props.videoOrientation === videoOrientation.PORTRAIT
                            ? PORTRAIT_HEIGHT
                            : LANDSCAPE_HEIGHT,

                    width:
                        props.videoOrientation === videoOrientation.PORTRAIT
                            ? PORTRAIT_WIDTH
                            : LANDSCAPE_WIDTH,
                };
            }}
        />
    );
};
