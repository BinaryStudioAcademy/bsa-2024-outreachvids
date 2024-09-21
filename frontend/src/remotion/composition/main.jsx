// Using .js extension to avoid TypeScript issues with Remotion's rendering process.
import { AbsoluteFill, Video, Series } from 'remotion';

import styles from './styles.module.css';

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
                            <Video
                                className={styles['avatar']}
                                src={scene.url}
                            />
                            {scene?.background?.url && (
                                <img
                                    className={styles['image']}
                                    src={scene?.background?.url}
                                />
                            )}
                            {scene?.background?.color && (
                                <div
                                    style={{
                                        backgroundColor: `${scene?.background?.color}`,
                                    }}
                                    className={styles['background']}
                                ></div>
                            )}
                        </Series.Sequence>
                    );
                })}
            </Series>
        </AbsoluteFill>
    );
};

export { Main };
