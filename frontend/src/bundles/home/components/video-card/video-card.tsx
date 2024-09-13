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
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import styles from './styles.module.css';

type Properties = {
    id: string;
    name: string;
    url: string;
};

const VideoCard: React.FC<Properties> = ({ id, name, url }) => {
    const dispatch = useAppDispatch();

    const handleDeleteVideo = useCallback(() => {
        void dispatch(homeActions.deleteVideo(id));
    }, [dispatch, id]);

    return (
        <Box borderRadius="8px" bg="white" padding="7px">
            <Box position="relative" role="group">
                <Image src={photo} alt="Video preview" borderRadius="5px" />

                {/* Overlay effect */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    bg="rgba(53, 57, 154, 0.3)"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: 1 }}
                    borderRadius="5px"
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
                        <MenuItem
                            as={LibraryLink}
                            icon={<Icon as={IconName.DOWNLOAD} />}
                            href={url}
                            download
                        >
                            <Text color="typography.900" variant="bodySmall">
                                Download
                            </Text>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            icon={<Icon as={IconName.DELETE} />}
                            onClick={handleDeleteVideo}
                        >
                            <Text color="typography.900" variant="bodySmall">
                                Delete
                            </Text>
                        </MenuItem>
                    </MenuList>
                </Menu>

                <IconButton
                    aria-label="Edit video"
                    isRound={true}
                    size="lg"
                    position="absolute"
                    bg="white"
                    top="50%"
                    left="calc(50% - 12.5px)"
                    transform="translate(-50%, -50%)"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: 1 }}
                    icon={<Icon as={IconName.PEN} color="background.600" />}
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
        </Box>
    );
};

export { VideoCard };
