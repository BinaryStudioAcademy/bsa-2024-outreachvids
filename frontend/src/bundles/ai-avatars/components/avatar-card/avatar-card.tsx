import {
    Box,
    Card,
    CardBody,
    Flex,
    Image,
    Tag,
    Text,
} from '~/bundles/common/components/components.js';

type Properties = {
    image: string;
    name: string;
    tag: string;
};

const AvatarCard: React.FC<Properties> = ({ image, name, tag }) => {
    return (
        <Card size="sm" borderRadius="lg" boxShadow="none" maxW="500px">
            <CardBody>
                <Box bg="background.50" borderRadius="md">
                    <Image src={image} alt="AI generated avatar image" />
                </Box>
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
