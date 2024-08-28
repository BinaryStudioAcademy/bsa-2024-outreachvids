import { Box, Text } from '~/bundles/common/components/components.js';

type Properties = {
    sender: 'user' | 'ai';
    imageUrl?: string;
    initials?: string;
};

const ChatAvatar: React.FC<Properties> = ({ sender, imageUrl, initials }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            borderRadius="full"
            bg={sender === 'user' ? 'blue.500' : 'green.500'}
            color="white"
            fontSize="md"
            fontWeight="bold"
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={initials}
                    style={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                    }}
                />
            ) : (
                <Text>{initials}</Text>
            )}
        </Box>
    );
};

export { ChatAvatar };
