import { Button, Flex, Text } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { VideoPlayer } from '../video-player/video-player.js';
import { CheckboxForm, VideoDropzone } from './components/components.js';
import styles from './styles.module.css';

const UploadVideo: React.FC = () => {
    const [videoSource, setVideoSource] = useState<string | null>(null);

    const handleRemoveVideo = useCallback(() => {
        setVideoSource(null);
    }, []);

    const handleSetVideo = useCallback((videoUrl: string) => {
        setVideoSource(videoUrl);
    }, []);

    return (
        <Flex className={styles['container']}>
            <Text color="background.600" variant="title">
                Upload footage
            </Text>
            {videoSource ? (
                <>
                    <VideoPlayer
                        videoSource={videoSource}
                        className={styles['video-player'] ?? ''}
                        playerWidth="570px"
                        playerHeight="278px"
                    />
                    <CheckboxForm onVideoRemove={handleRemoveVideo} />
                </>
            ) : (
                <>
                    <VideoDropzone
                        videoSource={videoSource}
                        onRemoveVideo={handleRemoveVideo}
                        onSetVideo={handleSetVideo}
                    />
                    <Button width="222px" label="Next step" />
                </>
            )}
        </Flex>
    );
};

export { UploadVideo };
