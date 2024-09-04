import { AbsoluteFill, Video } from 'remotion';

const VideoComponent: React.FC = () => {
    return (
        <AbsoluteFill>
            <Video
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </AbsoluteFill>
    );
};

export { VideoComponent };
