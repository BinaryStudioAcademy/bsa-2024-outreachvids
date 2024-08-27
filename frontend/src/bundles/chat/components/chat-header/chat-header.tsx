// import { ModalHeader } from '@chakra-ui/react';

import { Box, Heading, Text } from '~/bundles/common/components/components.js';

type Properties = {
    title: string;
    comment: string;
};

const ChatHeader: React.FC<Properties> = ({ title, comment }) => {
    return (
        <Box sx={{ bg: 'background.600', p: '20px', color: 'white' }}>
            <Heading as="h3">{title}</Heading>
            <Text>{comment}</Text>
        </Box>
    );
};

export { ChatHeader };
