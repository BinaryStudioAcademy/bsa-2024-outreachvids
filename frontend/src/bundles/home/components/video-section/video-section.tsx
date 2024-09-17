import {
    Badge,
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import { type VideoGetAllItemResponseDto } from '~/bundles/home/types/types.js';

import { VideoCard } from '../components.js';

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
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="20px">
                    {videos.map(({ id, ...video }) => (
                        <VideoCard key={id} id={id} {...video} />
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="typography.600" variant="body1">
                    You have no videos right now.
                </Text>
            )}
        </Box>
    );
};

export { VideoSection };
