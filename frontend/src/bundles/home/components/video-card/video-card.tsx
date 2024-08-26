import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import photo from '~/assets/img/photo.png';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Image,
    Text,
} from '~/bundles/common/components/components.js';
import { IconMap } from '~/bundles/common/icons/icons.js';

const VideoCard: React.FC = () => {
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

                <IconButton
                    aria-label="Video options"
                    position="absolute"
                    bg="white"
                    top="5px"
                    right="5px"
                    size="xs"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: 1 }}
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconMap.OPTIONS_VERTICAL}
                            color="background.600"
                        />
                    }
                />

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
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconMap.PEN}
                            color="background.600"
                        />
                    }
                />
            </Box>

            <Box padding="7px 10px 5px 5px">
                <Text variant="button" color="typography.900">
                    Video Name
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
