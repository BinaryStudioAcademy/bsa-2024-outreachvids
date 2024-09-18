import {
    Box,
    Flex,
    Icon,
    IconButton,
    Image,
    LibraryLink,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';

import { PlayerModal } from '../player-modal/player-modal.js';
import styles from './styles.module.css';

type Properties = {
    name: string;
    url: string | null;
    previewUrl: string;
};

const VideoCard: React.FC<Properties> = ({ name, url, previewUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIconClick = useCallback(() => {
        if (url) {
            setIsModalOpen(true);
        }
    }, [url]);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <Box borderRadius="8px" bg="white" padding="7px">
            <Box
                position="relative"
                role="group"
                height="155px"
                overflow="hidden"
            >
                <Image
                    src={previewUrl}
                    alt="Video preview"
                    className={styles['preview-image']}
                />

                <Box
                    _groupHover={{ opacity: 1 }}
                    className={styles['overlay']}
                />

                <Menu>
                    <MenuButton
                        as={IconButton}
                        size={IconSize.EXTRA_SMALL}
                        variant="outline"
                        aria-label="Video options"
                        icon={
                            <Icon
                                as={IconName.OPTIONS_VERTICAL}
                                color="background.600"
                            />
                        }
                        className={styles['menu-button']}
                    />
                    <MenuList>
                        {url && (
                            <MenuItem
                                as={LibraryLink}
                                icon={<Icon as={IconName.DOWNLOAD} />}
                                href={url}
                                download
                            >
                                <Text
                                    color="typography.900"
                                    variant="bodySmall"
                                >
                                    Download
                                </Text>
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>

                <IconButton
                    isRound
                    size="lg"
                    aria-label={url ? 'Play video' : 'Edit video'}
                    _groupHover={{ opacity: 1 }}
                    onClick={handleIconClick}
                    className={styles['action-button']}
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
                <Flex justify="space-between">
                    <Text variant="caption" color="typography.300">
                        Aug 9, 2024, 1:24 PM
                    </Text>
                    <Text variant="caption" color="typography.300">
                        0,30 sec
                    </Text>
                </Flex>
            </Box>
            {url && (
                <PlayerModal
                    videoUrl={url}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </Box>
    );
};

export { VideoCard };
