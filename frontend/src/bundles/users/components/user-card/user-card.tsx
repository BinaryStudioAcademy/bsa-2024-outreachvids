import {
    Button,
    Flex,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';

import { UserAvatar } from './components/user-avatar.js';

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
            <UserAvatar username="FN" />
            <Text>Firstname Lastname</Text>
        </Flex>
        <Button label="Create video" />
    </VStack>
);

export { UserCard };
