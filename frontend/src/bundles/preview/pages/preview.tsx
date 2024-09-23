import { Box, Header , VideoPlayer } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

const Preview: React.FC = () => {
   
    return (
        <Box
        >
            <Header/>
            <VideoPlayer
                videoSource={'https://d19jw8gcwb6nqj.cloudfront.net/renders/b5kc5agqwx/out.mp4'}
                className={styles['video-player'] ?? ''}
                playerWidth="100%"
                playerHeight="100%"
            />
        </Box>
    );
};

export { Preview };
