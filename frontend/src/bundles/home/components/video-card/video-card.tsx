import photo from '~/assets/img/photo.png';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Image,
    LibraryLink,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import { PlayerModal } from '../player-modal/player-modal.js';
import { DeleteWarning } from './components/delete-warning.js';
import styles from './styles.module.css';

type Properties = {
    id: string;
    name: string;
    url: string | null;
};

const VideoCard: React.FC<Properties> = ({ id, name, url }) => {
    const dispatch = useAppDispatch();

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleIconClick = useCallback(() => {
        if (url) {
            setIsVideoModalOpen(true);
        }
    }, [url]);

    const handleVideoModalClose = useCallback(() => {
        setIsVideoModalOpen(false);
    }, []);

    const handleDeleteButtonClick = useCallback(() => {
        setIsWarningModalOpen(true);
    }, []);

    const handleWarningModalClose = useCallback(() => {
        setIsWarningModalOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        void dispatch(homeActions.deleteVideo(id));
        handleWarningModalClose();
    }, [dispatch, handleWarningModalClose, id]);

    return (
        <Box borderRadius="8px" bg="white" padding="7px">
            <Box position="relative" role="group">
                <Image src={photo} alt="Video preview" borderRadius="5px" />

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
                    {url && (
                        <MenuList>
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
                            <MenuDivider />
                            <MenuItem
                                icon={<Icon as={IconName.DELETE} />}
                                onClick={handleDeleteButtonClick}
                            >
                                <Text
                                    color="typography.900"
                                    variant="bodySmall"
                                >
                                    Delete
                                </Text>
                            </MenuItem>
                        </MenuList>
                    )}
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

export { VideoCard };
