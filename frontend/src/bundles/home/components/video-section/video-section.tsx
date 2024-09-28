import {
    Badge,
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import { type VideoGetAllItemResponseDto } from '~/bundles/home/types/types.js';

import { VideoGallery } from '../../enums/video-gallery.js';
import { VideoCard } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    videos: Array<VideoGetAllItemResponseDto> | [];
    title: string;
};

const VideoSection: React.FC<Properties> = ({ videos, title }) => {
    return (
        <Box padding="17px 28px">
            <Flex alignItems="center" marginBottom="9px">
                <Heading color="typography.900" variant="H3" marginRight="11px">
                    {title}
                </Heading>
                <Badge
                    color="background.600"
                    bg="#D1D4DB"
                    fontWeight="400"
                    padding="2px 10px"
                >
                    {videos.length}
                </Badge>
            </Flex>

            {videos.length > 0 ? (
                title === VideoGallery.RECENT_VIDEOS ? (
                    <Box className={styles['horizontal']}>
                        {videos.map(({ id, ...video }) => (
                            <Box
                                key={id}
                                flex="0 0 auto"
                                marginRight="20px"
                                width="250px"
                            >
                                <VideoCard id={id} {...video} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <SimpleGrid spacing="20px" className={styles['grid']}>
                        {videos.map(({ id, ...video }) => (
                            <VideoCard key={id} id={id} {...video} />
                        ))}
                    </SimpleGrid>
                )
            ) : (
                <Text color="typography.600" variant="body1">
                    You have no videos right now.
                </Text>
            )}
        </Box>
    );
};

export { VideoSection };
