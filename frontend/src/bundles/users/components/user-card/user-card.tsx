import {
    Button,
    Circle,
    Flex,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';

const UserCard: React.FC = () => (
    <VStack rounded="lg" bg="background.600" spacing="10px" p="15px 5px 10px">
        <Flex
            w="full"
            align="center"
            color="brand.secondary.900"
            gap="15px"
            pl="10px"
        >
            {/* TODO: replace Circle and Text content with dynamic values */}
            <Circle
                size="40px"
                border="2px solid"
                borderColor="brand.secondary.900"
            >
                FN
            </Circle>
            <Text>Firstname Lastname</Text>
        </Flex>
        <Button label="Create video" />
    </VStack>
);

export { UserCard };
