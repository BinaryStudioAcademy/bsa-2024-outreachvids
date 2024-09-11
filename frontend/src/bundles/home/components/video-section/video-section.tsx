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
    const hasVideos = videos.length > 0;

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

            {hasVideos ? (
                <SimpleGrid minChildWidth="253px" spacing="20px">
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            name={video.name}
                            url={video.url}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="typography.600">
                    You have no videos right now.
                </Text>
            )}
        </Box>
    );
};

export { VideoSection };

{
    /* TODO: Update this mocked data */
}
{
    /* <VideoCard />
                <VideoCard /> */
}
{
    /* <VideoCard /> */
}
{
    /* <VideoCard /> */
}
{
    /* <VideoCard /> */
}
