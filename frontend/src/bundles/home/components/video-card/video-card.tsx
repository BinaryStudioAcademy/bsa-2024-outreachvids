import { getVideoMetadata } from '@remotion/media-utils';
import { format } from 'date-fns';

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
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { createVideoUrl } from '~/bundles/home/helpers/helpers.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import { PlayerModal } from '../player-modal/player-modal.js';
import { DeleteWarning } from './components/delete-warning.js';
import styles from './styles.module.css';
import { notificationService } from '~/bundles/common/services/services.js';

type Properties = {
    id: string;
    name: string;
    url: string | null;
    createdAt: string;
    previewUrl: string;
};

const VideoCard: React.FC<Properties> = ({
    id,
    name,
    url,
    createdAt,
    previewUrl,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {
        const getDuration = async (): Promise<void> => {
            if (url) {
                const response = await getVideoMetadata(url);
                setDuration(Math.round(response.durationInSeconds));
            }
        };
        void getDuration();
    });

    const handleIconClick = useCallback(() => {
        if (url) {
            return setIsVideoModalOpen(true);
        }

        navigate(AppRoute.STUDIO, {
            state: {
                id,
            },
        });
    }, [url, navigate, id]);

    const date = new Date(createdAt);
    const formattedDate = format(date, 'MMM d, yyyy, h:mm a');

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

    const handleCopyButtonClick = useCallback(() => {
        dispatch(homeActions.createVideoUrl(id))
            .unwrap()
            .then(async (jwt) => {
                const token = await jwt;
                const url = createVideoUrl(token);
                await navigator.clipboard.writeText(createVideoUrl(url));
                
            })
            .catch((error) => {
                throw new Error(`Failed to get video ID JWT: ${error}`);
            });

    }, [dispatch, id]);
    
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
                {!url && (
                    <Box
                        className={styles['draft-box']}
                        backgroundColor="background.300"
                    >
                        <Text variant="bodySmall">Draft</Text>
                    </Box>
                )}
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
                            <>
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
                            </>
                        )}
                        <MenuItem
                            icon={<Icon as={IconName.DELETE} />}
                            onClick={handleDeleteButtonClick}
                        >
                            <Text color="typography.900" variant="bodySmall">
                                Delete
                            </Text>
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={IconName.COPY} />}
                            onClick={handleCopyButtonClick}
                        >
                            <Text color="typography.900" variant="bodySmall">
                                Copy video URL
                            </Text>
                        </MenuItem>
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
                        {formattedDate}
                    </Text>
                    <Text variant="caption" color="typography.300">
                        {duration && `${duration} sec`}
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
