import {
    Box,
    Card,
    CardBody,
    Flex,
    Icon,
    IconButton,
    Image,
    Tag,
    Text,
} from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';
import { actions as studioActions } from '~/bundles/studio/store/slice.js';

type Properties = {
    id: string;
    image: string;
    name: string;
    tag: string;
    isLiked: boolean | undefined;
};

const AvatarCard: React.FC<Properties> = ({
    id,
    image,
    name,
    tag,
    isLiked,
}) => {
    const dispatch = useAppDispatch();

    const handleLike = useCallback(() => {
        dispatch(
            studioActions.avatarLikeToggle({
                avatarId: id,
                image,
            }),
        );
    }, [dispatch, id, image]);

    return (
        <Card size="sm" borderRadius="lg" boxShadow="none" maxW="250px">
            <CardBody position="relative" role="group">
                <Flex
                    bg="background.50"
                    borderRadius="md"
                    position="relative"
                    justifyContent="center"
                >
                    <Image
                        objectFit="cover"
                        objectPosition="top"
                        height="155px"
                        src={image}
                        alt="AI generated avatar image"
                    />
                    <IconButton
                        aria-label="favorite button"
                        icon={<Icon as={IconName.HEART} boxSize={5} />}
                        color={isLiked ? 'brand.secondary.300' : 'white'}
                        variant="icon"
                        position="absolute"
                        top="0"
                        right="0"
                        onClick={handleLike}
                    />
                </Flex>
                <Box p="5px 0">
                    <Text color="typography.900" fontWeight="600">
                        {name}
                    </Text>
                    <Flex gap="5px">
                        <Tag bg="background.330" borderRadius="full">
                            {tag}
                        </Tag>
                        <Tag bg="background.330" borderRadius="full">
                            4K
                        </Tag>
                    </Flex>
                </Box>
            </CardBody>
        </Card>
    );
};

export { AvatarCard };
