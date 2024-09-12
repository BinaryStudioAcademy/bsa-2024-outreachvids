import { format } from 'date-fns';

import { Flex, Text } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';

const TimeDisplay: React.FC = () => {
    const { elapsedTime } = useAppSelector(({ studio }) => ({
        elapsedTime: studio.player.elapsedTime,
    }));
    const totalDuration = useAppSelector(selectTotalDuration);

    return (
        <Flex gap="2px" position="absolute" left="100%" marginLeft="15px">
            <Text color="typography.900" variant="caption">
                {format(new Date(elapsedTime), 'mm:ss')}
            </Text>
            <Text color="background.50" variant="caption">
                /
            </Text>
            <Text color="background.50" variant="caption">
                {format(new Date(totalDuration), 'mm:ss')}
            </Text>
        </Flex>
    );
};

export { TimeDisplay };
