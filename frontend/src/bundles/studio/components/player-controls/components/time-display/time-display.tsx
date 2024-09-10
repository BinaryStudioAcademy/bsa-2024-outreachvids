import { format, secondsToMilliseconds } from 'date-fns';

import { Flex, Text } from '~/bundles/common/components/components.js';

type Properties = {
    currentTime: number;
    duration: number;
};

const TimeDisplay: React.FC<Properties> = ({ currentTime, duration }) => {
    return (
        <Flex gap="2px" position="absolute" left="100%" marginLeft="15px">
            <Text color="typography.900" variant="caption">
                {format(new Date(secondsToMilliseconds(currentTime)), 'mm:ss')}
            </Text>
            <Text color="background.50" variant="caption">
                /
            </Text>
            <Text color="background.50" variant="caption">
                {format(new Date(secondsToMilliseconds(duration)), 'mm:ss')}
            </Text>
        </Flex>
    );
};

export { TimeDisplay };