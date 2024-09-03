import {
    Button,
    Flex,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import { UserAvatar } from './components/user-avatar.js';

const UserCard: React.FC = () => {
    const user = useAppSelector(({ auth }) => auth.user);

    return (
        <VStack
            rounded="lg"
            bg="background.600"
            spacing="10px"
            p="15px 5px 10px"
        >
            <Flex
                w="full"
                align="center"
                color="brand.secondary.900"
                gap="15px"
                pl="10px"
            >
                <UserAvatar />
                <Text>{user?.fullName ?? 'FirstName LastName'}</Text>
            </Flex>
            <Button label="Create video" />
        </VStack>
    );
};

export { UserCard };
