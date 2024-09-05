import { AbsoluteFill, Video } from 'remotion';

import styles from './styles.module.css';

const VideoComponent: React.FC = () => {
    return (
        <AbsoluteFill>
            <Video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                className={styles['video']}
                // style={{
                //     width: '100%',
                //     height: '100%',
                //     objectFit: 'cover',
                // }}
            />
        </AbsoluteFill>
    );
};

export { VideoComponent };
