import { Button, Flex, Text } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import {
    CheckboxForm,
    VideoDropzone,
    VideoPlayer,
} from './components/components.js';

const UploadVideo: React.FC = () => {
    const [videoSource, setVideoSource] = useState<string | null>(null);

    const handleRemoveVideo = useCallback(() => {
        setVideoSource(null);
    }, []);

    const handleSetVideo = useCallback((videoUrl: string) => {
        setVideoSource(videoUrl);
    }, []);

    return (
        <Flex
            maxWidth="864px"
            width="full"
            backgroundColor="white"
            minHeight="550px"
            flexDirection="column"
            alignItems="center"
            gap="20px"
            borderRadius="12px"
            padding="20px 20px 50px"
        >
            <Text color="background.600" variant="title">
                Upload footage
            </Text>
            {videoSource ? (
                <>
                    <VideoPlayer videoSource={videoSource} />
                    <CheckboxForm onVideoRemove={handleRemoveVideo} />
                </>
            ) : (
                <>
                    <VideoDropzone
                        videoSource={videoSource}
                        onRemoveVideo={handleRemoveVideo}
                        onSetVideo={handleSetVideo}
                    />
                    <Button sx={{ width: '222px' }} label={'Next step'} />
                </>
            )}
        </Flex>
    );
};

export { UploadVideo };
