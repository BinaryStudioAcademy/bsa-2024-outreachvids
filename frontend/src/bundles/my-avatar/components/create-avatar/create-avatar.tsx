import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { Circles, Dots } from '../components.js';

const CreateAvatar = (): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(AppRoute.CREATE_AVATAR);
    }, [navigate]);

    return (
        <Flex
            bg="white"
            h="215px"
            borderRadius="lg"
            justify="center"
            align="center"
            overflow="hidden"
        >
            <Box w="222px" position="relative">
                <Circles />
                <Dots />
                <Button label="Create Avatar" onClick={handleClick} />
            </Box>
        </Flex>
    );
};

export { CreateAvatar };
