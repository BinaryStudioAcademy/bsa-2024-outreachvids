import {
    Badge,
    Box,
    Icon,
    IconButton,
    Image,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { PlayerModal } from '~/bundles/home/components/player-modal/player-modal.js';
import { DeleteWarning } from '~/bundles/home/components/video-card/components/delete-warning.js';

import styles from './styles.module.css';

type Properties = {
    name: string;
    url: string | null;
    previewUrl: string;
};

const TemplateCard: React.FC<Properties> = ({ name, url, previewUrl }) => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleIconClick = useCallback(() => {
        if (url) {
            return setIsVideoModalOpen(true);
        }
    }, [url]);

    const handleVideoModalClose = useCallback(() => {
        setIsVideoModalOpen(false);
    }, []);

    const handleWarningModalClose = useCallback(() => {
        setIsWarningModalOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        handleWarningModalClose();
    }, [handleWarningModalClose]);

    return (
        <Box borderRadius="8px" bg="white" padding="7px">
            <Box
                position="relative"
                role="group"
                height="115px"
                overflow="hidden"
            >
                <Image
                    src={previewUrl}
                    alt="Video preview"
                    className={styles['preview-image']}
                />

                <IconButton
                    size="xs"
                    aria-label={url ? 'Play video' : 'Edit video'}
                    _groupHover={{ opacity: 1 }}
                    onClick={handleIconClick}
                    className={styles['play-button']}
                    icon={
                        <Icon
                            as={url ? IconName.PLAY : IconName.PEN}
                            color="background.600"
                        />
                    }
                />
            </Box>

            <Box padding="7px 10px 5px 5px">
                <Text variant="button" color="typography.900">
                    {name}
                </Text>
            </Box>

            <Badge
                color="typography.900"
                textTransform="none"
                bg="background.300"
                fontWeight="400"
                padding="0 8px"
                borderRadius="24px"
            >
                Advertisement
            </Badge>

            {url && (
                <PlayerModal
                    videoUrl={url}
                    isOpen={isVideoModalOpen}
                    onClose={handleVideoModalClose}
                />
            )}

            <DeleteWarning
                isOpen={isWarningModalOpen}
                onClose={handleWarningModalClose}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export { TemplateCard };
