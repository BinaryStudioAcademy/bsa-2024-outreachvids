import {
    AbsoluteFill,
    Audio,
    RemotionImg,
    Series,
} from '~/bundles/common/components/components.js';
import { FPS } from '~/bundles/common/components/upload-video/components/video-player/libs/constants/constants.js';
import { type Scene, type Script } from '~/bundles/studio/types/types.js';

import styles from './styles.module.css';

type Properties = {
    scenes: Scene[];
    scripts: Script[];
};

const VideoComponent: React.FC<Properties> = ({ scenes, scripts }) => {
    return (
        <AbsoluteFill>
            <Series>
                {scripts.map((script) => {
                    return (
                        <Series.Sequence
                            key={script.id}
                            durationInFrames={script?.duration * FPS || 0}
                        >
                            {script.url ? <Audio src={script.url} /> : <></>}
                        </Series.Sequence>
                    );
                })}
            </Series>
            <Series>
                {scenes.map((scene) => {
                    return (
                        <Series.Sequence
                            key={scene.id}
                            durationInFrames={scene.duration * FPS}
                            className={styles['sequence'] as string}
                        >
                            {scene?.avatar?.url ? (
                                <RemotionImg
                                    className={styles['image']}
                                    src={scene?.avatar.url}
                                />
                            ) : (
                                <></>
                            )}
                        </Series.Sequence>
                    );
                })}
            </Series>
        </AbsoluteFill>
    );
};

export { VideoComponent };
