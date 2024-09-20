// Using .js extension to avoid TypeScript issues with Remotion's rendering process.
import { Composition } from 'remotion';

import { Main } from './composition/main.jsx';

export const RemotionRoot = (props) => {
    return (
        <Composition
            id={'outreachvids-composition'}
            component={Main}
            durationInFrames={100}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ scenes: props.scenes }}
            calculateMetadata={({ props }) => {
                return {
                    durationInFrames: props.totalDurationInFrames,
                };
            }}
        />
    );
};
