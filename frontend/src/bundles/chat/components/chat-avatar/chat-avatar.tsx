import { Box, Text } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { MessageSender } from '../../enums/enums.js';

type Properties = {
    sender: ValueOf<typeof MessageSender>;
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
            bg={sender === MessageSender.USER ? 'blue.500' : 'green.500'}
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
