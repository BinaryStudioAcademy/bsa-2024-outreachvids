import { Flex, Text } from '~/bundles/common/components/components.js';

const TimeDisplay: React.FC = () => {
    return (
        <Flex gap="2px" position="absolute" left="100%" marginLeft="15px">
            <Text color="typography.900" variant="caption">
                00:00
            </Text>
            <Text color="background.50" variant="caption">
                /
            </Text>
            <Text color="background.50" variant="caption">
                00:10
            </Text>
        </Flex>
    );
};

export { TimeDisplay };
