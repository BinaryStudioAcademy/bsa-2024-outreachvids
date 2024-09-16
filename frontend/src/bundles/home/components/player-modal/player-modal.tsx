import { Modal, VideoPlayer } from '~/bundles/common/components/components.js';

import styles from './style.module.css';

type Properties = {
    videoUrl: string;
    isOpen: boolean;
    onClose: () => void;
};

const PlayerModal: React.FC<Properties> = ({ videoUrl, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <VideoPlayer
                videoSource={videoUrl}
                className={styles['video-player'] ?? ''}
                playerWidth="100%"
                playerHeight="100%"
            />
        </Modal>
    );
};

export { PlayerModal };
