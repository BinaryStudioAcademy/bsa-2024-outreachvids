import { Box, Heading, Text } from '~/bundles/common/components/components.js';

type Properties = {
    title: string;
    comment: string;
};

const ChatHeader: React.FC<Properties> = ({ title, comment }) => {
    return (
        <Box
            bg="background.600"
            p="20px"
            color="white"
            borderTopLeftRadius="xl"
            borderTopRightRadius="xl"
        >
            <Heading variant="H2" mb={2}>
                {title}
            </Heading>
            <Text variant="bodySmall">{comment}</Text>
        </Box>
    );
};

export { ChatHeader };
