import { Box, Header , VideoPlayer } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    id: string;
};

const Preview: React.FC<Properties> = ({ id }) => {
   
    return (
        <Box
        >
            <Header/>
            {id}
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
