import { Flex, Text } from '~/bundles/common/components/components.js';
import { formatTime } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    currentTime: number;
    duration: number;
};

const TimeDisplay: React.FC<Properties> = ({ currentTime, duration }) => {
    return (
        <Flex gap="2px" position="absolute" left="100%" marginLeft="15px">
            <Text color="typography.900" variant="caption">
                {formatTime(currentTime)}
            </Text>
            <Text color="background.50" variant="caption">
                /
            </Text>
            <Text color="background.50" variant="caption">
                {formatTime(duration)}
            </Text>
        </Flex>
    );
};

export { TimeDisplay };
