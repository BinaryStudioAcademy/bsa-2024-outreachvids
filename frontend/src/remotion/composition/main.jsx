import { AbsoluteFill, Video, Series } from 'remotion';

const Main = ({ scenes }) => {
    return (
        <AbsoluteFill>
            <Series>
                {scenes.map((scene) => {
                    return (
                        <Series.Sequence
                            key={scene.id}
                            durationInFrames={scene.durationInFrames}
                        >
                            <Video src={scene.url} />
                        </Series.Sequence>
                    );
                })}
            </Series>
        </AbsoluteFill>
    );
};

export { Main };
